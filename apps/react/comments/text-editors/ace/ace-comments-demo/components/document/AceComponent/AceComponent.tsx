'use client'

import dynamic from 'next/dynamic'
import { Ace } from 'ace-builds'
import { useEffect, useRef, useCallback, useState } from 'react'
import { useCommentAnnotations } from '@veltdev/react'
import { BubbleMenuToolbar } from './ui/BubbleMenuToolbar'
import { AceComponentProps } from './types'
import { initialContent } from './constants'
import { useTheme } from '../../theme/ThemeContext'

const AceEditor = dynamic(async () => {
  // Import ace-builds first to set up the global ace object
  await import('ace-builds')
  await import('ace-builds/src-noconflict/mode-markdown')
  await import('ace-builds/src-noconflict/theme-github')
  await import('ace-builds/src-noconflict/theme-monokai')
  return import('react-ace')
}, { ssr: false })

// Lazily loaded ace-velt-comments functions
let _AceVeltComments: typeof import('@veltdev/ace-velt-comments').AceVeltComments | null = null
let _addComment: typeof import('@veltdev/ace-velt-comments').addComment | null = null
let _renderComments: typeof import('@veltdev/ace-velt-comments').renderComments | null = null
let _aceVeltLoaded = false

async function loadAceVelt() {
  if (_aceVeltLoaded) return
  const mod = await import('@veltdev/ace-velt-comments')
  _AceVeltComments = mod.AceVeltComments
  _addComment = mod.addComment
  _renderComments = mod.renderComments
  _aceVeltLoaded = true
}

// Function to clear all comment markers from the Ace editor
const clearAllCommentMarkers = (editor: Ace.Editor | null) => {
  if (!editor) return
  const session = editor.getSession()
  const markers = session.getMarkers(false)
  for (const markerId in markers) {
    const marker = markers[markerId]
    if (marker.clazz && marker.clazz.includes('ace-velt-comment-marker')) {
      session.removeMarker(parseInt(markerId, 10))
    }
  }
  const container = editor.container
  const overlayContainer = container.querySelector('.ace-velt-overlay-container')
  if (overlayContainer) {
    overlayContainer.innerHTML = ''
  }
  const veltCommentTexts = container.querySelectorAll('velt-comment-text')
  veltCommentTexts.forEach((el: Element) => el.remove())
}

