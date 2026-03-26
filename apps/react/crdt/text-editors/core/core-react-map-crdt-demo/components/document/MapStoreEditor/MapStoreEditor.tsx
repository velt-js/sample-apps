'use client'

import { useState, useRef, useCallback, useMemo } from 'react'
import { useStore } from '@veltdev/crdt-react'
import { useVeltClient, useLiveState, VeltCommentsSidebar, useGetCommentAnnotations } from '@veltdev/react'
import { FocusMap } from './types'
import { STORE_ID, CURSOR_COLORS, initialMapData, storeItems } from './constants'
import { PlusIcon } from './icons'
import MapEntryRow from './MapEntryRow'
import MapStoreSidebar from './MapStoreSidebar'
import MapCommentsModal from './MapCommentsModal'
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

export default function MapStoreEditor() {
  const { client } = useVeltClient()
  const { user } = useAppUser()

  // CRDT map store
  const {
    value: entries,
    update: updateEntries,
    store,
    status,
    isSynced,
  } = useStore<Record<string, string>>({
    storeId: STORE_ID,
    type: 'map',
    initialValue: initialMapData,
  })

  // Local UI state
  const [selectedStoreId, setSelectedStoreId] = useState('image-store')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Drag-and-drop state
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  // Synced key order via useLiveState so reordering is shared
  const [keyOrder, setKeyOrder] = useLiveState<string[]>('core-crdt-map-key-order', [], {
    syncDuration: 100,
  })

  // Comment sidebar state
  const [isGlobalSidebarOpen, setIsGlobalSidebarOpen] = useState(false)
  const [activeCommentToolId, setActiveCommentToolId] = useState<string | null>(null)

  // Comment modal state
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
  const [selectedCommentKey, setSelectedCommentKey] = useState<string | null>(null)
  const [selectedCommentValue, setSelectedCommentValue] = useState<string | null>(null)

  // Annotation data for comment counts
  const commentAnnotations = useGetCommentAnnotations()

  const annotationDataByTargetId = useMemo(() => {
    const dataMap: Record<string, { count: number; hasUnread: boolean }> = {}
    if (commentAnnotations?.data) {
      Object.values(commentAnnotations.data).forEach((annotations: any[]) => {
        annotations.forEach((annotation) => {
          const targetId = annotation.targetElementId
          if (targetId) {
            if (!dataMap[targetId]) {
              dataMap[targetId] = { count: 0, hasUnread: false }
            }
            if (annotation.status?.id !== 'RESOLVED') {
              dataMap[targetId].count = annotation.comments?.length || 0
            }
            if (annotation.unread) {
              dataMap[targetId].hasUnread = true
            }
          }
        })
      })
    }
    return dataMap
  }, [commentAnnotations])

  const handleCommentClick = useCallback((key: string, value: string) => {
    setSelectedCommentKey(key)
    setSelectedCommentValue(value)
    setIsCommentModalOpen(true)
  }, [])

  const toggleGlobalSidebar = useCallback(() => {
    setIsGlobalSidebarOpen(prev => !prev)
  }, [])

  const openGlobalSidebar = useCallback(() => {
    setIsGlobalSidebarOpen(true)
  }, [])

  useVeltEventHandlers({
    toggleGlobalSidebar,
    openGlobalSidebar,
    setActiveCommentToolId,
  })

  // Get local user info
  const localUserRef = useRef<{ userId: string; name: string; color: string } | null>(null)
  if (!localUserRef.current && client) {
    try {
      const u = (client as any).getUser?.()
      if (u) {
        localUserRef.current = {
          userId: u.userId || 'anonymous',
          name: u.name || 'Anonymous',
          color: CURSOR_COLORS[hashToIndex(u.userId || u.name || '', CURSOR_COLORS.length)],
        }
      }
    } catch { /* ignore */ }
  }

  // Live focus broadcasting
  const [focuses, setFocuses] = useLiveState<FocusMap>('core-crdt-map-focuses', {}, {
    syncDuration: 100,
    listenToNewChangesOnly: true,
  })
  const focusesRef = useRef<FocusMap>(focuses || {})
  focusesRef.current = focuses || {}

  const broadcastFocus = useCallback((entryKey: string | null) => {
    if (!localUserRef.current) return
    const u = localUserRef.current
    setFocuses({
      ...focusesRef.current,
      [u.userId]: {
        name: u.name,
        color: u.color,
        entryKey,
        timestamp: Date.now(),
      },
    })
  }, [setFocuses])

  // Remote focus map
  const remoteFocusMap = useMemo(() => {
    const map: Record<string, { name: string; color: string }> = {}
    for (const [uid, entry] of Object.entries(focuses || {})) {
      if (uid === localUserRef.current?.userId) continue
      if (Date.now() - entry.timestamp > 30000) continue
      if (entry.entryKey) {
        map[entry.entryKey] = { name: entry.name, color: entry.color }
      }
    }
    return map
  }, [focuses])

  // Status indicator
  const statusDotColor =
    status === 'connected' ? (isSynced ? '#22c55e' : '#eab308') :
    status === 'connecting' ? '#eab308' : '#ef4444'
  const statusLabel =
    status === 'connected' ? (isSynced ? 'Synced' : 'Syncing...') :
    status === 'connecting' ? 'Connecting...' : 'Disconnected'

  // Get entries as ordered [key, value] pairs
  const entriesObj = (entries && typeof entries === 'object' && !Array.isArray(entries)) ? entries : {}
  const allKeys = Object.keys(entriesObj)

  // Build ordered key list: use synced keyOrder, then append any new keys not yet in the order
  const currentOrder = Array.isArray(keyOrder) ? keyOrder : []
  const orderedKeys = useMemo(() => {
    const validOrdered = currentOrder.filter(k => allKeys.includes(k))
    const newKeys = allKeys.filter(k => !currentOrder.includes(k))
    return [...validOrdered, ...newKeys]
  }, [currentOrder, allKeys])

  const entryPairs = orderedKeys.map(k => [k, entriesObj[k] ?? ''] as [string, string])

  // CRDT mutation handlers
  const addEntry = useCallback(() => {
    const current = store?.getValue() || {}
    const obj = (current && typeof current === 'object' && !Array.isArray(current)) ? current : {}
    let newKey = 'New Key'
    let counter = 1
    while (obj[newKey] !== undefined) {
      newKey = `New Key ${counter++}`
    }
    updateEntries({ ...obj, [newKey]: '' })
    setKeyOrder([...orderedKeys, newKey])
  }, [store, updateEntries, orderedKeys, setKeyOrder])

  const updateEntry = useCallback((oldKey: string, newKey: string, newValue: string) => {
    const current = store?.getValue() || {}
    const obj = (current && typeof current === 'object' && !Array.isArray(current)) ? current : {}
    const updated = { ...obj }
    if (oldKey !== newKey) {
      delete updated[oldKey]
    }
    updated[newKey] = newValue
    updateEntries(updated)
    if (oldKey !== newKey) {
      setKeyOrder(orderedKeys.map(k => k === oldKey ? newKey : k))
    }
  }, [store, updateEntries, orderedKeys, setKeyOrder])

  const deleteEntry = useCallback((key: string) => {
    const current = store?.getValue() || {}
    const obj = (current && typeof current === 'object' && !Array.isArray(current)) ? current : {}
    const updated = { ...obj }
    delete updated[key]
    updateEntries(updated)
    setKeyOrder(orderedKeys.filter(k => k !== key))
  }, [store, updateEntries, orderedKeys, setKeyOrder])

  // Drag handlers
  const handleDragStart = useCallback((index: number) => {
    setDragIndex(index)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault()
    setDragOverIndex(index)
  }, [])

  const handleDragEnd = useCallback(() => {
    if (dragIndex !== null && dragOverIndex !== null && dragIndex !== dragOverIndex) {
      const newOrder = [...orderedKeys]
      const [moved] = newOrder.splice(dragIndex, 1)
      newOrder.splice(dragOverIndex, 0, moved)
      setKeyOrder(newOrder)
    }
    setDragIndex(null)
    setDragOverIndex(null)
  }, [dragIndex, dragOverIndex, orderedKeys, setKeyOrder])

  // Selected store name
  const selectedStore = storeItems.find(s => s.id === selectedStoreId)
  const storeName = selectedStore?.name || 'Image Store'

  return (
    <div className="flex h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <MapStoreSidebar
        selectedStoreId={selectedStoreId}
        onSelectStore={setSelectedStoreId}
        userName={user?.name || 'S'}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(prev => !prev)}
      />

      {/* Main content + comment sidebar */}
      <div className="flex flex-1 overflow-hidden" style={{ backgroundColor: 'var(--task-bg)' }}>
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[600px] mx-auto px-10 pt-10">
            {/* Status */}
            <div className="flex items-center gap-1.5 mb-6">
              <span className="inline-block w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: statusDotColor }} />
              <span className="text-xs" style={{ color: 'var(--app-text-tertiary)' }}>{statusLabel}</span>
            </div>

            {/* Title section */}
            <div className="flex flex-col gap-3 mb-7">
              <h1
                className="text-[32px] font-bold leading-tight"
                style={{ fontFamily: 'Inter, sans-serif', color: 'var(--task-text)' }}
              >
                {storeName}
              </h1>
              <p
                className="text-base"
                style={{ fontFamily: 'Inter, sans-serif', color: 'var(--task-text)' }}
              >
                Store image name and urls
              </p>
            </div>

            {/* Entry rows */}
            <div className="flex flex-col gap-3 pb-6">
              {entryPairs.map(([key, value], index) => {
                const remoteFocus = remoteFocusMap[key]
                const targetId = `map-entry-${key.replace(/\s+/g, '-').toLowerCase()}`
                return (
                  <MapEntryRow
                    key={key}
                    entryKey={key}
                    entryValue={value as string}
                    index={index}
                    remoteFocusUser={remoteFocus?.name || null}
                    remoteFocusColor={remoteFocus?.color || null}
                    annotationData={annotationDataByTargetId[targetId]}
                    onUpdate={updateEntry}
                    onDelete={deleteEntry}
                    onFocus={broadcastFocus}
                    onCommentClick={handleCommentClick}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                    isDragOver={dragOverIndex === index}
                  />
                )
              })}
            </div>

            {/* Add button */}
            <button
              className="flex items-center justify-center rounded-full hover:bg-blue-50 transition-colors"
              style={{
                width: 32,
                height: 32,
                border: '1px solid rgb(0,109,220)',
              }}
              onClick={addEntry}
            >
              <PlusIcon size={16} color="rgb(0,109,220)" />
            </button>

            {entryPairs.length === 0 && (
              <div className="text-center py-12 text-sm" style={{ color: 'var(--task-text-secondary)' }}>
                No entries yet. Click the + button to add a key-value pair.
              </div>
            )}
          </div>
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
      <MapCommentsModal
        isOpen={isCommentModalOpen}
        selectedEntryKey={selectedCommentKey}
        selectedEntryValue={selectedCommentValue}
        onClose={() => {
          setIsCommentModalOpen(false)
          setSelectedCommentKey(null)
          setSelectedCommentValue(null)
        }}
      />
    </div>
  )
}
