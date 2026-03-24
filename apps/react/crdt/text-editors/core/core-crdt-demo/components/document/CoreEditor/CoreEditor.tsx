'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useStore } from '@veltdev/crdt-react'
import { useVeltClient, useLiveState } from '@veltdev/react'
import { CoreEditorProps } from './types'
import { initialContent } from './constants'

const STORE_ID = 'core-crdt-notepad-1'
const CURSOR_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2']

function hashToIndex(str: string, len: number): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash = hash & hash
  }
  return Math.abs(hash) % len
}

interface CursorEntry {
  name: string
  color: string
  anchor: number
  head: number
  timestamp: number
}

interface CursorMap {
  [userId: string]: CursorEntry
}

// Mirror div helper: measure pixel coords of a character offset in a textarea
function escapeHTML(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')
}

function getOffsetCoords(
  textarea: HTMLTextAreaElement,
  mirror: HTMLDivElement,
  offset: number,
  content: string,
) {
  syncMirrorStyles(textarea, mirror)
  const before = content.substring(0, offset)
  mirror.innerHTML = escapeHTML(before) + '<span id="__m">|</span>'
  const marker = mirror.querySelector('#__m')
  if (!marker) return null
  const mr = marker.getBoundingClientRect()
  const tr = textarea.getBoundingClientRect()
  return { top: mr.top - tr.top + textarea.scrollTop, left: mr.left - tr.left }
}

function syncMirrorStyles(textarea: HTMLTextAreaElement, mirror: HTMLDivElement) {
  const computed = window.getComputedStyle(textarea)
  const props = [
    'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing',
    'wordSpacing', 'textIndent', 'whiteSpace', 'wordWrap', 'overflowWrap',
    'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'borderWidth', 'boxSizing', 'width',
  ] as const
  for (const p of props) {
    ;(mirror.style as any)[p] = computed[p]
  }
}

function getSelectionRects(
  textarea: HTMLTextAreaElement,
  mirror: HTMLDivElement,
  start: number,
  end: number,
  content: string,
): { top: number; left: number; width: number; height: number }[] {
  if (start === end) return []
  syncMirrorStyles(textarea, mirror)
  mirror.innerHTML =
    escapeHTML(content.substring(0, start)) +
    '<span id="__sel">' + escapeHTML(content.substring(start, end)) + '</span>' +
    escapeHTML(content.substring(end))
  const span = mirror.querySelector('#__sel')
  if (!span) return []
  const range = document.createRange()
  range.selectNodeContents(span)
  const clientRects = range.getClientRects()
  const tr = textarea.getBoundingClientRect()
  const rects: { top: number; left: number; width: number; height: number }[] = []
  for (let i = 0; i < clientRects.length; i++) {
    const r = clientRects[i]
    if (r.width === 0 && r.height === 0) continue
    rects.push({
      top: r.top - tr.top + textarea.scrollTop,
      left: r.left - tr.left,
      width: r.width,
      height: r.height,
    })
  }
  return rects
}

