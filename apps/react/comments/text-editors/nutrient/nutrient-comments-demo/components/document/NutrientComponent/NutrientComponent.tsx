'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useCommentAnnotations } from '@veltdev/react'
import {
  NutrientVeltComments,
  addComment,
  captureSelection,
  renderComments,
  type AttachedExtension,
  type NutrientInstance,
} from '@veltdev/nutrient-velt-comments'
import { DOCUMENT_URL, EDITOR_ID } from './constants'
import type { AddCommentBubblePosition, NutrientComponentProps } from './types'
import { AddCommentToolbar } from './ui/AddCommentToolbar'

type NutrientViewerApi = (typeof import('@nutrient-sdk/viewer'))['default']

type SelectionBounds = {
  bottom: number
  left: number
  right: number
  top: number
}

declare global {
  interface Window {
    NutrientViewer?: NutrientViewerApi
    __nutrientDemo?: {
      addComment: typeof addComment
      captureSelection: typeof captureSelection
      instance: NutrientInstance
      renderComments: typeof renderComments
    }
  }
}

function waitForNutrientViewer(timeoutMs = 30000): Promise<NutrientViewerApi> {
  return new Promise((resolve, reject) => {
    const start = Date.now()

    const tick = () => {
      if (window.NutrientViewer) {
        resolve(window.NutrientViewer)
        return
      }

      if (Date.now() - start > timeoutMs) {
        reject(new Error('Nutrient SDK (window.NutrientViewer) did not load'))
        return
      }

      window.setTimeout(tick, 50)
    }

    tick()
  })
}

async function getSelectionBounds(instance: NutrientInstance): Promise<SelectionBounds | null> {
  const selection = instance.getTextSelection()
  if (!selection) return null

  const text = await selection.getText()
  if (!text.trim()) return null

  const perPage = (await selection.getSelectedRectsPerPage()).toArray()
  const firstPage = perPage[0]
  if (!firstPage || firstPage.rects.size === 0) return null

  const clientRects = firstPage.rects.toArray().map((rect) => {
    const clientRect = instance.transformPageToClientSpace(rect, firstPage.pageIndex)
    return {
      bottom: clientRect.top + clientRect.height,
      left: clientRect.left,
      right: clientRect.left + clientRect.width,
      top: clientRect.top,
    }
  })

  return clientRects.reduce<SelectionBounds>(
    (bounds, rect) => ({
      bottom: Math.max(bounds.bottom, rect.bottom),
      left: Math.min(bounds.left, rect.left),
      right: Math.max(bounds.right, rect.right),
      top: Math.min(bounds.top, rect.top),
    }),
    {
      bottom: Number.NEGATIVE_INFINITY,
      left: Number.POSITIVE_INFINITY,
      right: Number.NEGATIVE_INFINITY,
      top: Number.POSITIVE_INFINITY,
    },
  )
}

function getBubblePosition(bounds: SelectionBounds): AddCommentBubblePosition {
  const viewportPadding = 12
  const estimatedBubbleWidth = 180
  const halfBubbleWidth = estimatedBubbleWidth / 2
  const center = bounds.left + (bounds.right - bounds.left) / 2
  const left = Math.min(
    window.innerWidth - halfBubbleWidth - viewportPadding,
    Math.max(halfBubbleWidth + viewportPadding, center),
  )

  const hasRoomAbove = bounds.top > 84
  return {
    left,
    placement: hasRoomAbove ? 'top' : 'bottom',
    top: hasRoomAbove ? bounds.top - 12 : bounds.bottom + 12,
  }
}

