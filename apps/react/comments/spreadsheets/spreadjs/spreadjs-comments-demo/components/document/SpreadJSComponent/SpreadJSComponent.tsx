'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useCommentAnnotations } from '@veltdev/react'
import {
  SpreadJSVeltComments,
  addComment,
  renderComments,
  type AttachedExtension,
  type SpreadInstance,
} from '@veltdev/spreadjs-velt-comments'
import { AddCommentToolbar } from './ui/AddCommentToolbar'
import type { AddCommentBubblePosition, SpreadJSComponentProps } from './types'
import { EDITOR_ID, SAMPLE_XLSX, TEST_XLSX } from './constants'

type SpreadNamespace = typeof import('@mescius/spread-sheets')
type SpreadEventHandler = (...args: unknown[]) => void

interface SelectionBounds {
  bottom: number
  left: number
  right: number
  top: number
}

interface SpreadCellRect {
  height: number
  width: number
  x: number
  y: number
}

declare global {
  interface Window {
    __spreadjsDemo?: {
      addComment: typeof addComment
      instance: SpreadInstance
      renderComments: typeof renderComments
    }
  }
}

function resolveDocumentToLoad(): string {
  try {
    const params = new URLSearchParams(window.location.search)
    if (params.has('testDoc') && params.get('testDoc') !== '0') return TEST_XLSX
  } catch {
    /* no window */
  }
  return SAMPLE_XLSX
}

function asNumber(value: unknown): number {
  return typeof value === 'number' ? value : 0
}

function viewportIndexFor(index: number, total: number, frozen: number, frozenTrailing: number) {
  if (index < frozen) return 0
  if (frozenTrailing > 0 && index >= total - frozenTrailing) return 2
  return 1
}

function unionRect(a: SpreadCellRect, b: SpreadCellRect): SpreadCellRect {
  const left = Math.min(a.x, b.x)
  const top = Math.min(a.y, b.y)
  const right = Math.max(a.x + a.width, b.x + b.width)
  const bottom = Math.max(a.y + a.height, b.y + b.height)

  return {
    height: bottom - top,
    width: right - left,
    x: left,
    y: top,
  }
}

