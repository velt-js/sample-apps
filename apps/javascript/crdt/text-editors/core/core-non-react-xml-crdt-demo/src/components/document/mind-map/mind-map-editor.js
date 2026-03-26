/**
 * Mind Map Editor Component with Velt CRDT
 *
 * Vanilla JS implementation using createVeltStore from @veltdev/crdt
 * for real-time collaborative XML tree editing with live focus indicators.
 */

// [Velt] Import CRDT store factory for XML collaboration
import { createVeltStore } from '@veltdev/crdt'
import * as Y from 'yjs'
import { STORE_ID, CURSOR_COLORS, populateInitialContent, storeItems } from './constants.js'
import { createMindMapSidebar } from './mind-map-sidebar.js'

// Layout constants
const NODE_H = 43
const NODE_GAP_H = 15
const NODE_GAP_V = 70
const NODE_PAD = 32
const NODE_ICONS_W = 56

function hashToIndex(str, len) {
  let hash = 0
  for (let i = 0; i < str.length; i++) { hash = ((hash << 5) - hash) + str.charCodeAt(i); hash = hash & hash }
  return Math.abs(hash) % len
}

function generateId() { return `n-${Date.now()}-${Math.random().toString(36).substring(2, 7)}` }

function xmlToTree(container) {
  const nodes = []
  for (let i = 0; i < container.length; i++) {
    const child = container.get(i)
    if (child instanceof Y.XmlElement) {
      nodes.push({ id: child.getAttribute('id') || '', text: child.getAttribute('text') || '', children: xmlToTree(child) })
    }
  }
  return nodes
}

