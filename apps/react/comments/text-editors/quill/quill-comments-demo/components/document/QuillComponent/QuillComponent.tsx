'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { useCommentAnnotations } from '@veltdev/react'
import { BubbleMenuToolbar } from './ui/BubbleMenuToolbar'
import { QuillComponentProps } from './types'
import { initialContent } from './constants'

// Dynamic import to avoid SSR issues with Quill
let Quill: typeof import('quill').default
let addComment: typeof import('@veltdev/quill-velt-comments').addComment
let renderComments: typeof import('@veltdev/quill-velt-comments').renderComments
let registered = false

export default function QuillComponent({ scrollContainerRef }: QuillComponentProps) {
  const editorContainerRef = useRef<HTMLDivElement>(null)
  const quillRef = useRef<any>(null)
  const savedSelectionRef = useRef<{ index: number; length: number } | null>(null)
  const bubbleMenuRef = useRef<HTMLDivElement>(null)
  const [showBubbleMenu, setShowBubbleMenu] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>({})
  const [isReady, setIsReady] = useState(false)

  // Initialize Quill (client-side only)
  useEffect(() => {
    if (quillRef.current || !editorContainerRef.current) return

    const init = async () => {
      const QuillModule = await import('quill')
      Quill = QuillModule.default

      const veltModule = await import('@veltdev/quill-velt-comments')
      addComment = veltModule.addComment
      renderComments = veltModule.renderComments

      if (!registered) {
        const VeltCommentsModule = veltModule.createQuillVeltComments(Quill)
        Quill.register('modules/veltComments', VeltCommentsModule, true)
        registered = true
      }

      if (!editorContainerRef.current) return

      const quill = new Quill(editorContainerRef.current, {
        theme: 'snow',
        modules: {
          toolbar: false,
          veltComments: {
            editorId: 'default',
          },
        },
        placeholder: '',
      })

      quill.clipboard.dangerouslyPasteHTML(initialContent)

      // Listen to selection changes for bubble menu
      quill.on('selection-change', (range: any) => {
        if (range && range.length > 0) {
          updateBubbleMenuPosition()
          setActiveFormats(quill.getFormat(range.index, range.length) as Record<string, boolean>)
          setShowBubbleMenu(true)
        } else {
          setShowBubbleMenu(false)
        }
      })

      // Update bubble menu position on text changes while selection is active
      quill.on('text-change', () => {
        const selection = quill.getSelection()
        if (selection && selection.length > 0) {
          updateBubbleMenuPosition()
          setActiveFormats(quill.getFormat(selection.index, selection.length) as Record<string, boolean>)
        }
      })

      quillRef.current = quill
      setIsReady(true)
    }

    init()

    return () => {
      quillRef.current = null
    }
  }, [])

  const updateBubbleMenuPosition = useCallback(() => {
    const nativeSel = window.getSelection()
    if (!nativeSel || nativeSel.rangeCount === 0) return

    const range = nativeSel.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    const scrollContainer = scrollContainerRef?.current
    if (!scrollContainer) return

    const containerRect = scrollContainer.getBoundingClientRect()

    setMenuPosition({
      x: rect.left + rect.width / 2 - containerRect.left + scrollContainer.scrollLeft,
      y: rect.top - containerRect.top + scrollContainer.scrollTop - 8,
    })
  }, [scrollContainerRef])

  const handleFormat = useCallback((format: string) => {
    const quill = quillRef.current
    if (!quill) return
    const current = quill.getFormat()
    quill.format(format, !current[format])
    const selection = quill.getSelection()
    if (selection) {
      setActiveFormats(quill.getFormat(selection.index, selection.length) as Record<string, boolean>)
    }
  }, [])

  const saveSelection = useCallback(() => {
    if (quillRef.current) {
      const selection = quillRef.current.getSelection()
      if (selection && selection.length > 0) {
        savedSelectionRef.current = selection
      }
    }
  }, [])

  const addQuillVeltComment = useCallback(() => {
    const quill = quillRef.current
    if (!quill || !addComment) return

    // Restore saved selection
    if (savedSelectionRef.current && savedSelectionRef.current.length > 0) {
      quill.setSelection(savedSelectionRef.current.index, savedSelectionRef.current.length, 'silent')
    }

    // Preserve scroll position
    const scrollContainer = scrollContainerRef?.current
    const scrollTop = scrollContainer?.scrollTop ?? 0

    addComment({ editor: quill })

    if (scrollContainer) {
      requestAnimationFrame(() => {
        scrollContainer.scrollTop = scrollTop
      })
    }

    savedSelectionRef.current = null
    setShowBubbleMenu(false)
  }, [scrollContainerRef])

  const commentAnnotations = useCommentAnnotations()

  useEffect(() => {
    if (quillRef.current && renderComments && isReady) {
      renderComments({ editor: quillRef.current, commentAnnotations: commentAnnotations ?? [] })
    }
  }, [commentAnnotations, isReady])

  return (
    <div className="relative size-full overflow-hidden" style={{ backgroundColor: 'var(--app-bg)' }} data-name="Quill / Expanded Toolbar">
      <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-auto pb-20">
        <div className="flex justify-center pt-[51px] px-4">
          <div className="w-full max-w-[850px]">
            <div className="border border-solid rounded-[16px] p-[42px_56px_64px_56px] min-h-[880px]" style={{ backgroundColor: 'var(--app-surface)', borderColor: 'var(--app-surface-border)' }}>
              <div className="w-full max-w-[738px]">
                <div
                  ref={editorContainerRef}
                  className="quill-editor-content"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bubble Menu */}
        {showBubbleMenu && (
          <div
            ref={bubbleMenuRef}
            className="absolute z-50"
            style={{
              left: menuPosition.x,
              top: menuPosition.y,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <BubbleMenuToolbar
              activeFormats={activeFormats}
              onFormat={handleFormat}
              onAddComment={addQuillVeltComment}
              onSaveSelection={saveSelection}
            />
          </div>
        )}
      </div>
    </div>
  )
}