export default function NutrientComponent({
  pageNavigatorRef,
  scrollContainerRef,
}: NutrientComponentProps) {
  const viewerRef = useRef<HTMLDivElement | null>(null)
  const instanceRef = useRef<NutrientInstance | null>(null)
  const viewerApiRef = useRef<NutrientViewerApi | null>(null)
  const extensionRef = useRef<AttachedExtension | null>(null)
  const bubbleRequestRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)
  const [instance, setInstance] = useState<NutrientInstance | null>(null)
  const [bubblePosition, setBubblePosition] = useState<AddCommentBubblePosition | null>(null)

  const commentAnnotations = useCommentAnnotations()

  const updateBubblePosition = useCallback(async () => {
    const currentRequest = bubbleRequestRef.current + 1
    bubbleRequestRef.current = currentRequest

    const activeInstance = instanceRef.current
    if (!activeInstance) {
      setBubblePosition(null)
      return
    }

    try {
      const bounds = await getSelectionBounds(activeInstance)
      if (bubbleRequestRef.current !== currentRequest) return
      setBubblePosition(bounds ? getBubblePosition(bounds) : null)
    } catch {
      if (bubbleRequestRef.current === currentRequest) {
        setBubblePosition(null)
      }
    }
  }, [])

  const scheduleBubbleUpdate = useCallback(() => {
    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current)
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      void updateBubblePosition()
      window.setTimeout(() => void updateBubblePosition(), 80)
    })
  }, [updateBubblePosition])

  useEffect(() => {
    if (!viewerRef.current || instanceRef.current) return

    let cancelled = false
    const container = viewerRef.current

    waitForNutrientViewer()
      .then((NutrientViewer) => {
        if (cancelled || instanceRef.current) return null

        viewerApiRef.current = NutrientViewer
        NutrientViewer.unload(container)

        const licenseKey = process.env.NEXT_PUBLIC_NUTRIENT_LICENSE_KEY

        return NutrientViewer.load({
          container,
          document: DOCUMENT_URL,
          inlineTextSelectionToolbarItems: () => [],
          ...(licenseKey ? { licenseKey } : {}),
        })
      })
      .then((nutrientInstance) => {
        if (!nutrientInstance) return
        if (cancelled) {
          viewerApiRef.current?.unload(container)
          return
        }

        instanceRef.current = nutrientInstance
        nutrientInstance.setInlineTextSelectionToolbarItems(() => [])
        extensionRef.current = NutrientVeltComments.configure({
          editorId: EDITOR_ID,
        }).attach(nutrientInstance)

        window.__nutrientDemo = {
          addComment,
          captureSelection,
          instance: nutrientInstance,
          renderComments,
        }

        setInstance(nutrientInstance)
      })
      .catch((error) => {
        console.error('[Nutrient] Failed to load the viewer:', error)
      })

    return () => {
      cancelled = true
      extensionRef.current?.detach()
      extensionRef.current = null
      viewerApiRef.current?.unload(container)
      instanceRef.current = null
      viewerApiRef.current = null
      window.__nutrientDemo = undefined
      setBubblePosition(null)
      setInstance(null)
    }
  }, [])

  useEffect(() => {
    if (!instance) return
    renderComments({ instance, commentAnnotations: commentAnnotations ?? [] })
  }, [commentAnnotations, instance])

  useEffect(() => {
    if (!instance) return

    instance.addEventListener('textSelection.change', scheduleBubbleUpdate)
    instance.addEventListener('viewState.zoom.change', scheduleBubbleUpdate)
    window.addEventListener('pointerup', scheduleBubbleUpdate)
    window.addEventListener('keyup', scheduleBubbleUpdate)
    window.addEventListener('resize', scheduleBubbleUpdate)
    scrollContainerRef?.current?.addEventListener('scroll', scheduleBubbleUpdate, {
      passive: true,
    })

    return () => {
      instance.removeEventListener('textSelection.change', scheduleBubbleUpdate)
      instance.removeEventListener('viewState.zoom.change', scheduleBubbleUpdate)
      window.removeEventListener('pointerup', scheduleBubbleUpdate)
      window.removeEventListener('keyup', scheduleBubbleUpdate)
      window.removeEventListener('resize', scheduleBubbleUpdate)
      scrollContainerRef?.current?.removeEventListener('scroll', scheduleBubbleUpdate)
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [instance, scheduleBubbleUpdate, scrollContainerRef])

  useEffect(() => {
    if (!instance || !pageNavigatorRef) return

    const navigateToPage = (pageIndex: number) => {
      const NutrientViewer = viewerApiRef.current ?? window.NutrientViewer
      if (!NutrientViewer) return
      instance.jumpToRect(
        pageIndex,
        new NutrientViewer.Geometry.Rect({
          height: 1,
          left: 0,
          top: 0,
          width: 1,
        }),
      )
    }

    pageNavigatorRef.current = navigateToPage

    return () => {
      if (pageNavigatorRef.current === navigateToPage) {
        pageNavigatorRef.current = null
      }
    }
  }, [instance, pageNavigatorRef])

  const addNutrientVeltComment = useCallback(async () => {
    const activeInstance = instanceRef.current
    if (!activeInstance) return

    await captureSelection(activeInstance)
    const result = await addComment({ instance: activeInstance })
    if (!result) {
      console.warn('[Nutrient] Add comment failed. Select text in the PDF before adding a comment.')
    }

    setBubblePosition(null)
  }, [])

  return (
    <div
      className="relative flex size-full flex-col overflow-hidden"
      data-name="Nutrient / Viewer"
      style={{ backgroundColor: 'var(--app-bg)' }}
    >
      <div ref={scrollContainerRef} className="relative min-h-0 flex-1 overflow-auto">
        <div className="flex min-h-full justify-center px-4 pb-20 pt-[51px]">
          <div className="w-full max-w-[1120px]">
            <div
              className="h-[calc(100vh-170px)] min-h-[720px] rounded-2xl border p-3 shadow-[0_24px_70px_rgba(15,23,42,0.16)]"
              style={{
                backgroundColor: 'var(--app-surface)',
                borderColor: 'var(--app-surface-border)',
              }}
            >
              <div className="nutrient-viewer size-full overflow-hidden rounded-[10px]" ref={viewerRef} />
            </div>
          </div>
        </div>
      </div>

      {instance && (
        <AddCommentToolbar
          onAddComment={addNutrientVeltComment}
          position={bubblePosition}
        />
      )}
    </div>
  )
}