function findElementById(container, id) {
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

function findElementWithParent(container, id) {
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

function measureText(text) { return Math.max(120, text.length * 9.6 + NODE_PAD + NODE_ICONS_W) }

function layoutTree(node, centerX, y) {
  const positions = new Map()
  const nodeW = measureText(node.text)
  if (node.children.length === 0) {
    positions.set(node.id, { x: centerX - nodeW / 2, y, w: nodeW })
    return { width: nodeW, height: NODE_H, positions }
  }
  const childLayouts = node.children.map(c => layoutTree(c, 0, 0))
  const totalChildrenWidth = childLayouts.reduce((sum, cl) => sum + cl.width, 0) + (node.children.length - 1) * NODE_GAP_H
  positions.set(node.id, { x: centerX - nodeW / 2, y, w: nodeW })
  const childY = y + NODE_H + NODE_GAP_V
  let childStartX = centerX - totalChildrenWidth / 2
  for (let i = 0; i < node.children.length; i++) {
    const cl = childLayouts[i]
    const childCenterX = childStartX + cl.width / 2
    const repositioned = layoutTree(node.children[i], childCenterX, childY)
    for (const [k, v] of repositioned.positions) positions.set(k, v)
    childStartX += cl.width + NODE_GAP_H
  }
  const maxChildHeight = Math.max(...childLayouts.map(cl => cl.height))
  return { width: Math.max(nodeW, totalChildrenWidth), height: NODE_H + NODE_GAP_V + maxChildHeight, positions }
}

function buildConnectorPath(node, positions) {
  let paths = ''
  const parentPos = positions.get(node.id)
  if (!parentPos || node.children.length === 0) return paths
  const parentBottomX = parentPos.x + parentPos.w / 2
  const parentBottomY = parentPos.y + NODE_H
  const midY = parentBottomY + NODE_GAP_V / 2
  const r = 12
  for (const child of node.children) {
    const childPos = positions.get(child.id)
    if (!childPos) continue
    const childTopX = childPos.x + childPos.w / 2
    const childTopY = childPos.y
    const dx = childTopX - parentBottomX
    let d
    if (Math.abs(dx) < 1) {
      d = `M ${parentBottomX} ${parentBottomY} L ${childTopX} ${childTopY}`
    } else {
      const dir = dx > 0 ? 1 : -1
      const absR = Math.min(r, Math.abs(dx), NODE_GAP_V / 2)
      d = `M ${parentBottomX} ${parentBottomY} L ${parentBottomX} ${midY - absR} Q ${parentBottomX} ${midY}, ${parentBottomX + dir * absR} ${midY} L ${childTopX - dir * absR} ${midY} Q ${childTopX} ${midY}, ${childTopX} ${midY + absR} L ${childTopX} ${childTopY}`
    }
    paths += `<path d="${d}" fill="none" stroke="var(--task-connector)" stroke-width="1"/>`
    paths += buildConnectorPath(child, positions)
  }
  return paths
}

/**
 * Create the mind map CRDT editor
 * @param {HTMLElement} container - Container to mount into
 * @param {Object} veltClient - Velt client instance
 * @param {Object} user - Current user object
 * @returns {Promise<Object>} - Component API with el, destroy
 */
export async function createMindMapEditor(container, veltClient, user) {
  let store = null, storeUnsub = null, liveStateSub = null, annotationSub = null
  let tree = [], editingId = null, selectedStoreId = 'sdk-decision'
  let pan = { x: 0, y: 0 }, zoom = 1, hasFitView = false
  let isPanning = false, lastMouse = { x: 0, y: 0 }
  let remoteFocuses = {}
  let annotationDataByTargetId = {}

  const localUser = { userId: user.userId || 'anonymous', name: user.name || 'Anonymous', color: CURSOR_COLORS[hashToIndex(user.userId || user.name || '', CURSOR_COLORS.length)] }

  // DOM
  const root = document.createElement('div')
  root.style.cssText = 'display:flex;height:100%;font-family:Inter,sans-serif;'

  const sidebarContainer = document.createElement('div')
  root.appendChild(sidebarContainer)
  createMindMapSidebar(sidebarContainer, { userName: user.name || 'S', onSelectStore: (id) => { selectedStoreId = id; renderHeader() } })

  const mainCol = document.createElement('div')
  mainCol.style.cssText = 'flex:1;display:flex;flex-direction:column;overflow:hidden;background:var(--task-bg);'
  root.appendChild(mainCol)

  // Header
  const headerArea = document.createElement('div')
  headerArea.style.cssText = 'padding:24px 40px 16px;flex-shrink:0;'
  mainCol.appendChild(headerArea)
  const statusRow = document.createElement('div')
  statusRow.style.cssText = 'display:flex;align-items:center;gap:6px;margin-bottom:24px;'
  statusRow.innerHTML = '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#eab308;"></span><span style="font-size:12px;color:var(--app-text-tertiary);">Connecting...</span>'
  headerArea.appendChild(statusRow)
  const titleSection = document.createElement('div')
  titleSection.style.cssText = 'display:flex;flex-direction:column;gap:12px;'
  headerArea.appendChild(titleSection)

  // Canvas
  const canvasContainer = document.createElement('div')
  canvasContainer.style.cssText = 'flex:1;position:relative;overflow:hidden;cursor:grab;'
  mainCol.appendChild(canvasContainer)

  // Dot grid
  const dotGrid = document.createElement('div')
  dotGrid.style.cssText = 'position:absolute;inset:0;pointer-events:none;opacity:0.15;'
  canvasContainer.appendChild(dotGrid)

  // SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', '100%')
  svg.setAttribute('height', '100%')
  svg.style.cssText = 'position:absolute;inset:0;overflow:visible;'
  canvasContainer.appendChild(svg)
  const svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  svg.appendChild(svgGroup)

  container.appendChild(root)

  // Pan/zoom events
  canvasContainer.onmousedown = (e) => {
    if (e.button !== 0) return
    if (e.target.closest('.mindmap-node') || e.target.closest('button') || e.target.closest('input')) return
    isPanning = true; lastMouse = { x: e.clientX, y: e.clientY }; canvasContainer.style.cursor = 'grabbing'; e.preventDefault()
  }
  canvasContainer.onmousemove = (e) => {
    if (!isPanning) return
    pan.x += e.clientX - lastMouse.x; pan.y += e.clientY - lastMouse.y
    lastMouse = { x: e.clientX, y: e.clientY }
    updateTransform()
  }
  canvasContainer.onmouseup = () => { isPanning = false; canvasContainer.style.cursor = 'grab' }
  canvasContainer.onmouseleave = () => { isPanning = false; canvasContainer.style.cursor = 'grab' }
  canvasContainer.onwheel = (e) => { e.preventDefault(); zoom = Math.min(3, Math.max(0.2, zoom * (e.deltaY > 0 ? 0.95 : 1.05))); updateTransform() }

  function updateTransform() {
    svgGroup.setAttribute('transform', `translate(${pan.x}, ${pan.y}) scale(${zoom})`)
    dotGrid.style.backgroundImage = 'radial-gradient(circle, var(--task-connector) 1px, transparent 1px)'
    dotGrid.style.backgroundSize = `${20 * zoom}px ${20 * zoom}px`
    dotGrid.style.backgroundPosition = `${pan.x % (20 * zoom)}px ${pan.y % (20 * zoom)}px`
  }

  // [Velt] Initialize CRDT XML store
  store = await createVeltStore({ id: STORE_ID, type: 'xml', veltClient })
  if (!store) return { destroy() { root.remove() } }

  const xml = store.getXml()
  if (xml && xml.length === 0) {
    const doc = store.getDoc()
    doc.transact(() => { populateInitialContent(xml) })
  }

  function readTree() {
    if (!store) return
    const x = store.getXml()
    if (!x) return
    tree = xmlToTree(x)
    renderCanvas()
  }

  // [Velt] Subscribe to store changes (local + remote)
  // Skip re-render while editing to avoid destroying the active input
  storeUnsub = store.subscribe(() => {
    const x = store.getXml()
    if (!x) return
    tree = xmlToTree(x)
    if (!editingId) renderCanvas()
  })
  readTree()

  // [Velt] Comment annotations — subscribe to get counts per node
  try {
    const commentElement = veltClient.getCommentElement()
    if (commentElement) {
      annotationSub = commentElement.getAllCommentAnnotations().subscribe((annotations) => {
        const dataMap = {}
        if (annotations && Array.isArray(annotations)) {
          annotations.forEach((annotation) => {
            const targetId = annotation.targetElementId
            if (targetId) {
              if (!dataMap[targetId]) dataMap[targetId] = { count: 0, hasUnread: false }
              if (annotation.status?.id !== 'RESOLVED') dataMap[targetId].count = annotation.comments?.length || 0
              if (annotation.unread) dataMap[targetId].hasUnread = true
            }
          })
        }
        annotationDataByTargetId = dataMap
        renderCanvas()
      })
    }
  } catch (e) { console.warn('[MindMapEditor] Comment annotations not available:', e) }

  // [Velt] Live focus — broadcast and subscribe to per-user node focus
  const liveStateElement = veltClient.getLiveStateSyncElement()
  if (liveStateElement) {
    liveStateSub = liveStateElement.getLiveStateData('core-crdt-xml-focuses', { listenToNewChangesOnly: true })
      .subscribe((data) => { remoteFocuses = data || {}; renderCanvas() })
  }

  function broadcastFocus(nodeId) {
    if (!liveStateElement) return
    liveStateElement.setLiveStateData('core-crdt-xml-focuses', {
      ...remoteFocuses, [localUser.userId]: { name: localUser.name, color: localUser.color, nodeId, timestamp: Date.now() }
    })
  }

  // Mutations
  function addChild(parentId) {
    const x = store.getXml()
    if (!x) return
    const parent = findElementById(x, parentId)
    if (!parent) return
    const newId = generateId()
    store.getDoc().transact(() => {
      const el = new Y.XmlElement('node')
      el.setAttribute('id', newId)
      el.setAttribute('text', 'New Node')
      parent.insert(parent.length, [el])
    })
    editingId = newId
  }

  function updateNodeText(nodeId, text) {
    const x = store.getXml()
    if (!x) return
    const el = findElementById(x, nodeId)
    if (!el) return
    store.getDoc().transact(() => { el.setAttribute('text', text) })
  }

  function deleteNode(nodeId) {
    const x = store.getXml()
    if (!x) return
    const result = findElementWithParent(x, nodeId)
    if (!result) return
    store.getDoc().transact(() => { result.parent.delete(result.index, 1) })
  }

  // Find node in tree by ID
  function findNodeById(node, id) {
    if (!node) return null
    if (node.id === id) return node
    for (const child of node.children) {
      const found = findNodeById(child, id)
      if (found) return found
    }
    return null
  }

  // Comment modal
  let commentModal = null
  function showCommentModal(node) {
    if (commentModal) commentModal.remove()
    const targetId = `mindmap-node-${node.id}`
    commentModal = document.createElement('div')
    commentModal.innerHTML = `
      <div class="comment-overlay" style="position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:60;"></div>
      <div class="comment-center" style="position:fixed;inset:0;z-index:70;display:flex;align-items:center;justify-content:center;padding:16px;">
        <div class="comment-box" style="background:var(--task-surface);border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);max-width:512px;width:100%;max-height:80vh;display:flex;flex-direction:column;">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid rgb(229,231,235);">
            <h3 style="font-size:14px;font-weight:600;color:var(--task-text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${node.text}</h3>
            <button class="comment-close-btn" style="width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:6px;border:none;background:transparent;cursor:pointer;">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M15 5L5 15M5 5l10 10" stroke="var(--task-text-secondary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
          <div style="flex:1;overflow:auto;" id="${targetId}">
            <!-- [Velt] Inline comments section for this mind-map node -->
            <velt-inline-comments-section target-element-id="${targetId}" shadow-dom="false" composer-position="bottom" multi-thread="false"></velt-inline-comments-section>
          </div>
        </div>
      </div>`
    document.body.appendChild(commentModal)
    commentModal.querySelector('.comment-overlay').onclick = closeCommentModal
    commentModal.querySelector('.comment-center').onclick = closeCommentModal
    commentModal.querySelector('.comment-box').onclick = (e) => e.stopPropagation()
    commentModal.querySelector('.comment-close-btn').onclick = closeCommentModal
  }

  function closeCommentModal() {
    if (commentModal) { commentModal.remove(); commentModal = null }
  }

  // Rendering
  function renderHeader() {
    const item = storeItems.find(s => s.id === selectedStoreId)
    titleSection.innerHTML = `<h1 style="font-size:32px;font-weight:700;line-height:1.2;color:var(--task-text);font-family:Inter,sans-serif;">${item?.name || 'SDK Buying Decision'}</h1><p style="font-size:16px;color:var(--task-text);font-family:Inter,sans-serif;">Pros and cons of using SDK</p>`
  }

  function renderCanvas() {
    const rootNode = tree[0]
    if (!rootNode) { svgGroup.innerHTML = ''; return }

    // Layout at origin, then center
    const raw = layoutTree(rootNode, 0, 0)
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
    for (const [, pos] of raw.positions) {
      minX = Math.min(minX, pos.x); maxX = Math.max(maxX, pos.x + pos.w)
      minY = Math.min(minY, pos.y); maxY = Math.max(maxY, pos.y + NODE_H)
    }

    // fitView on first render
    if (!hasFitView) {
      const cw = canvasContainer.clientWidth, ch = canvasContainer.clientHeight
      if (cw > 0 && ch > 0) {
        const treeW = maxX - minX, treeH = maxY - minY
        const scaleX = cw / (treeW * 1.3), scaleY = ch / (treeH * 1.3)
        const fitZoom = Math.min(scaleX, scaleY, 1)
        zoom = fitZoom
        pan.x = (cw - treeW * fitZoom) / 2 - minX * fitZoom
        pan.y = (ch - treeH * fitZoom) / 2 - minY * fitZoom
        updateTransform()
        hasFitView = true
      }
    }

    // Build SVG content
    let html = buildConnectorPath(rootNode, raw.positions)
    html += buildNodes(rootNode, raw.positions, true)
    svgGroup.innerHTML = html

    // Attach events to nodes — use JS hover since CSS :hover doesn't work in SVG foreignObject
    svgGroup.querySelectorAll('.mindmap-node').forEach(nodeEl => {
      const nodeId = nodeEl.dataset.nodeId
      nodeEl.onclick = () => broadcastFocus(nodeId)
      nodeEl.ondblclick = () => { editingId = nodeId; renderCanvas() }
      const hoverBtns = nodeEl.querySelectorAll('.mindmap-hover-btn')
      nodeEl.onmouseenter = () => { hoverBtns.forEach(b => b.style.opacity = '1') }
      nodeEl.onmouseleave = () => { hoverBtns.forEach(b => b.style.opacity = '0') }
    })
    svgGroup.querySelectorAll('.node-add-btn').forEach(btn => {
      btn.onclick = (e) => { e.stopPropagation(); addChild(btn.dataset.parentId) }
    })
    svgGroup.querySelectorAll('.node-delete-btn').forEach(btn => {
      btn.onclick = (e) => { e.stopPropagation(); deleteNode(btn.dataset.nodeId) }
    })
    svgGroup.querySelectorAll('.node-comment-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation()
        const nodeId = btn.dataset.nodeId
        const node = findNodeById(tree[0], nodeId)
        if (node) showCommentModal(node)
      }
    })

    // Handle editing inputs
    svgGroup.querySelectorAll('.node-edit-input').forEach(input => {
      const nodeId = input.dataset.nodeId
      input.focus()
      input.select()
      input.oninput = () => { updateNodeText(nodeId, input.value) }
      input.onkeydown = (e) => {
        if (e.key === 'Enter') { editingId = null; renderCanvas() }
        if (e.key === 'Escape') { editingId = null; renderCanvas() }
      }
      input.onclick = (e) => e.stopPropagation()
    })
  }

  function buildNodes(node, positions, isRoot) {
    const pos = positions.get(node.id)
    if (!pos) return ''

    // Remote focus
    let focusUser = null, focusColor = null
    for (const [uid, entry] of Object.entries(remoteFocuses)) {
      if (uid === localUser.userId) continue
      if (Date.now() - (entry.timestamp || 0) > 30000) continue
      if (entry.nodeId === node.id) { focusUser = entry.name; focusColor = entry.color; break }
    }

    const isEditing = editingId === node.id
    const borderStyle = focusColor ? `border:2px solid ${focusColor}` : `border:1px solid var(--task-border)`

    let html = `<foreignObject x="${pos.x}" y="${pos.y - 18}" width="${pos.w}" height="${NODE_H + 18}" style="overflow:visible;">
      <div xmlns="http://www.w3.org/1999/xhtml" style="padding-top:18px;">
        <div id="mindmap-node-${node.id}" class="mindmap-node" data-node-id="${node.id}" style="width:${pos.w}px;height:${NODE_H}px;${borderStyle};">
          ${focusUser ? `<div style="position:absolute;top:-18px;left:4px;font-size:9px;font-weight:600;padding:2px 6px;border-radius:4px;color:white;background:${focusColor};white-space:nowrap;">${focusUser}</div>` : ''}
          ${isEditing
            ? `<input class="node-edit-input" data-node-id="${node.id}" value="${node.text.replace(/"/g, '&quot;')}" style="background:transparent;border:none;outline:none;font-size:16px;width:100%;text-align:center;color:var(--task-text);font-family:Inter,sans-serif;" />`
            : `<span style="flex:1;white-space:nowrap;text-align:center;">${node.text}</span>`
          }
          ${(() => {
            const annot = annotationDataByTargetId[`mindmap-node-${node.id}`]
            const count = annot?.count || 0
            const hasUnread = annot?.hasUnread || false
            const alwaysVisible = count > 0
            return `<button class="node-comment-btn ${alwaysVisible ? '' : 'mindmap-hover-btn'}" data-node-id="${node.id}" style="flex-shrink:0;${alwaysVisible ? 'opacity:1;' : 'opacity:0;'}transition:opacity 0.15s;background:transparent;border:none;cursor:pointer;padding:0;display:flex;align-items:center;gap:2px;">
              <span style="position:relative;display:inline-flex;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgb(152,152,152)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                ${hasUnread ? '<span style="position:absolute;top:-2px;right:-2px;width:5px;height:5px;background:#BD323C;border-radius:50%;"></span>' : ''}
              </span>
              ${count > 0 ? `<span style="font-size:9px;font-weight:500;color:rgb(152,152,152);">${count}</span>` : ''}
            </button>`
          })()}
          <button class="node-add-btn mindmap-hover-btn" data-parent-id="${node.id}" style="flex-shrink:0;opacity:0;transition:opacity 0.15s;background:transparent;border:none;cursor:pointer;padding:0;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(0,109,220)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          </button>
          ${!isRoot ? `<button class="node-delete-btn mindmap-hover-btn" data-node-id="${node.id}" style="flex-shrink:0;opacity:0;transition:opacity 0.15s;background:transparent;border:none;cursor:pointer;padding:0;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--task-text-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>` : ''}
        </div>
      </div>
    </foreignObject>`

    for (const child of node.children) html += buildNodes(child, positions, false)
    return html
  }

  renderHeader()
  renderCanvas()
  statusRow.innerHTML = '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#22c55e;"></span><span style="font-size:12px;color:var(--app-text-tertiary);">Synced</span>'
  updateTransform()

  return {
    el: root,
    destroy() {
      closeCommentModal()
      if (annotationSub) annotationSub.unsubscribe()
      if (storeUnsub) storeUnsub()
      if (liveStateSub) liveStateSub.unsubscribe()
      if (store) store.destroy()
      root.remove()
    },
  }
}
