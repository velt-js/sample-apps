'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { useAwareness } from '@veltdev/crdt-react'
import type { AwarenessState } from '@veltdev/crdt-react'
interface RemoteCursorsProps {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  store: any | null
  content: string
}

// ── Mirror helpers: map character offsets to pixel positions ─────────

function escapeHTML(str: string) {
  // Only escape HTML-special chars. Do NOT replace spaces with &nbsp; or
  // newlines with <br> — the mirror uses white-space:pre-wrap which preserves
  // both natively, matching the textarea's word-wrap behaviour.
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
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

function getOffsetCoords(
  textarea: HTMLTextAreaElement, mirror: HTMLDivElement,
  offset: number, content: string,
) {
  syncMirrorStyles(textarea, mirror)
  mirror.innerHTML = escapeHTML(content.substring(0, offset)) + '<span id="__m">|</span>'
  const marker = mirror.querySelector('#__m')
  if (!marker) return null
  const mr = marker.getBoundingClientRect()
  const tr = textarea.getBoundingClientRect()
  return { top: mr.top - tr.top - textarea.scrollTop, left: mr.left - tr.left }
}

function getSelectionRects(
  textarea: HTMLTextAreaElement, mirror: HTMLDivElement,
  start: number, end: number, content: string,
) {
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
      top: r.top - tr.top - textarea.scrollTop,
      left: r.left - tr.left,
      width: r.width,
      height: r.height,
    })
  }
  return rects
}

// ── Component ───────────────────────────────────────────────────────

export default function RemoteCursors({ textareaRef, store, content }: RemoteCursorsProps) {
  const mirrorRef = useRef<HTMLDivElement>(null)

  // ── useAwareness hook for receiving remote cursor states ──
  const { remoteStates } = useAwareness<AwarenessState>(store)

  // Broadcast local cursor / selection via store.updateAwareness()
  // User info (name, color, userId) is auto-populated from the Velt client.
  const broadcastCursor = useCallback(() => {
    if (!textareaRef.current || !store) return
    const ta = textareaRef.current
    store.updateAwareness({
      cursor: { anchor: ta.selectionStart, head: ta.selectionEnd },
    })
  }, [store, textareaRef])

  // Attach textarea event listeners for broadcasting
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    const handler = () => broadcastCursor()
    // Deferred broadcast: when clicking inside selected text, the browser
    // collapses the selection AFTER mouseup/click. requestAnimationFrame
    // lets us read the updated selectionStart/selectionEnd.
    const deferredHandler = () => requestAnimationFrame(handler)
    const inputHandler = () => setTimeout(handler, 0)
    ta.addEventListener('select', handler)
    ta.addEventListener('click', handler)
    ta.addEventListener('mouseup', deferredHandler)
    ta.addEventListener('keyup', handler)
    ta.addEventListener('input', inputHandler)
    return () => {
      ta.removeEventListener('select', handler)
      ta.removeEventListener('click', handler)
      ta.removeEventListener('mouseup', deferredHandler)
      ta.removeEventListener('keyup', handler)
      ta.removeEventListener('input', inputHandler)
    }
  }, [textareaRef, broadcastCursor])

  // Build remote cursors from awareness remoteStates
  const remoteCursors = remoteStates
    .filter((s) => s.cursor && s.user)
    .map((s) => ({
      clientId: s.clientId,
      name: s.user!.name,
      color: s.user!.color,
      anchor: s.cursor!.anchor,
      head: s.cursor!.head,
    }))

  // Force re-render on scroll or window resize so overlays reposition
  const [, setTick] = useState(0)
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    const bump = () => setTick((t) => t + 1)
    ta.addEventListener('scroll', bump)
    window.addEventListener('resize', bump)
    return () => {
      ta.removeEventListener('scroll', bump)
      window.removeEventListener('resize', bump)
    }
  }, [textareaRef])

  return (
    <>
      {/* Hidden mirror div for pixel-position measurement */}
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

      {/* Remote cursor overlays */}
      {remoteCursors.map((cursor) => {
        const ta = textareaRef.current
        const mirror = mirrorRef.current
        if (!ta || !mirror) return null

        // Clamp offsets to current content length — awareness updates may
        // arrive before the CRDT text sync, causing out-of-bounds positions.
        const len = content.length
        const anchor = Math.min(Math.max(cursor.anchor, 0), len)
        const head = Math.min(Math.max(cursor.head, 0), len)
        const start = Math.min(anchor, head)
        const end = Math.max(anchor, head)
        const hasSelection = start !== end
        const caretCoords = getOffsetCoords(ta, mirror, head, content)
        const selRects = hasSelection ? getSelectionRects(ta, mirror, start, end, content) : []


        return (
          <div key={cursor.clientId} style={{ pointerEvents: 'none' }}>
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
    </>
  )
}
