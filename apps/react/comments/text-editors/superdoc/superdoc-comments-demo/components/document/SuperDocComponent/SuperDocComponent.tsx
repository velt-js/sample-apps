'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useCommentAnnotations } from '@veltdev/react'
import { useCurrentDocument } from '@/app/document/useCurrentDocument'
import type { ProseMirrorJSON } from '@harbour-enterprises/superdoc'
import type {
  AttachedExtension,
  SuperDocInstance,
} from '@veltdev/superdoc-velt-comments'
import {
  SUPERDOC_CONTENT_STORAGE_KEY,
  SUPERDOC_EDITOR_ID,
  SUPERDOC_SAMPLE_DOCX,
  SUPERDOC_TOOLBAR_ID,
} from './constants'
import type { AddCommentBubblePosition, SuperDocComponentProps } from './types'
import { AddCommentToolbar } from './ui/AddCommentToolbar'

type WrapperModule = typeof import('@veltdev/superdoc-velt-comments')

interface SelectionBounds {
  bottom: number
  left: number
  right: number
  top: number
}

interface PresentationRect {
  bottom?: number
  height?: number
  left?: number
  right?: number
  top?: number
  width?: number
}

interface SuperDocEditorSelection {
  empty?: boolean
  from: number
  to: number
}

interface SuperDocSelectionEditor {
  off?: (eventName: string, handler: (...args: unknown[]) => void) => void
  on?: (eventName: string, handler: (...args: unknown[]) => void) => void
  presentationEditor?: {
    getRangeRects?: (
      from: number,
      to: number,
      host: HTMLElement
    ) => PresentationRect[] | null | undefined
  }
  state?: {
    doc?: {
      textBetween?: (from: number, to: number) => string
    }
    selection?: SuperDocEditorSelection
  }
}

function getContentStorageKey(documentId: string) {
  return `${SUPERDOC_CONTENT_STORAGE_KEY}:${documentId}`
}

function loadSavedJson(storageKey: string): ProseMirrorJSON | null {
  try {
    const raw = window.localStorage.getItem(storageKey)
    return raw ? (JSON.parse(raw) as ProseMirrorJSON) : null
  } catch {
    return null
  }
}

function saveDoc(superdoc: SuperDocInstance, storageKey: string) {
  try {
    const json = superdoc.activeEditor?.getJSON()
    if (json) {
      window.localStorage.setItem(storageKey, JSON.stringify(json))
    }
  } catch (error) {
    console.warn('[SuperDoc] Failed to persist document content:', error)
  }
}

function toSelectionBounds(rects: SelectionBounds[]): SelectionBounds | null {
  if (!rects.length) return null

  return rects.reduce(
    (acc, rect) => ({
      bottom: Math.max(acc.bottom, rect.bottom),
      left: Math.min(acc.left, rect.left),
      right: Math.max(acc.right, rect.right),
      top: Math.min(acc.top, rect.top),
    }),
    rects[0]
  )
}

function getBubblePosition(bounds: SelectionBounds): AddCommentBubblePosition {
  const left = Math.min(window.innerWidth - 132, Math.max(132, (bounds.left + bounds.right) / 2))
  const hasRoomAbove = bounds.top > 96

  return {
    left,
    placement: hasRoomAbove ? 'top' : 'bottom',
    top: hasRoomAbove ? bounds.top - 12 : bounds.bottom + 12,
  }
}

function getEditorSelectionBounds(
  instance: SuperDocInstance | null,
  host: HTMLElement
): SelectionBounds | null {
  const editor = instance?.activeEditor as SuperDocSelectionEditor | null | undefined
  const selection = editor?.state?.selection
  if (
    !selection ||
    selection.empty ||
    typeof selection.from !== 'number' ||
    typeof selection.to !== 'number' ||
    selection.from >= selection.to
  ) {
    return null
  }

  const selectedText = editor.state?.doc?.textBetween?.(selection.from, selection.to)?.trim()
  if (!selectedText) return null

  const presentationRects =
    editor.presentationEditor?.getRangeRects?.(selection.from, selection.to, host) ?? []
  const hostBounds = host.getBoundingClientRect()
  const rects = presentationRects
    .map((rect) => {
      const left = rect.left ?? 0
      const top = rect.top ?? 0
      const width = rect.width ?? (rect.right ?? 0) - left
      const height = rect.height ?? (rect.bottom ?? 0) - top
      if (width <= 0 || height <= 0) return null

      return {
        bottom: hostBounds.top + top + height,
        left: hostBounds.left + left,
        right: hostBounds.left + left + width,
        top: hostBounds.top + top,
      }
    })
    .filter((rect): rect is SelectionBounds => rect !== null)

  return toSelectionBounds(rects)
}