export default function AceComponent({ scrollContainerRef }: AceComponentProps) {
  const editorRef = useRef<Ace.Editor | null>(null)
  const cleanupRef = useRef<(() => void) | null>(null)
  const savedSelectionRef = useRef<{ start: Ace.Point; end: Ace.Point } | null>(null)
  const prevAnnotationsLengthRef = useRef<number>(0)
  const { resolvedTheme } = useTheme()

  const [bubbleMenu, setBubbleMenu] = useState<{ visible: boolean; x: number; y: number }>({
    visible: false,
    x: 0,
    y: 0,
  })

  const commentAnnotations = useCommentAnnotations()

  const handleLoad = useCallback(async (editor: Ace.Editor) => {
    editorRef.current = editor
    await loadAceVelt()
    if (_AceVeltComments) {
      cleanupRef.current = _AceVeltComments(editor)
    }

    // Show bubble menu on selection
    editor.selection.on('changeSelection', () => {
      const range = editor.getSelection().getRange()
      if (range.isEmpty()) {
        setBubbleMenu({ visible: false, x: 0, y: 0 })
      }
    })

    editor.on('mouseup', () => {
      requestAnimationFrame(() => {
        const range = editor.getSelection().getRange()
        if (!range.isEmpty()) {
          const pos = editor.renderer.textToScreenCoordinates(range.start.row, range.start.column)
          const endPos = editor.renderer.textToScreenCoordinates(range.end.row, range.end.column)
          const x = (pos.pageX + endPos.pageX) / 2
          const y = pos.pageY - 50
          setBubbleMenu({ visible: true, x, y })
        }
      })
    })
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
      }
    }
  }, [])

  // Listen for resolve/delete button clicks to force refresh markers
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const buttonText = target.textContent?.toLowerCase() || ''

      const inVeltDialog = target.closest('velt-comment-dialog') ||
        target.closest('velt-comments-sidebar') ||
        target.closest('[class*="velt"]') ||
        target.closest('[class*="comment-dialog"]')

      const isResolveButton = target.closest('button[aria-label="Resolve"]') ||
        target.closest('[data-velt-action="resolve"]') ||
        target.closest('.velt-resolve-button') ||
        (target.tagName === 'BUTTON' && buttonText.includes('resolve'))

      const isDeleteButton = target.closest('button[aria-label="Delete"]') ||
        target.closest('[data-velt-action="delete"]') ||
        target.closest('.velt-delete-button') ||
        target.closest('app-comment-dialog-options-dropdown-content-delete-thread') ||
        (target.tagName === 'BUTTON' && buttonText.includes('delete'))

      if (isResolveButton || isDeleteButton) {
        setTimeout(() => {
          clearAllCommentMarkers(editorRef.current)
        }, 1000)
      } else if (inVeltDialog && target.closest('button')) {
        setTimeout(() => {
          clearAllCommentMarkers(editorRef.current)
        }, 1500)
      }
    }

    document.addEventListener('click', handleClick, true)
    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [])

  // Render comments when annotations change
  useEffect(() => {
    if (editorRef.current) {
      const currentLength = commentAnnotations?.length || 0
      const prevLength = prevAnnotationsLengthRef.current

      if (prevLength > currentLength || currentLength === 0) {
        clearAllCommentMarkers(editorRef.current)
      }

      prevAnnotationsLengthRef.current = currentLength

      if (commentAnnotations && commentAnnotations.length > 0 && _renderComments) {
        _renderComments({
          editor: editorRef.current,
          commentAnnotations,
        })
      }
    }
  }, [commentAnnotations])

  const handleAddComment = async () => {
    if (editorRef.current) {
      // Restore saved selection
      if (savedSelectionRef.current) {
        const ace = (window as any).ace
        if (ace) {
          const Range = ace.require('ace/range').Range
          const range = new Range(
            savedSelectionRef.current.start.row,
            savedSelectionRef.current.start.column,
            savedSelectionRef.current.end.row,
            savedSelectionRef.current.end.column
          )
          editorRef.current.getSelection().setSelectionRange(range)
        }
      }

      const scrollContainer = scrollContainerRef?.current
      const scrollTop = scrollContainer?.scrollTop ?? 0
      if (_addComment) {
        await _addComment({ editor: editorRef.current })
      }
      if (scrollContainer) {
        requestAnimationFrame(() => {
          scrollContainer.scrollTop = scrollTop
        })
      }
      savedSelectionRef.current = null
      setBubbleMenu({ visible: false, x: 0, y: 0 })
    }
  }

  const saveSelection = () => {
    if (editorRef.current) {
      const range = editorRef.current.getSelection().getRange()
      if (!range.isEmpty()) {
        savedSelectionRef.current = {
          start: { row: range.start.row, column: range.start.column },
          end: { row: range.end.row, column: range.end.column },
        }
      }
    }
  }

  const wrapSelection = (before: string, after: string) => {
    if (!editorRef.current) return
    const editor = editorRef.current
    const range = editor.getSelection().getRange()
    if (range.isEmpty()) return
    const selectedText = editor.session.getTextRange(range)
    editor.session.replace(range, `${before}${selectedText}${after}`)
  }

  return (
    <div className="relative size-full overflow-hidden" style={{ backgroundColor: 'var(--app-bg)' }} data-name="Ace / Expanded Toolbar">
      <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-auto pb-20">
        <div className="flex justify-center pt-[51px] px-4">
          <div className="w-full max-w-[850px]">
            <div className="border border-solid rounded-[16px] p-[42px_56px_64px_56px] min-h-[880px]" style={{ backgroundColor: 'var(--app-surface)', borderColor: 'var(--app-surface-border)' }}>
              <div className="w-full max-w-[738px] ace-editor-wrapper">
                <AceEditor
                  mode="markdown"
                  theme={resolvedTheme === 'dark' ? 'monokai' : 'github'}
                  name="ace-velt-editor"
                  defaultValue={initialContent}
                  onLoad={handleLoad}
                  width="100%"
                  height="880px"
                  fontSize={12}
                  showPrintMargin={false}
                  showGutter={false}
                  highlightActiveLine={false}
                  wrapEnabled={true}
                  setOptions={{
                    showLineNumbers: false,
                    tabSize: 2,
                    useWorker: false,
                    fontFamily: "'Geist Mono', monospace",
                  }}
                />
              </div>

              {bubbleMenu.visible && (
                <BubbleMenuToolbar
                  x={bubbleMenu.x}
                  y={bubbleMenu.y}
                  onAddComment={() => {
                    saveSelection()
                    handleAddComment()
                  }}
                  onBold={() => wrapSelection('**', '**')}
                  onItalic={() => wrapSelection('*', '*')}
                  onStrikethrough={() => wrapSelection('~~', '~~')}
                  onUnderline={() => wrapSelection('<u>', '</u>')}
                  onMouseDown={saveSelection}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