export default function CoreEditor({ scrollContainerRef }: CoreEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const mirrorRef = useRef<HTMLDivElement>(null)
  const { client } = useVeltClient()

  // [Velt] CRDT store
  const {
    value: text,
    update: updateText,
    isSynced: hookSynced,
    status: hookStatus,
    store,
  } = useStore<string>({
    storeId: STORE_ID,
    type: 'text',
    initialValue: initialContent,
  })

  // Provider status workaround
  const [realStatus, setRealStatus] = useState<string>('connecting')
  const [realSynced, setRealSynced] = useState(false)

  useEffect(() => {
    if (!store) return
    const provider = store.getProvider?.()
    if (!provider) return
    if (provider.status && provider.status !== 'connecting') setRealStatus(provider.status)
    if (provider.synced) setRealSynced(true)
    const onStatus = ({ status: s }: { status: string }) => setRealStatus(s)
    const onSynced = (synced: boolean) => setRealSynced(synced)
    provider.on('status', onStatus)
    provider.on('synced', onSynced)
    return () => { provider.off?.('status', onStatus); provider.off?.('synced', onSynced) }
  }, [store])

  const status = realStatus !== 'connecting' ? realStatus : hookStatus
  const isSynced = realSynced || hookSynced

  // Get local user info
  const localUserRef = useRef<{ userId: string; name: string; color: string } | null>(null)
  useEffect(() => {
    if (!client) return
    try {
      const user = (client as any).getUser?.()
      if (user) {
        localUserRef.current = {
          userId: user.userId || 'anonymous',
          name: user.name || 'Anonymous',
          color: CURSOR_COLORS[hashToIndex(user.userId || user.name || '', CURSOR_COLORS.length)],
        }
      }
    } catch { /* ignore */ }
  }, [client])

  // [Velt] Live cursors via useLiveState — broadcasts cursor positions through Velt's real-time channel
  // listenToNewChangesOnly: don't load stale cursor data from server on refresh
  const [cursors, setCursors] = useLiveState<CursorMap>('core-crdt-cursors', {}, { syncDuration: 50, listenToNewChangesOnly: true })

  // Broadcast local cursor position
  const cursorsRef = useRef<CursorMap>(cursors || {})
  cursorsRef.current = cursors || {}

  const broadcastCursor = useCallback(() => {
    if (!textareaRef.current || !localUserRef.current) return
    const user = localUserRef.current
    const ta = textareaRef.current
    const next: CursorMap = {
      ...cursorsRef.current,
      [user.userId]: {
        name: user.name,
        color: user.color,
        anchor: ta.selectionStart,
        head: ta.selectionEnd,
        timestamp: Date.now(),
      },
    }
    setCursors(next)
  }, [setCursors])

  // Filter remote cursors (exclude self, remove stale >30s)
  const remoteCursors = Object.entries(cursors || {})
    .filter(([uid]) => uid !== localUserRef.current?.userId)
    .filter(([, c]) => Date.now() - c.timestamp < 30000)
    .map(([uid, c]) => ({ userId: uid, ...c }))

  // Status display
  const statusDotColor =
    status === 'connected' ? (isSynced ? '#22c55e' : '#eab308') :
    status === 'connecting' ? '#eab308' : '#ef4444'
  const statusLabel =
    status === 'connected' ? (isSynced ? 'Synced' : 'Syncing…') :
    status === 'connecting' ? 'Connecting…' : 'Disconnected'

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateText(e.target.value)
    setTimeout(broadcastCursor, 0)
  }

  const content = text ?? ''

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
                  onSelect={broadcastCursor}
                  onClick={broadcastCursor}
                  onKeyUp={broadcastCursor}
                  placeholder="Start typing..."
                  spellCheck={false}
                />

                {/* Hidden mirror div for measuring cursor pixel positions */}
                <div
                  ref={mirrorRef}
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    visibility: 'hidden',
                    pointerEvents: 'none',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                    overflow: 'hidden',
                  }}
                />

                {/* Remote cursors + selection highlights */}
                {remoteCursors.map((cursor) => {
                  const ta = textareaRef.current
                  const mirror = mirrorRef.current
                  if (!ta || !mirror) return null

                  const start = Math.min(cursor.anchor, cursor.head)
                  const end = Math.max(cursor.anchor, cursor.head)
                  const hasSelection = start !== end

                  // Caret at head position
                  const caretCoords = getOffsetCoords(ta, mirror, cursor.head, content)

                  // Selection highlight rects (multi-line aware)
                  const selRects = hasSelection
                    ? getSelectionRects(ta, mirror, start, end, content)
                    : []

                  return (
                    <div key={cursor.userId} style={{ pointerEvents: 'none' }}>
                      {/* Selection highlights */}
                      {selRects.map((rect, i) => (
                        <div
                          key={`sel-${i}`}
                          style={{
                            position: 'absolute',
                            top: rect.top,
                            left: rect.left,
                            width: rect.width,
                            height: rect.height,
                            backgroundColor: cursor.color,
                            opacity: 0.25,
                            zIndex: 5,
                            pointerEvents: 'none',
                            borderRadius: '2px',
                          }}
                        />
                      ))}
                      {/* Cursor caret */}
                      {caretCoords && (
                        <div
                          style={{
                            position: 'absolute',
                            top: caretCoords.top,
                            left: caretCoords.left,
                            zIndex: 10,
                            pointerEvents: 'none',
                          }}
                        >
                          <div style={{ width: '2px', height: '1.2em', backgroundColor: cursor.color }} />
                          <div
                            style={{
                              position: 'absolute',
                              top: '-1.4em',
                              left: '-1px',
                              backgroundColor: cursor.color,
                              color: '#fff',
                              fontSize: '11px',
                              fontWeight: 600,
                              padding: '1px 6px',
                              borderRadius: '3px 3px 3px 0',
                              whiteSpace: 'nowrap',
                              userSelect: 'none',
                              lineHeight: 'normal',
                            }}
                          >
                            {cursor.name}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