function rectOverlaps(a: DOMRect, b: DOMRect): boolean {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
}

function getDomSelectionBounds(host: HTMLElement): SelectionBounds | null {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
    return null
  }

  const selectedText = selection.toString().trim()
  if (!selectedText) return null

  const range = selection.getRangeAt(0)
  const ancestor = range.commonAncestorContainer
  const anchorNode = ancestor.nodeType === Node.ELEMENT_NODE ? ancestor : ancestor.parentNode
  const hostBounds = host.getBoundingClientRect()
  const anchorIsInHost = Boolean(anchorNode && host.contains(anchorNode))
  const rects = Array.from(range.getClientRects())
    .filter(
      (rect) =>
        rect.width > 0 &&
        rect.height > 0 &&
        (anchorIsInHost || rectOverlaps(rect, hostBounds))
    )
    .map((rect) => ({
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
      top: rect.top,
    }))

  return toSelectionBounds(rects)
}

export default function SuperDocComponent({ scrollContainerRef }: SuperDocComponentProps) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const superdocRef = useRef<SuperDocInstance | null>(null)
  const extensionRef = useRef<AttachedExtension | null>(null)
  const wrapperRef = useRef<WrapperModule | null>(null)
  const [instance, setInstance] = useState<SuperDocInstance | null>(null)
  const [bubblePosition, setBubblePosition] = useState<AddCommentBubblePosition | null>(null)
  const commentAnnotations = useCommentAnnotations()
  const { documentId } = useCurrentDocument()

  const updateBubblePosition = useCallback(() => {
    const host = hostRef.current
    if (!host) {
      setBubblePosition(null)
      return
    }

    if (instance) {
      wrapperRef.current?.captureSelection?.(instance)
    }
    const bounds = getEditorSelectionBounds(instance, host) ?? getDomSelectionBounds(host)
    setBubblePosition(bounds ? getBubblePosition(bounds) : null)
  }, [instance])

  useEffect(() => {
    if (!instance) {
      setBubblePosition(null)
      return
    }

    let frame = 0
    let timeout: ReturnType<typeof setTimeout> | null = null
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateBubblePosition)
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(updateBubblePosition, 80)
    }
    const editor = instance.activeEditor as SuperDocSelectionEditor | null | undefined

    document.addEventListener('selectionchange', scheduleUpdate)
    document.addEventListener('mouseup', scheduleUpdate)
    document.addEventListener('keyup', scheduleUpdate)
    document.addEventListener('pointerup', scheduleUpdate)
    window.addEventListener('resize', scheduleUpdate)
    scrollContainerRef?.current?.addEventListener('scroll', scheduleUpdate, { passive: true })
    editor?.on?.('selectionUpdate', scheduleUpdate)
    editor?.on?.('update', scheduleUpdate)
    scheduleUpdate()

    return () => {
      cancelAnimationFrame(frame)
      if (timeout) clearTimeout(timeout)
      document.removeEventListener('selectionchange', scheduleUpdate)
      document.removeEventListener('mouseup', scheduleUpdate)
      document.removeEventListener('keyup', scheduleUpdate)
      document.removeEventListener('pointerup', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      scrollContainerRef?.current?.removeEventListener('scroll', scheduleUpdate)
      editor?.off?.('selectionUpdate', scheduleUpdate)
      editor?.off?.('update', scheduleUpdate)
    }
  }, [instance, scrollContainerRef, updateBubblePosition])

  useEffect(() => {
    if (!hostRef.current || superdocRef.current || !documentId) return

    let cancelled = false
    let saveTimer: ReturnType<typeof setTimeout> | null = null
    const host = hostRef.current
    const storageKey = getContentStorageKey(documentId)

    const scheduleSave = () => {
      if (saveTimer) clearTimeout(saveTimer)
      saveTimer = setTimeout(() => {
        if (!cancelled && superdocRef.current) {
          saveDoc(superdocRef.current, storageKey)
        }
      }, 800)
    }

    Promise.all([
      import('@harbour-enterprises/superdoc'),
      import('@veltdev/superdoc-velt-comments'),
    ])
      .then(([{ SuperDoc }, wrapper]) => {
        if (cancelled || superdocRef.current) return
        wrapperRef.current = wrapper

        const licenseKey = process.env.NEXT_PUBLIC_SUPERDOC_LICENSE_KEY

        superdocRef.current = new SuperDoc({
          selector: host,
          toolbar: `#${SUPERDOC_TOOLBAR_ID}`,
          document: SUPERDOC_SAMPLE_DOCX,
          documentMode: 'editing',
          modules: { comments: false },
          ...(licenseKey ? { licenseKey } : {}),
          onContentError: ({ error }) => {
            console.error('[SuperDoc] Content error:', error)
          },
          onException: ({ error }) => {
            console.error('[SuperDoc] Exception:', error)
          },
          onEditorUpdate: scheduleSave,
          onReady: () => {
            if (cancelled || !superdocRef.current || extensionRef.current) return

            const savedJson = loadSavedJson(storageKey)
            const restoreEditor = superdocRef.current.activeEditor
            if (savedJson?.content && restoreEditor) {
              try {
                restoreEditor.commands.selectAll()
                restoreEditor.commands.insertContent(savedJson.content)
              } catch (error) {
                console.warn('[SuperDoc] Failed to restore saved content:', error)
              }
            }

            extensionRef.current = wrapper.SuperDocVeltComments
              .configure({ editorId: SUPERDOC_EDITOR_ID })
              .attach(superdocRef.current)
            setInstance(superdocRef.current)
          },
        })
      })
      .catch((error) => {
        console.error('[SuperDoc] Failed to load the editor:', error)
      })

    return () => {
      cancelled = true
      if (saveTimer) clearTimeout(saveTimer)
      extensionRef.current?.detach()
      extensionRef.current = null
      superdocRef.current?.destroy()
      superdocRef.current = null
      wrapperRef.current = null
      setInstance(null)
    }
  }, [documentId])

  useEffect(() => {
    if (!instance || !wrapperRef.current) return

    wrapperRef.current.renderComments({
      instance,
      commentAnnotations: commentAnnotations ?? [],
    })
  }, [instance, commentAnnotations])

  const handleAddComment = useCallback(async () => {
    if (!instance || !wrapperRef.current) return

    const scrollContainer = scrollContainerRef?.current
    const scrollTop = scrollContainer?.scrollTop ?? 0
    wrapperRef.current.captureSelection?.(instance)
    const result = await wrapperRef.current.addComment({ instance })

    if (!result) {
      console.warn('[SuperDoc] Select text in the document before adding a comment.')
    } else {
      setBubblePosition(null)
    }

    if (scrollContainer) {
      requestAnimationFrame(() => {
        scrollContainer.scrollTop = scrollTop
      })
    }
  }, [instance, scrollContainerRef])

  return (
    <div
      className="relative flex size-full flex-col overflow-hidden"
      data-name="SuperDoc / Editor"
      style={{ backgroundColor: 'var(--app-bg)' }}
    >
      <div id={SUPERDOC_TOOLBAR_ID} className="superdoc-toolbar shrink-0" />
      <div ref={scrollContainerRef} className="relative min-h-0 flex-1 overflow-auto">
        <div className="flex min-h-full justify-center px-4 pt-[51px] pb-20">
          <div className="w-full max-w-[950px]">
            <div
              className="min-h-[880px] rounded-[16px] border border-solid p-[22px] sm:p-[42px]"
              style={{
                backgroundColor: 'var(--app-surface)',
                borderColor: 'var(--app-surface-border)',
              }}
            >
              <div ref={hostRef} className="superdoc-editor-host min-h-[780px] w-full" />
            </div>
          </div>
        </div>
      </div>

      {instance ? (
        <AddCommentToolbar onAddComment={handleAddComment} position={bubblePosition} />
      ) : null}
    </div>
  )
}
