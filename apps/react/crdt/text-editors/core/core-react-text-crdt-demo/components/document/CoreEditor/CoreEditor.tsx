'use client'

import { useRef, useEffect } from 'react'
import { useStore } from '@veltdev/crdt-react'
// useVeltClient no longer needed — store.updateAwareness() resolves user internally
import { CoreEditorProps } from './types'
import { initialContent } from './constants'
import RemoteCursors from './RemoteCursors'

const STORE_ID = 'core-crdt-notepad-1'

// ── Component ───────────────────────────────────────────────────────

export default function CoreEditor({ scrollContainerRef }: CoreEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // [Velt] CRDT store
  const {
    value: text,
    update: updateText,
    status,
    isSynced,
    store,
  } = useStore<string>({
    storeId: STORE_ID,
    type: 'text',
    initialValue: initialContent,
  })

  const content = text ?? ''

  // Expose store for testing
  useEffect(() => {
    if (store) (window as any).__testStore = store
  }, [store])

  // Auto-grow textarea so content doesn't need internal scrolling
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = ta.scrollHeight + 'px'
  }, [content])

  // Status
  const statusDotColor =
    status === 'connected' ? (isSynced ? '#22c55e' : '#eab308') :
    status === 'connecting' ? '#eab308' : '#ef4444'
  const statusLabel =
    status === 'connected' ? (isSynced ? 'Synced' : 'Syncing…') :
    status === 'connecting' ? 'Connecting…' : 'Disconnected'

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateText(e.target.value)
  }

  return (
    <div className="relative size-full overflow-hidden" style={{ backgroundColor: 'var(--app-bg)' }} data-name="Core / CRDT Editor">
      <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-auto pb-20">
        <div className="flex justify-center pt-[51px] px-4">
          <div className="w-full max-w-[850px]">
            <div className="flex items-center gap-1.5 mb-2 px-1">
              <span className="inline-block size-2 rounded-full shrink-0" style={{ backgroundColor: statusDotColor }} />
              <span className="text-xs" style={{ color: 'var(--app-text-tertiary)' }}>{statusLabel}</span>
            </div>
            <div
              className="border border-solid rounded-[16px] p-[42px_56px_64px_56px] min-h-[880px]"
              style={{ backgroundColor: 'var(--app-surface)', borderColor: 'var(--app-surface-border)' }}
            >
              <div className="w-full max-w-[738px] relative">
                <textarea
                  ref={textareaRef}
                  className="core-editor-textarea"
                  value={content}
                  onChange={handleTextChange}
                  placeholder="Start typing..."
                  spellCheck={false}
                />

                <RemoteCursors
                  textareaRef={textareaRef}
                  store={store}
                  content={content}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
