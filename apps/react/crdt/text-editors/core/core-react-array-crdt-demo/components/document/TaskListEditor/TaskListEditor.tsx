'use client'

import { useState, useRef, useCallback, useMemo } from 'react'
import { useStore } from '@veltdev/crdt-react'
import { useVeltClient, useLiveState, VeltCommentsSidebar, useGetCommentAnnotations } from '@veltdev/react'
import { Task, FocusMap } from './types'
import { STORE_ID, CURSOR_COLORS, initialTasks, teamLists } from './constants'
import { SearchIcon, PlusIcon } from './icons'
import TaskRow from './TaskRow'
import TaskListSidebar from './TaskListSidebar'
import TaskCommentsModal from './TaskCommentsModal'
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

export default function TaskListEditor() {
  const { client } = useVeltClient()
  const { user } = useAppUser()

  // CRDT array store
  const {
    value: tasks,
    update: updateTasks,
    store,
    isLoading,
    isSynced,
    status,
    error,
  } = useStore<Task[]>({
    storeId: STORE_ID,
    type: 'array',
    initialValue: initialTasks,
  })

  // Local UI state
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedListId, setSelectedListId] = useState('marketing')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Comment sidebar state
  const [isGlobalSidebarOpen, setIsGlobalSidebarOpen] = useState(false)
  const [activeCommentToolId, setActiveCommentToolId] = useState<string | null>(null)

  // Comment modal state
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
  const [selectedCommentTask, setSelectedCommentTask] = useState<Task | null>(null)

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

  const handleCommentClick = useCallback((task: Task) => {
    setSelectedCommentTask(task)
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
  const [focuses, setFocuses] = useLiveState<FocusMap>('core-crdt-task-focuses', {}, {
    syncDuration: 100,
    listenToNewChangesOnly: true,
  })
  const focusesRef = useRef<FocusMap>(focuses || {})
  focusesRef.current = focuses || {}

  const broadcastFocus = useCallback((taskId: string | null) => {
    if (!localUserRef.current) return
    const u = localUserRef.current
    setFocuses({
      ...focusesRef.current,
      [u.userId]: {
        name: u.name,
        color: u.color,
        taskId,
        timestamp: Date.now(),
      },
    })
  }, [setFocuses])

  // Remote focus map (exclude self, filter stale >30s)
  const remoteFocusMap = useMemo(() => {
    const map: Record<string, { name: string; color: string }> = {}
    for (const [uid, entry] of Object.entries(focuses || {})) {
      if (uid === localUserRef.current?.userId) continue
      if (Date.now() - entry.timestamp > 30000) continue
      if (entry.taskId) {
        map[entry.taskId] = { name: entry.name, color: entry.color }
      }
    }
    return map
  }, [focuses])

  // CRDT mutation handlers
  const addTask = useCallback(() => {
    const current = store?.getValue() || []
    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      title: 'New Task',
      status: 'open',
      description: '',
      createdAt: Date.now(),
      commentCount: 0,
    }
    if (Array.isArray(current)) {
      updateTasks([...current, newTask])
    } else {
      updateTasks([newTask])
    }
  }, [store, updateTasks])

  const updateTask = useCallback((id: string, changes: Partial<Task>) => {
    const current = store?.getValue() || []
    if (Array.isArray(current)) {
      updateTasks(current.map(t => t.id === id ? { ...t, ...changes } : t))
    }
  }, [store, updateTasks])

  const deleteTask = useCallback((id: string) => {
    const current = store?.getValue() || []
    if (Array.isArray(current)) {
      updateTasks(current.filter(t => t.id !== id))
    }
    if (expandedTaskId === id) {
      setExpandedTaskId(null)
    }
  }, [store, updateTasks, expandedTaskId])

  const toggleExpand = useCallback((id: string) => {
    setExpandedTaskId(prev => prev === id ? null : id)
  }, [])

  // Status indicator
  const statusDotColor =
    status === 'connected' ? (isSynced ? '#22c55e' : '#eab308') :
    status === 'connecting' ? '#eab308' : '#ef4444'
  const statusLabel =
    status === 'connected' ? (isSynced ? 'Synced' : 'Syncing...') :
    status === 'connecting' ? 'Connecting...' : 'Disconnected'

  // Filter tasks
  const taskList = Array.isArray(tasks) ? tasks : []
  const filteredTasks = searchQuery
    ? taskList.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : taskList

  // Selected team name
  const selectedTeam = teamLists.find(l => l.id === selectedListId)
  const teamName = selectedTeam?.name || 'Marketing Tasks'

  if (isLoading) return (
    <div className="flex h-screen items-center justify-center" style={{ color: 'var(--task-text-secondary)' }}>
      Loading...
    </div>
  )
  if (error) return (
    <div className="flex h-screen items-center justify-center" style={{ color: '#ef4444' }}>
      Error: {error.message}
    </div>
  )

  return (
    <div className="flex h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <TaskListSidebar
        selectedListId={selectedListId}
        onSelectList={setSelectedListId}
        userName={user?.name || 'S'}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(prev => !prev)}
      />

      {/* Main content + comment sidebar */}
      <div className="flex flex-1 overflow-hidden" style={{ backgroundColor: 'var(--task-bg)' }}>
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[870px] mx-auto px-4 sm:px-6 lg:px-10 pt-6 sm:pt-10">
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
                {teamName}
              </h1>
              <p
                className="text-base"
                style={{ fontFamily: 'Inter, sans-serif', color: 'var(--task-text)' }}
              >
                Please make sure to update your tasks before logging off
              </p>
            </div>

            {/* Action bar */}
            <div className="flex items-center gap-[11px] mb-7">
              {/* Search */}
              <div className="flex-1 relative">
                <div
                  className="flex items-center gap-[11px] rounded-lg px-3"
                  style={{
                    backgroundColor: 'var(--task-search-bg)',
                    height: 41,
                  }}
                >
                  <SearchIcon size={16} color="var(--task-search-placeholder)" />
                  <input
                    className="flex-1 bg-transparent border-none outline-none text-sm font-medium"
                    style={{ fontFamily: 'Inter, sans-serif', color: 'var(--task-search-text)' }}
                    placeholder="Search tasks"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              {/* Add button */}
              <button
                className="flex items-center gap-[11px] rounded-lg px-3 shrink-0 hover:bg-blue-50 transition-colors"
                style={{
                  height: 41,
                  border: '1px solid rgb(0,109,220)',
                }}
                onClick={addTask}
              >
                <PlusIcon size={16} color="rgb(0,109,220)" />
                <span
                  className="text-sm font-medium"
                  style={{ fontFamily: 'Inter, sans-serif', color: 'var(--task-text)' }}
                >
                  Add New Task
                </span>
              </button>
            </div>

            {/* Task list */}
            <div className="flex flex-col gap-2 pb-10">
              {filteredTasks.map(task => {
                const remoteFocus = remoteFocusMap[task.id]
                return (
                  <TaskRow
                    key={task.id}
                    task={task}
                    isExpanded={expandedTaskId === task.id}
                    remoteFocusUser={remoteFocus?.name || null}
                    remoteFocusColor={remoteFocus?.color || null}
                    annotationData={annotationDataByTargetId[`task-${task.id}`]}
                    onToggleExpand={toggleExpand}
                    onUpdateTask={updateTask}
                    onDeleteTask={deleteTask}
                    onFocus={broadcastFocus}
                    onCommentClick={handleCommentClick}
                  />
                )
              })}
              {filteredTasks.length === 0 && (
                <div className="text-center py-12 text-sm" style={{ color: 'var(--task-text-secondary)' }}>
                  {searchQuery ? 'No tasks match your search' : 'No tasks yet. Click "Add New Task" to get started.'}
                </div>
              )}
            </div>
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

      {/* Comment popover modal */}
      <TaskCommentsModal
        isOpen={isCommentModalOpen}
        selectedTask={selectedCommentTask}
        onClose={() => {
          setIsCommentModalOpen(false)
          setSelectedCommentTask(null)
        }}
      />
    </div>
  )
}
