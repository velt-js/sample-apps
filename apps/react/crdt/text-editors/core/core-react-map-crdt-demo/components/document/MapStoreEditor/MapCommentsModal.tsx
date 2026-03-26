'use client'

import { VeltInlineCommentsSection } from '@veltdev/react'

interface MapCommentsModalProps {
  isOpen: boolean
  selectedEntryKey: string | null
  selectedEntryValue: string | null
  onClose: () => void
}

export default function MapCommentsModal({ isOpen, selectedEntryKey, selectedEntryValue, onClose }: MapCommentsModalProps) {
  if (!isOpen || !selectedEntryKey) return null

  const targetId = `map-entry-${selectedEntryKey.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[60]" onClick={onClose} />

      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={onClose}>
        <div
          className="bg-white dark:bg-[rgb(30,30,30)] rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3
              className="text-sm font-semibold truncate"
              style={{ color: 'var(--task-text)' }}
            >
              {selectedEntryKey}: {selectedEntryValue}
            </h3>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-7 h-7 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5l10 10" stroke="var(--task-text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div
            className="flex-1 overflow-auto"
            id={targetId}
          >
            <VeltInlineCommentsSection
              context={{
                entryKey: selectedEntryKey,
                entryValue: selectedEntryValue,
                commentType: 'map-entry',
              }}
              variant="action-inline-composer"
              targetElementId={targetId}
              shadowDom={false}
              composerPosition="bottom"
              multiThread={false}
            />
          </div>
        </div>
      </div>
    </>
  )
}
