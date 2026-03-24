'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@veltdev/crdt-react'
import { CoreEditorProps } from './types'
import { initialContent } from './constants'

const STORE_ID = 'core-crdt-notepad-1'

export default function CoreEditor({ scrollContainerRef }: CoreEditorProps) {
  // [Velt] Initialize CRDT store for real-time collaborative text editing
  // Matches reference demo: useStore with type 'text', simple textarea binding
  const {
    value: text,
    update: updateText,
    isLoading,
    isSynced: hookSynced,
    status: hookStatus,
    error,
    store,
  } = useStore<string>({
    storeId: STORE_ID,
    type: 'text',
    initialValue: initialContent,
  })

  // Workaround: useStore has a race condition where the provider emits 'connected'
  // before the hook subscribes to events. Read provider status directly.
  const [realStatus, setRealStatus] = useState<string>('connecting')
  const [realSynced, setRealSynced] = useState(false)

  useEffect(() => {
    if (!store) return
    const provider = store.getProvider?.()
    if (!provider) return

    if (provider.status && provider.status !== 'connecting') {
      setRealStatus(provider.status)
    }
    if (provider.synced) {
      setRealSynced(true)
    }

    const onStatus = ({ status: s }: { status: string }) => setRealStatus(s)
    const onSynced = (synced: boolean) => setRealSynced(synced)
    provider.on('status', onStatus)
    provider.on('synced', onSynced)

    return () => {
      provider.off?.('status', onStatus)
      provider.off?.('synced', onSynced)
    }
  }, [store])

  const status = realStatus !== 'connecting' ? realStatus : hookStatus
  const isSynced = realSynced || hookSynced

  // [Velt] Real-time connection and sync status
  const statusDotColor =
    status === 'connected' ? (isSynced ? '#22c55e' : '#eab308') :
    status === 'connecting' ? '#eab308' : '#ef4444'

  const statusLabel =
    status === 'connected' ? (isSynced ? 'Synced' : 'Syncing…') :
    status === 'connecting' ? 'Connecting…' : 'Disconnected'

  // Simple textarea onChange — exactly like the reference demo
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateText(e.target.value)
  }

  return (
    <div className="relative size-full overflow-hidden" style={{ backgroundColor: 'var(--app-bg)' }} data-name="Core / CRDT Editor">
      <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-auto pb-20">
        <div className="flex justify-center pt-[51px] px-4">
          <div className="w-full max-w-[850px]">
            {/* [Velt] Real-time connection and sync status from useStore */}
            <div className="flex items-center gap-1.5 mb-2 px-1">
              <span
                className="inline-block size-2 rounded-full shrink-0"
                style={{ backgroundColor: statusDotColor }}
              />
              <span className="text-xs" style={{ color: 'var(--app-text-tertiary)' }}>
                {statusLabel}
              </span>
            </div>
            <div
              className="border border-solid rounded-[16px] p-[42px_56px_64px_56px] min-h-[880px]"
              style={{ backgroundColor: 'var(--app-surface)', borderColor: 'var(--app-surface-border)' }}
            >
              <div className="w-full max-w-[738px]">
                <textarea
                  className="core-editor-textarea"
                  value={text ?? ''}
                  onChange={handleTextChange}
                  placeholder="Start typing..."
                  spellCheck={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