function getSelectionBounds(instance: SpreadInstance): SelectionBounds | null {
  const sheet = instance.getActiveSheet()
  const selection = sheet?.getSelections()?.[0]
  if (!sheet || !selection || selection.row < 0 || selection.col < 0) return null

  const row = selection.row
  const col = selection.col
  const rowCount = Math.max(1, selection.rowCount)
  const colCount = Math.max(1, selection.colCount)
  const totalRows = sheet.getRowCount()
  const totalCols = sheet.getColumnCount()
  if (row >= totalRows || col >= totalCols) return null

  const rowViewport = viewportIndexFor(
    row,
    totalRows,
    asNumber(sheet.frozenRowCount()),
    asNumber(sheet.frozenTrailingRowCount()),
  )
  const colViewport = viewportIndexFor(
    col,
    totalCols,
    asNumber(sheet.frozenColumnCount()),
    asNumber(sheet.frozenTrailingColumnCount()),
  )

  let rect = sheet.getCellRect(row, col, rowViewport, colViewport) as SpreadCellRect
  if (rowCount > 1 || colCount > 1) {
    const bottomRow = Math.min(row + rowCount - 1, totalRows - 1)
    const rightCol = Math.min(col + colCount - 1, totalCols - 1)
    const bottomRowViewport = viewportIndexFor(
      bottomRow,
      totalRows,
      asNumber(sheet.frozenRowCount()),
      asNumber(sheet.frozenTrailingRowCount()),
    )
    const rightColViewport = viewportIndexFor(
      rightCol,
      totalCols,
      asNumber(sheet.frozenColumnCount()),
      asNumber(sheet.frozenTrailingColumnCount()),
    )

    if (bottomRowViewport === rowViewport && rightColViewport === colViewport) {
      rect = unionRect(
        rect,
        sheet.getCellRect(bottomRow, rightCol, bottomRowViewport, rightColViewport) as SpreadCellRect,
      )
    }
  }

  if (!rect || rect.width <= 0 || rect.height <= 0) return null

  const host = instance.getHost()
  const hostBounds = host.getBoundingClientRect()
  const isOutsideHost =
    rect.x + rect.width < 0 ||
    rect.y + rect.height < 0 ||
    rect.x > host.clientWidth ||
    rect.y > host.clientHeight
  if (isOutsideHost) return null

  return {
    bottom: hostBounds.top + rect.y + rect.height,
    left: hostBounds.left + rect.x,
    right: hostBounds.left + rect.x + rect.width,
    top: hostBounds.top + rect.y,
  }
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

function getSpreadNamespace(module: SpreadNamespace & { default?: SpreadNamespace }): SpreadNamespace {
  return module.default ?? module
}

export default function SpreadJSComponent({
  sheetNavigatorRef,
  scrollContainerRef,
}: SpreadJSComponentProps) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const workbookRef = useRef<SpreadInstance | null>(null)
  const extensionRef = useRef<AttachedExtension | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const [instance, setInstance] = useState<SpreadInstance | null>(null)
  const [bubblePosition, setBubblePosition] = useState<AddCommentBubblePosition | null>(null)
  const commentAnnotations = useCommentAnnotations()

  const updateBubblePosition = useCallback(() => {
    const activeInstance = workbookRef.current
    if (!activeInstance) {
      setBubblePosition(null)
      return
    }

    const bounds = getSelectionBounds(activeInstance)
    setBubblePosition(bounds ? getBubblePosition(bounds) : null)
  }, [])

  const scheduleBubbleUpdate = useCallback(() => {
    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current)
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      updateBubblePosition()
      window.setTimeout(updateBubblePosition, 80)
    })
  }, [updateBubblePosition])

  useEffect(() => {
    if (!hostRef.current || workbookRef.current) return

    let cancelled = false
    const host = hostRef.current

    import('@mescius/spread-sheets')
      .then(async (spreadModule) => {
        const GC = getSpreadNamespace(spreadModule)
        await import('@mescius/spread-sheets-io')
        if (cancelled || workbookRef.current) return

        const licenseKey = process.env.NEXT_PUBLIC_SPREADJS_LICENSE_KEY
        if (licenseKey) {
          GC.Spread.Sheets.LicenseKey = licenseKey
        }

        const workbook = new GC.Spread.Sheets.Workbook(host)
        workbookRef.current = workbook

        const documentToLoad = resolveDocumentToLoad()
        const response = await fetch(documentToLoad)
        if (!response.ok) {
          throw new Error(`Failed to fetch ${documentToLoad}: ${response.status} ${response.statusText}`)
        }
        const blob = await response.blob()
        if (cancelled) return

        const file = new File([blob], documentToLoad.split('/').pop() ?? 'sample.xlsx', {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })

        workbook.import(
          file,
          () => {
            if (cancelled) return

            extensionRef.current = SpreadJSVeltComments.configure({
              editorId: EDITOR_ID,
            }).attach(workbook)

            window.__spreadjsDemo = { addComment, instance: workbook, renderComments }
            setInstance(workbook)
            scheduleBubbleUpdate()
          },
          (error: unknown) => {
            console.error('[SpreadJS] Failed to import the XLSX workbook:', error)
          },
          { fileType: GC.Spread.Sheets.FileType.excel },
        )
      })
      .catch((error) => {
        console.error('[SpreadJS] Failed to load the workbook:', error)
      })

    return () => {
      cancelled = true
      extensionRef.current?.detach()
      extensionRef.current = null
      workbookRef.current?.destroy()
      workbookRef.current = null
      window.__spreadjsDemo = undefined
      setBubblePosition(null)
      setInstance(null)
    }
  }, [scheduleBubbleUpdate])

  useEffect(() => {
    if (!instance) return
    renderComments({ instance, commentAnnotations: commentAnnotations ?? [] })
  }, [commentAnnotations, instance])

  useEffect(() => {
    if (!instance) return

    let disposed = false
    const boundEvents: Array<[string, SpreadEventHandler]> = []
    const bindEvents = (GC: SpreadNamespace) => {
      if (disposed) return

      const Events = GC.Spread.Sheets.Events
      const eventNames = [
        Events.SelectionChanged,
        Events.TopRowChanged,
        Events.LeftColumnChanged,
        Events.ViewZoomed,
        Events.ViewZooming,
        Events.ColumnWidthChanged,
        Events.RowHeightChanged,
        Events.ActiveSheetChanged,
        Events.SheetTabClick,
      ].filter(Boolean)

      for (const eventName of eventNames) {
        instance.bind(eventName, scheduleBubbleUpdate)
        boundEvents.push([eventName, scheduleBubbleUpdate])
      }

      scheduleBubbleUpdate()
    }

    void import('@mescius/spread-sheets').then((spreadModule) =>
      bindEvents(getSpreadNamespace(spreadModule)),
    )
    window.addEventListener('pointerup', scheduleBubbleUpdate)
    window.addEventListener('keyup', scheduleBubbleUpdate)
    window.addEventListener('resize', scheduleBubbleUpdate)
    scrollContainerRef?.current?.addEventListener('scroll', scheduleBubbleUpdate, {
      passive: true,
    })

    return () => {
      disposed = true
      for (const [eventName, handler] of boundEvents) {
        try {
          instance.unbind(eventName, handler)
        } catch {
          /* workbook may already be destroyed */
        }
      }
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
    if (!instance || !sheetNavigatorRef) return

    const activateSheet = (sheetName: string) => {
      try {
        if (instance.getSheetFromName(sheetName)) {
          instance.setActiveSheet(sheetName)
          scheduleBubbleUpdate()
        }
      } catch {
        /* ignore missing sheets */
      }
    }

    sheetNavigatorRef.current = activateSheet
    return () => {
      if (sheetNavigatorRef.current === activateSheet) {
        sheetNavigatorRef.current = null
      }
    }
  }, [instance, scheduleBubbleUpdate, sheetNavigatorRef])

  const addSpreadJSVeltComment = useCallback(async () => {
    const activeInstance = workbookRef.current
    if (!activeInstance) return

    const result = await addComment({ instance: activeInstance })
    if (!result) {
      console.warn('[SpreadJS] Add comment failed. Select a cell or range before adding a comment.')
    }

    setBubblePosition(null)
  }, [])

  return (
    <div
      className="relative flex size-full flex-col overflow-hidden"
      data-name="SpreadJS / Workbook"
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
              <div className="spreadjs-workbook size-full overflow-hidden rounded-[10px]" ref={hostRef} />
            </div>
          </div>
        </div>
      </div>

      {instance ? (
        <AddCommentToolbar onAddComment={addSpreadJSVeltComment} position={bubblePosition} />
      ) : null}
    </div>
  )
}
