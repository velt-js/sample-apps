'use client'

import { useRef, useEffect, useState, useCallback, useMemo } from 'react'

interface RemoteCursorsProps {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  store: any | null
  content: string
}

// ── Mirror helpers: map character offsets to pixel positions ─────────

function escapeHTML(str: string) {
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

interface ResolvedCursor {
  clientId: number
  name: string
  color: string
  anchor: number
  head: number
}

export default function RemoteCursors({ textareaRef, store, content }: RemoteCursorsProps) {
  const mirrorRef = useRef<HTMLDivElement>(null)

  // Awareness version counter — incremented on awareness changes to trigger
  // useMemo recalculation. Only this (not content) needs useState.
  const [awarenessVersion, setAwarenessVersion] = useState(0)

  // ── Broadcast local cursor as RelativePosition ──
  const broadcastCursor = useCallback(() => {
    if (!textareaRef.current || !store) return
    const ta = textareaRef.current

    const anchorRel = store.createRelativePosition(ta.selectionStart)
    const headRel = store.createRelativePosition(ta.selectionEnd)
    if (!anchorRel || !headRel) return

    store.updateAwareness({
      cursor: { anchor: anchorRel, head: headRel },
    })
  }, [store, textareaRef])

  // Attach textarea event listeners for broadcasting
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    const handler = () => broadcastCursor()
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

  // Subscribe to awareness changes — bump version to trigger useMemo
  useEffect(() => {
    if (!store) return
    const awareness = store.getAwareness()
    if (!awareness) return
    const handler = () => setAwarenessVersion((v) => v + 1)
    awareness.on('change', handler)
    return () => { awareness.off('change', handler) }
  }, [store])

  // ── Resolve remote cursors synchronously during render ──
  // Depends on both `content` (absolute offsets shift) and `awarenessVersion`
  // (new cursor data from remote). This eliminates the two-phase render glitch.
  const remoteCursors = useMemo((): ResolvedCursor[] => {
    if (!store) return []
    const awareness = store.getAwareness()
    if (!awareness) return []

    const localClientId = awareness.clientID
    const states = awareness.getStates()
    const cursors: ResolvedCursor[] = []

    states.forEach((state: any, clientId: number) => {
      if (clientId === localClientId) return
      if (!state?.cursor || !state?.user) return

      const anchorAbs = store.resolveRelativePosition(state.cursor.anchor)
      const headAbs = store.resolveRelativePosition(state.cursor.head)
      if (anchorAbs === null || headAbs === null) return

      cursors.push({
        clientId,
        name: state.user.name,
        color: state.user.color,
        anchor: anchorAbs,
        head: headAbs,
      })
    })

    return cursors
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store, content, awarenessVersion])

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
