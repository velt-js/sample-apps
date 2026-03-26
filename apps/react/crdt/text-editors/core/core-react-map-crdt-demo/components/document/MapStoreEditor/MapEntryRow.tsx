'use client'

import { useState, useRef, useEffect } from 'react'
import { GripVerticalIcon, TrashIcon, CommentIcon } from './icons'

interface MapEntryRowProps {
  entryKey: string
  entryValue: string
  remoteFocusUser: string | null
  remoteFocusColor: string | null
  annotationData: { count: number; hasUnread: boolean } | undefined
  onUpdate: (oldKey: string, newKey: string, newValue: string) => void
  onDelete: (key: string) => void
  onFocus: (key: string) => void
  onCommentClick: (key: string, value: string) => void
}

export default function MapEntryRow({
  entryKey,
  entryValue,
  remoteFocusUser,
  remoteFocusColor,
  annotationData,
  onUpdate,
  onDelete,
  onFocus,
  onCommentClick,
}: MapEntryRowProps) {
  const [editKey, setEditKey] = useState(entryKey)
  const [editValue, setEditValue] = useState(entryValue)
  const keyRef = useRef<HTMLInputElement>(null)
  const valueRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setEditKey(entryKey)
  }, [entryKey])

  useEffect(() => {
    setEditValue(entryValue)
  }, [entryValue])

  const handleKeyBlur = () => {
    if (editKey.trim() && editKey !== entryKey) {
      onUpdate(entryKey, editKey.trim(), editValue)
    } else if (!editKey.trim()) {
      setEditKey(entryKey)
    }
  }

  const handleValueBlur = () => {
    if (editValue !== entryValue) {
      onUpdate(entryKey, editKey, editValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      ;(e.target as HTMLInputElement).blur()
    } else if (e.key === 'Escape') {
      setEditKey(entryKey)
      setEditValue(entryValue)
      ;(e.target as HTMLInputElement).blur()
    }
  }

  const targetElementId = `map-entry-${entryKey.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <div className="flex items-center gap-[10px]">
      {/* Grip handle */}
      <div className="w-8 h-8 flex items-center justify-center shrink-0 cursor-grab">
        <GripVerticalIcon size={16} color="var(--task-text)" />
      </div>

      {/* Card */}
      <div
        id={targetElementId}
        className="map-entry-row flex-1 flex items-center gap-5 relative group"
        style={{
          borderLeft: remoteFocusColor ? `3px solid ${remoteFocusColor}` : undefined,
        }}
        onClick={() => onFocus(entryKey)}
      >
        {/* Remote focus label */}
        {remoteFocusUser && (
          <div
            className="absolute -top-2 -left-1 text-[10px] font-semibold px-1.5 py-0.5 rounded text-white z-10"
            style={{ backgroundColor: remoteFocusColor || '#999' }}
          >
            {remoteFocusUser}
          </div>
        )}

        {/* Key input */}
        <input
          ref={keyRef}
          className="bg-transparent border-none outline-none text-base font-medium flex-1 min-w-0"
          style={{ fontFamily: 'Inter, sans-serif', color: 'var(--task-text)' }}
          value={editKey}
          onChange={(e) => setEditKey(e.target.value)}
          onBlur={handleKeyBlur}
          onKeyDown={handleKeyDown}
          onFocus={() => onFocus(entryKey)}
        />

        {/* Vertical separator */}
        <div
          className="w-0 h-5 shrink-0"
          style={{ borderLeft: '1px solid var(--task-separator)' }}
        />

        {/* Value input */}
        <input
          ref={valueRef}
          className="bg-transparent border-none outline-none text-base font-medium flex-1 min-w-0"
          style={{ fontFamily: 'Inter, sans-serif', color: 'var(--task-text)' }}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleValueBlur}
          onKeyDown={handleKeyDown}
          onFocus={() => onFocus(entryKey)}
        />

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            className="flex items-center justify-center p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors"
            onClick={() => onCommentClick(entryKey, entryValue)}
            title="Comments"
          >
            <CommentIcon
              count={annotationData?.count || 0}
              hasUnread={annotationData?.hasUnread || false}
            />
          </button>
          <button
            className="flex items-center justify-center p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(entryKey)
            }}
            title="Delete entry"
          >
            <TrashIcon size={18} color="var(--task-text)" />
          </button>
        </div>
      </div>
    </div>
  )
}
