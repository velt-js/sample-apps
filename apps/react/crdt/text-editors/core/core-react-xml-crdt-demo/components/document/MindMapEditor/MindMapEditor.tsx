'use client'

import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { useStore } from '@veltdev/crdt-react'
import { useVeltClient, useLiveState, VeltCommentsSidebar, useGetCommentAnnotations } from '@veltdev/react'
import * as Y from 'yjs'
import { MindMapNode, FocusMap } from './types'
import { STORE_ID, CURSOR_COLORS, populateInitialContent, storeItems } from './constants'
import { PlusIcon, TrashIcon, CommentIcon } from './icons'
import MindMapSidebar from './MindMapSidebar'
import MindMapCommentsModal from './MindMapCommentsModal'
import { useAppUser } from '@/app/userAuth/useAppUser'
import { useVeltEventHandlers } from '@/components/velt/useVeltEventHandlers'

function hashToIndex(str: string, len: number): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash = hash & hash
  }
  return Math.abs(hash) % len
}

function generateId(): string {
  return `n-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
}

// Convert Y.XmlFragment tree to plain MindMapNode tree
function xmlToTree(container: Y.XmlFragment | Y.XmlElement): MindMapNode[] {
  const nodes: MindMapNode[] = []
  for (let i = 0; i < container.length; i++) {
    const child = container.get(i)
    if (child instanceof Y.XmlElement) {
      nodes.push({
        id: child.getAttribute('id') || '',
        text: child.getAttribute('text') || '',
        children: xmlToTree(child),
      })
    }
  }
  return nodes
}

// Find element by id in XML tree
function findElementById(container: Y.XmlFragment | Y.XmlElement, id: string): Y.XmlElement | null {
  for (let i = 0; i < container.length; i++) {
    const child = container.get(i)
    if (child instanceof Y.XmlElement) {
      if (child.getAttribute('id') === id) return child
      const found = findElementById(child, id)
      if (found) return found
    }
  }
  return null
}

// Find element with parent reference for deletion
function findElementWithParent(container: Y.XmlFragment | Y.XmlElement, id: string): { parent: Y.XmlFragment | Y.XmlElement; index: number } | null {
  for (let i = 0; i < container.length; i++) {
    const child = container.get(i)
    if (child instanceof Y.XmlElement) {
      if (child.getAttribute('id') === id) return { parent: container, index: i }
      const found = findElementWithParent(child, id)
      if (found) return found
    }
  }
  return null
}

// Layout constants — top-down vertical tree
const NODE_H = 43
const NODE_GAP_H = 15  // horizontal gap between sibling nodes
const NODE_GAP_V = 70  // vertical gap between levels
const NODE_PAD = 32     // padding inside node
const NODE_ICONS_W = 56 // space for comment/+/delete icons

interface LayoutResult {
  width: number
  height: number
  positions: Map<string, { x: number; y: number; w: number }>
}

function measureText(text: string): number {
  return Math.max(120, text.length * 9.6 + NODE_PAD + NODE_ICONS_W)
}

function layoutTree(node: MindMapNode, centerX: number, y: number): LayoutResult {
  const positions = new Map<string, { x: number; y: number; w: number }>()
  const nodeW = measureText(node.text)

  if (node.children.length === 0) {
    const x = centerX - nodeW / 2
    positions.set(node.id, { x, y, w: nodeW })
    return { width: nodeW, height: NODE_H, positions }
  }

  // First, layout all children to measure their widths
  const childLayouts: LayoutResult[] = []
  for (const child of node.children) {
    childLayouts.push(layoutTree(child, 0, 0))
  }

  // Total width of all children side by side
  const totalChildrenWidth = childLayouts.reduce((sum, cl) => sum + cl.width, 0) + (node.children.length - 1) * NODE_GAP_H

  // Position this node centered above children
  const nodeX = centerX - nodeW / 2
  positions.set(node.id, { x: nodeX, y, w: nodeW })

  // Position children horizontally centered below this node
  const childY = y + NODE_H + NODE_GAP_V
  let childStartX = centerX - totalChildrenWidth / 2

  for (let i = 0; i < node.children.length; i++) {
    const cl = childLayouts[i]
    const childCenterX = childStartX + cl.width / 2
    const repositioned = layoutTree(node.children[i], childCenterX, childY)
    for (const [k, v] of repositioned.positions) {
      positions.set(k, v)
    }
    childStartX += cl.width + NODE_GAP_H
  }

  // Calculate max height from deepest child
  const maxChildHeight = Math.max(...childLayouts.map(cl => cl.height))
  const totalWidth = Math.max(nodeW, totalChildrenWidth)
  const totalHeight = NODE_H + NODE_GAP_V + maxChildHeight

  return { width: totalWidth, height: totalHeight, positions }
}

// Render a single node
function NodeBox({
  node,
  pos,
  remoteFocus,
  editingId,
  onStartEdit,
  onFinishEdit,
  onAddChild,
  onDelete,
  onFocus,
  onCommentClick,
  annotationData,
  isRoot,
}: {
  node: MindMapNode
  pos: { x: number; y: number; w: number }
  remoteFocus: { name: string; color: string } | null
  editingId: string | null
  onStartEdit: (id: string) => void
  onFinishEdit: (id: string, text: string) => void
  onAddChild: (parentId: string) => void
  onDelete: (id: string) => void
  onFocus: (id: string) => void
  onCommentClick: (node: MindMapNode) => void
  annotationData: { count: number; hasUnread: boolean } | undefined
  isRoot: boolean
}) {
  const [editText, setEditText] = useState(node.text)
  const inputRef = useRef<HTMLInputElement>(null)
  const isEditing = editingId === node.id

  useEffect(() => { if (!isEditing) setEditText(node.text) }, [node.text, isEditing])
  useEffect(() => { if (isEditing && inputRef.current) { inputRef.current.focus(); inputRef.current.select() } }, [isEditing])

  return (
    <foreignObject x={pos.x} y={pos.y - 18} width={pos.w} height={NODE_H + 18} style={{ overflow: 'visible' }}>
      <div style={{ paddingTop: 18 }}>
        <div
          className="mindmap-node group relative flex items-center gap-1"
          style={{
            width: pos.w,
            height: NODE_H,
            borderColor: remoteFocus ? remoteFocus.color : undefined,
            borderWidth: remoteFocus ? 2 : 1,
          }}
          onClick={() => onFocus(node.id)}
          onDoubleClick={() => onStartEdit(node.id)}
        >
          {remoteFocus && (
            <div className="absolute -top-[18px] left-1 text-[9px] font-semibold px-1.5 py-0.5 rounded text-white whitespace-nowrap" style={{ backgroundColor: remoteFocus.color }}>{remoteFocus.name}</div>
          )}
        {isEditing ? (
          <input
            ref={inputRef}
            className="bg-transparent border-none outline-none text-base w-full text-center"
            style={{ fontFamily: 'Inter, sans-serif', color: 'var(--task-text)' }}
            value={editText}
            onChange={(e) => { setEditText(e.target.value); onFinishEdit(node.id, e.target.value) }}
            onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); if (e.key === 'Escape') { setEditText(node.text); onFinishEdit(node.id, node.text) } }}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="flex-1 whitespace-nowrap text-center">{node.text}</span>
        )}
        {/* Comment button — visible if has comments, otherwise hover-only */}
        <button
          className={`shrink-0 transition-opacity ${annotationData?.count ? '' : 'opacity-0 group-hover:opacity-100'}`}
          onClick={(e) => { e.stopPropagation(); onCommentClick(node) }}
          title="Comments"
        >
          <CommentIcon count={annotationData?.count || 0} hasUnread={annotationData?.hasUnread || false} />
        </button>
        {/* Add child button */}
        <button
          className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => { e.stopPropagation(); onAddChild(node.id) }}
          title="Add child"
        >
          <PlusIcon size={12} color="rgb(0,109,220)" />
        </button>
        {/* Delete button (not on root) */}
        {!isRoot && (
          <button
            className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => { e.stopPropagation(); onDelete(node.id) }}
            title="Delete"
          >
            <TrashIcon size={12} color="var(--task-text-secondary)" />
          </button>
        )}
        </div>
      </div>
    </foreignObject>
  )
}

// Draw top-down connector lines between parent and children
function Connectors({ node, positions }: { node: MindMapNode; positions: Map<string, { x: number; y: number; w: number }> }) {
  const parentPos = positions.get(node.id)
  if (!parentPos || node.children.length === 0) return null

  const parentBottomX = parentPos.x + parentPos.w / 2
  const parentBottomY = parentPos.y + NODE_H
  const midY = parentBottomY + NODE_GAP_V / 2
  const r = 12 // corner radius

  return (
    <>
      {node.children.map(child => {
        const childPos = positions.get(child.id)
        if (!childPos) return null
        const childTopX = childPos.x + childPos.w / 2
        const childTopY = childPos.y

        // Vertical line from parent → horizontal to child → vertical down to child
        const dx = childTopX - parentBottomX

        let d: string
        if (Math.abs(dx) < 1) {
          // Straight vertical
          d = `M ${parentBottomX} ${parentBottomY} L ${childTopX} ${childTopY}`
        } else {
          const dir = dx > 0 ? 1 : -1
          const absR = Math.min(r, Math.abs(dx), NODE_GAP_V / 2)
          d = `M ${parentBottomX} ${parentBottomY} L ${parentBottomX} ${midY - absR} Q ${parentBottomX} ${midY}, ${parentBottomX + dir * absR} ${midY} L ${childTopX - dir * absR} ${midY} Q ${childTopX} ${midY}, ${childTopX} ${midY + absR} L ${childTopX} ${childTopY}`
        }

        return (
          <g key={`conn-${node.id}-${child.id}`}>
            <path d={d} fill="none" stroke="var(--task-connector)" strokeWidth="1" />
            <Connectors node={child} positions={positions} />
          </g>
        )
      })}
    </>
  )
}

// Pannable + zoomable canvas container
function CanvasArea({
  rootNode,
  layout,
  renderNodes,
  addChild,
}: {
  rootNode: MindMapNode | null
  layout: LayoutResult | null
  renderNodes: (node: MindMapNode, positions: Map<string, { x: number; y: number; w: number }>, isRoot: boolean) => React.ReactNode
  addChild: (parentId: string) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const hasFitView = useRef(false)
  const isPanning = useRef(false)
  const lastMouse = useRef({ x: 0, y: 0 })

  // fitView: center tree in container on first render (like ReactFlow)
  useEffect(() => {
    if (!layout || !containerRef.current || hasFitView.current) return
    const el = containerRef.current
    const cw = el.clientWidth
    const ch = el.clientHeight
    if (cw === 0 || ch === 0) return

    // Compute bounding box of all nodes
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
    for (const [, pos] of layout.positions) {
      minX = Math.min(minX, pos.x)
      maxX = Math.max(maxX, pos.x + pos.w)
      minY = Math.min(minY, pos.y)
      maxY = Math.max(maxY, pos.y + NODE_H)
    }
    const treeW = maxX - minX
    const treeH = maxY - minY

    // Scale to fit with padding (like fitView padding: 0.3)
    const padding = 0.3
    const scaleX = cw / (treeW * (1 + padding))
    const scaleY = ch / (treeH * (1 + padding))
    const fitZoom = Math.min(scaleX, scaleY, 1) // don't zoom in past 1x

    // Center the tree
    const offsetX = (cw - treeW * fitZoom) / 2 - minX * fitZoom
    const offsetY = (ch - treeH * fitZoom) / 2 - minY * fitZoom

    setZoom(fitZoom)
    setPan({ x: offsetX, y: offsetY })
    hasFitView.current = true
  }, [layout])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return
    // Don't pan if clicking on a node or button
    const target = e.target as HTMLElement
    if (target.closest('.mindmap-node') || target.closest('button')) return
    isPanning.current = true
    lastMouse.current = { x: e.clientX, y: e.clientY }
    e.preventDefault()
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning.current) return
    const dx = e.clientX - lastMouse.current.x
    const dy = e.clientY - lastMouse.current.y
    lastMouse.current = { x: e.clientX, y: e.clientY }
    setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }))
  }, [])

  const handleMouseUp = useCallback(() => {
    isPanning.current = false
  }, [])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.95 : 1.05
    setZoom(prev => Math.min(3, Math.max(0.2, prev * delta)))
  }, [])

  if (!rootNode || !layout) {
    return (
      <div className="flex-1 flex items-center justify-center" style={{ color: 'var(--task-text-secondary)' }}>
        Loading mind map...
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 relative overflow-hidden"
      style={{ cursor: isPanning.current ? 'grabbing' : 'grab' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Dot grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, var(--task-connector) 1px, transparent 1px)',
          backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
          backgroundPosition: `${pan.x % (20 * zoom)}px ${pan.y % (20 * zoom)}px`,
          opacity: 0.15,
          pointerEvents: 'none',
        }}
      />

      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
      >
        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
          <Connectors node={rootNode} positions={layout.positions} />
          {renderNodes(rootNode, layout.positions, true)}

        </g>
      </svg>
    </div>
  )
}

export default function MindMapEditor() {
  const { client } = useVeltClient()
  const { user } = useAppUser()

  // [Velt] CRDT store — XML type for hierarchical mind map data
  const { store, status, isSynced } = useStore<string>({
    storeId: STORE_ID,
    type: 'xml',
  })

  const [tree, setTree] = useState<MindMapNode[]>([])
  const [selectedStoreId, setSelectedStoreId] = useState('sdk-decision')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const initializedRef = useRef(false)

  // Comment state
  const [isGlobalSidebarOpen, setIsGlobalSidebarOpen] = useState(false)
  const [activeCommentToolId, setActiveCommentToolId] = useState<string | null>(null)
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
  const [selectedCommentNode, setSelectedCommentNode] = useState<MindMapNode | null>(null)

  // Annotation data
  const commentAnnotations = useGetCommentAnnotations()
  const annotationDataByTargetId = useMemo(() => {
    const dataMap: Record<string, { count: number; hasUnread: boolean }> = {}
    if (commentAnnotations?.data) {
      Object.values(commentAnnotations.data).forEach((annotations: any[]) => {
        annotations.forEach((annotation) => {
          const targetId = annotation.targetElementId
          if (targetId) {
            if (!dataMap[targetId]) dataMap[targetId] = { count: 0, hasUnread: false }
            if (annotation.status?.id !== 'RESOLVED') dataMap[targetId].count = annotation.comments?.length || 0
            if (annotation.unread) dataMap[targetId].hasUnread = true
          }
        })
      })
    }
    return dataMap
  }, [commentAnnotations])

  const handleCommentClick = useCallback((node: MindMapNode) => {
    setSelectedCommentNode(node)
    setIsCommentModalOpen(true)
  }, [])

  const toggleGlobalSidebar = useCallback(() => { setIsGlobalSidebarOpen(prev => !prev) }, [])
  const openGlobalSidebar = useCallback(() => { setIsGlobalSidebarOpen(true) }, [])

  useVeltEventHandlers({ toggleGlobalSidebar, openGlobalSidebar, setActiveCommentToolId })

  // Read XML and convert to tree
  const readTree = useCallback(() => {
    if (!store) return
    const xml = store.getXml() as unknown as Y.XmlFragment | null
    if (!xml) return
    setTree(xmlToTree(xml))
  }, [store])

  // Initialize content + subscribe
  useEffect(() => {
    if (!store || initializedRef.current) return
    const xml = store.getXml() as unknown as Y.XmlFragment | null
    if (!xml) return

    if (xml.length === 0) {
      const doc = store.getDoc()
      doc.transact(() => { populateInitialContent(xml) })
    }

    readTree()
    initializedRef.current = true

    const unsub = store.subscribe(() => { readTree() })
    return () => { unsub() }
  }, [store, readTree])

  // Local user
  const localUserRef = useRef<{ userId: string; name: string; color: string } | null>(null)
  if (!localUserRef.current && client) {
    try {
      const u = (client as any).getUser?.()
      if (u) {
        localUserRef.current = { userId: u.userId || 'anonymous', name: u.name || 'Anonymous', color: CURSOR_COLORS[hashToIndex(u.userId || u.name || '', CURSOR_COLORS.length)] }
      }
    } catch { /* ignore */ }
  }

  // [Velt] Live focus via useLiveState — broadcasts which node each user is focused on
  const [focuses, setFocuses] = useLiveState<FocusMap>('core-crdt-xml-focuses', {}, { syncDuration: 100, listenToNewChangesOnly: true })
  const focusesRef = useRef<FocusMap>(focuses || {})
  focusesRef.current = focuses || {}

  const broadcastFocus = useCallback((nodeId: string | null) => {
    if (!localUserRef.current) return
    const u = localUserRef.current
    setFocuses({ ...focusesRef.current, [u.userId]: { name: u.name, color: u.color, nodeId, timestamp: Date.now() } })
  }, [setFocuses])

  const remoteFocusMap = useMemo(() => {
    const map: Record<string, { name: string; color: string }> = {}
    for (const [uid, entry] of Object.entries(focuses || {})) {
      if (uid === localUserRef.current?.userId) continue
      if (Date.now() - entry.timestamp > 30000) continue
      if (entry.nodeId) map[entry.nodeId] = { name: entry.name, color: entry.color }
    }
    return map
  }, [focuses])

  // XML mutations
  const addChild = useCallback((parentId: string) => {
    if (!store) return
    const xml = store.getXml() as unknown as Y.XmlFragment | null
    if (!xml) return
    const parent = findElementById(xml, parentId)
    if (!parent) return
    const newId = generateId()
    const doc = store.getDoc()
    doc.transact(() => {
      const el = new Y.XmlElement('node')
      el.setAttribute('id', newId)
      el.setAttribute('text', 'New Node')
      parent.insert(parent.length, [el])
    })
    // Auto-focus the new node for immediate editing
    setEditingId(newId)
  }, [store])

  const updateNodeText = useCallback((nodeId: string, text: string) => {
    if (!store) return
    const xml = store.getXml() as unknown as Y.XmlFragment | null
    if (!xml) return
    const el = findElementById(xml, nodeId)
    if (!el) return
    const doc = store.getDoc()
    doc.transact(() => { el.setAttribute('text', text) })
    setEditingId(null)
  }, [store])

  const deleteNode = useCallback((nodeId: string) => {
    if (!store) return
    const xml = store.getXml() as unknown as Y.XmlFragment | null
    if (!xml) return
    const result = findElementWithParent(xml, nodeId)
    if (!result) return
    const doc = store.getDoc()
    doc.transact(() => { result.parent.delete(result.index, 1) })
  }, [store])

  // Status
  const statusDotColor = status === 'connected' ? (isSynced ? '#22c55e' : '#eab308') : status === 'connecting' ? '#eab308' : '#ef4444'
  const statusLabel = status === 'connected' ? (isSynced ? 'Synced' : 'Syncing...') : status === 'connecting' ? 'Connecting...' : 'Disconnected'

  // Layout
  const rootNode = tree[0] || null
  const layout = useMemo(() => {
    if (!rootNode) return null
    return layoutTree(rootNode, 450, 40)
  }, [rootNode])

  const selectedStore = storeItems.find(s => s.id === selectedStoreId)
  const storeName = selectedStore?.name || 'SDK Buying Decision'

  // Recursive node renderer
  function renderNodes(node: MindMapNode, positions: Map<string, { x: number; y: number; w: number }>, isRoot: boolean): React.ReactNode {
    const pos = positions.get(node.id)
    if (!pos) return null
    return (
      <g key={node.id}>
        <NodeBox
          node={node}
          pos={pos}
          remoteFocus={remoteFocusMap[node.id] || null}
          editingId={editingId}
          onStartEdit={setEditingId}
          onFinishEdit={updateNodeText}
          onAddChild={addChild}
          onDelete={deleteNode}
          onFocus={broadcastFocus}
          onCommentClick={handleCommentClick}
          annotationData={annotationDataByTargetId[`mindmap-node-${node.id}`]}
          isRoot={isRoot}
        />
        {node.children.map(child => renderNodes(child, positions, false))}
      </g>
    )
  }

  return (
    <div className="flex h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
      <MindMapSidebar
        selectedStoreId={selectedStoreId}
        onSelectStore={setSelectedStoreId}
        userName={user?.name || 'S'}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(prev => !prev)}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--task-bg)' }}>
          {/* Header area */}
          <div className="px-10 pt-10 pb-4 shrink-0">
            <div className="flex items-center gap-1.5 mb-6">
              <span className="inline-block w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: statusDotColor }} />
              <span className="text-xs" style={{ color: 'var(--app-text-tertiary)' }}>{statusLabel}</span>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-[32px] font-bold leading-tight" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--task-text)' }}>{storeName}</h1>
              <p className="text-base" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--task-text)' }}>Pros and cons of using SDK</p>
            </div>
          </div>

          {/* Pannable/zoomable canvas */}
          <CanvasArea
            rootNode={rootNode}
            layout={layout}
            renderNodes={renderNodes}
            addChild={addChild}
          />
        </div>

        {/* Comment sidebar */}
        {isGlobalSidebarOpen && (
          <div className="velt-sidebar-container h-full flex-shrink-0">
            <VeltCommentsSidebar
              shadowDom={false}
              pageMode={true}
              embedMode={true}
              focusedThreadMode={true}
              sortOrder="asc"
              sortBy="createdAt"
            />
          </div>
        )}
      </div>

      {/* Comment modal */}
      <MindMapCommentsModal
        isOpen={isCommentModalOpen}
        selectedNode={selectedCommentNode}
        onClose={() => { setIsCommentModalOpen(false); setSelectedCommentNode(null) }}
      />
    </div>
  )
}
