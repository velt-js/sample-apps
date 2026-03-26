'use client'

import { useState, useRef, useEffect } from 'react'
import { Task, TaskStatus } from './types'
import { ChevronDownIcon, StatusOpenIcon, StatusInProgressIcon, StatusResolvedIcon, CommentIcon, TrashIcon } from './icons'

function relativeTime(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

const STATUS_CONFIG: Record<TaskStatus, { icon: React.ReactNode; label: string }> = {
  'open': { icon: <StatusOpenIcon />, label: 'Open' },
  'in-progress': { icon: <StatusInProgressIcon />, label: 'In Progress' },
  'resolved': { icon: <StatusResolvedIcon />, label: 'Resolved' },
}

const STATUS_CYCLE: TaskStatus[] = ['open', 'in-progress', 'resolved']

interface TaskRowProps {
  task: Task
  isExpanded: boolean
  remoteFocusUser: string | null
  remoteFocusColor: string | null
  annotationData: { count: number; hasUnread: boolean } | undefined
  onToggleExpand: (id: string) => void
  onUpdateTask: (id: string, changes: Partial<Task>) => void
  onDeleteTask: (id: string) => void
  onFocus: (taskId: string) => void
  onCommentClick: (task: Task) => void
}

export default function TaskRow({
  task,
  isExpanded,
  remoteFocusUser,
  remoteFocusColor,
  annotationData,
  onToggleExpand,
  onUpdateTask,
  onDeleteTask,
  onFocus,
  onCommentClick,
}: TaskRowProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(task.title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  useEffect(() => {
    setEditValue(task.title)
  }, [task.title])

  const handleStatusClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const currentIdx = STATUS_CYCLE.indexOf(task.status)
    const nextStatus = STATUS_CYCLE[(currentIdx + 1) % STATUS_CYCLE.length]
    onUpdateTask(task.id, { status: nextStatus })
  }

  const handleTitleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleTitleBlur = () => {
    setIsEditing(false)
    if (editValue.trim() && editValue !== task.title) {
      onUpdateTask(task.id, { title: editValue.trim() })
    } else {
      setEditValue(task.title)
    }
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      ;(e.target as HTMLInputElement).blur()
    } else if (e.key === 'Escape') {
      setEditValue(task.title)
      setIsEditing(false)
    }
  }

  const statusConfig = STATUS_CONFIG[task.status]
  const targetElementId = `task-${task.id}`

  return (
    <div
      id={targetElementId}
      className="task-row group"
      style={{
        borderLeft: remoteFocusColor ? `3px solid ${remoteFocusColor}` : undefined,
      }}
      onClick={() => {
        onToggleExpand(task.id)
        onFocus(task.id)
      }}
    >
      {/* Remote focus indicator */}
      {remoteFocusUser && (
        <div
          className="absolute -top-2 -left-1 text-[10px] font-semibold px-1.5 py-0.5 rounded text-white z-10"
          style={{ backgroundColor: remoteFocusColor || '#999' }}
        >
          {remoteFocusUser}
        </div>
      )}

      {/* Main row */}
      <div className="flex items-center w-full gap-3">
        {/* Chevron */}
        <ChevronDownIcon
          size={16}
          color="var(--task-chevron)"
          className={`shrink-0 transition-transform duration-200 ${isExpanded ? '' : '-rotate-90'}`}
        />

        {/* Title — flexible, takes remaining space */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              ref={inputRef}
              className="text-sm font-medium bg-transparent border-none outline-none w-full"
              style={{ fontFamily: 'Inter, sans-serif', color: 'var(--task-text)' }}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleTitleBlur}
              onKeyDown={handleTitleKeyDown}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span
              className="text-sm font-medium truncate block"
              style={{ fontFamily: 'Inter, sans-serif', color: 'var(--task-text)' }}
              onDoubleClick={handleTitleDoubleClick}
            >
              {task.title}
            </span>
          )}
        </div>

        {/* Status */}
        <button
          className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0"
          onClick={handleStatusClick}
        >
          {statusConfig.icon}
          <span
            className="text-sm font-medium whitespace-nowrap"
            style={{ fontFamily: 'Inter, sans-serif', color: 'var(--task-text)' }}
          >
            {statusConfig.label}
          </span>
        </button>

        {/* Date */}
        <span
          className="text-sm font-medium whitespace-nowrap shrink-0"
          style={{ fontFamily: 'Inter, sans-serif', color: 'var(--task-text-secondary)' }}
        >
          {relativeTime(task.createdAt)}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            className="flex items-center justify-center p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors"
            onClick={() => onCommentClick(task)}
            title="Comments"
          >
            <CommentIcon
              count={annotationData?.count || 0}
              hasUnread={annotationData?.hasUnread || false}
            />
          </button>
          <button
            className="flex items-center justify-center p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors opacity-0 group-hover:opacity-100"
            onClick={() => onDeleteTask(task.id)}
            title="Delete task"
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div
          className="mt-4 rounded-xl p-6"
          style={{ backgroundColor: 'var(--task-expanded-bg)' }}
        >
          <p
            className="text-base font-medium leading-6"
            style={{ fontFamily: 'Inter, sans-serif', color: 'var(--task-expanded-text)' }}
          >
            {task.description}
          </p>
        </div>
      )}
    </div>
  )
}
