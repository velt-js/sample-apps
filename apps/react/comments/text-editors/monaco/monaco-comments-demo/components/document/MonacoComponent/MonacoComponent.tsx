'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Editor as MonacoReact, loader } from '@monaco-editor/react'
import { useCommentAnnotations } from '@veltdev/react'
import * as monaco from 'monaco-editor'
import type { editor as MonacoEditorNS } from 'monaco-editor'
import {
  addComment,
  registerVeltComments,
  renderComments,
  type VeltCommentsHandle,
} from '@veltdev/monaco-velt-comments'
import { BubbleMenuToolbar } from './ui/BubbleMenuToolbar'
import {
  MONACO_CONTENT_STORAGE_KEY,
  MONACO_DOCUMENT_ID_STORAGE_KEY,
  MONACO_EDITOR_ID,
  MONACO_PLACEHOLDER,
  initialContent,
} from './constants'
import type { MonacoComponentProps } from './types'

loader.config({ monaco })

declare global {
  interface Window {
    monacoCommentsDemo?: {
      editor: MonacoEditorNS.IStandaloneCodeEditor
      addComment: () => Promise<void>
      renderComments: () => void
    }
  }
}

const EMPTY_POSITION = { top: 0, left: 0 }

function getContentStorageKey() {
  if (typeof window === 'undefined') return MONACO_CONTENT_STORAGE_KEY

  const urlDocumentId = new URLSearchParams(window.location.search).get('documentId')
  const storedDocumentId = window.localStorage.getItem(MONACO_DOCUMENT_ID_STORAGE_KEY)
  const documentId = urlDocumentId || storedDocumentId

  return documentId ? `${MONACO_CONTENT_STORAGE_KEY}:${documentId}` : MONACO_CONTENT_STORAGE_KEY
}

function loadInitialContent() {
  if (typeof window === 'undefined') return initialContent

  try {
    return window.localStorage.getItem(getContentStorageKey()) ?? initialContent
  } catch {
    return initialContent
  }
}

function saveContent(content: string) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(getContentStorageKey(), content)
  } catch {}
}

function isDarkMode() {
  if (typeof document === 'undefined') return false
  return document.documentElement.classList.contains('dark')
}

export default function MonacoComponent({ registerNavigator }: MonacoComponentProps) {
  const initialValue = useMemo(loadInitialContent, [])
  const editorRef = useRef<MonacoEditorNS.IStandaloneCodeEditor | null>(null)
  const handleRef = useRef<VeltCommentsHandle | null>(null)
  const contentChangeDisposableRef = useRef<monaco.IDisposable | null>(null)
  const [editor, setEditor] = useState<MonacoEditorNS.IStandaloneCodeEditor | null>(null)
  const [isTextSelected, setIsTextSelected] = useState(false)
  const [toolbarPosition, setToolbarPosition] = useState(EMPTY_POSITION)
  const [isDark, setIsDark] = useState(isDarkMode)
  const commentAnnotations = useCommentAnnotations()

  const updateToolbarPosition = useCallback(() => {
    const nextEditor = editorRef.current
    const model = nextEditor?.getModel()
    const selection = nextEditor?.getSelection()

    if (!nextEditor || !model || !selection || selection.isEmpty()) {
      setIsTextSelected(false)
      return
    }

    const selectedText = model.getValueInRange(selection).trim()
    const editorNode = nextEditor.getDomNode()
    const visiblePosition = nextEditor.getScrolledVisiblePosition(selection.getEndPosition())

    if (!selectedText || !editorNode || !visiblePosition) {
      setIsTextSelected(false)
      return
    }

    const editorRect = editorNode.getBoundingClientRect()
    setToolbarPosition({
      top: Math.max(editorRect.top + visiblePosition.top - 52, 12),
      left: editorRect.left + visiblePosition.left,
    })
    setIsTextSelected(true)
  }, [])

  const scrollToHeading = useCallback((headingText: string) => {
    const nextEditor = editorRef.current
    const model = nextEditor?.getModel()
    if (!nextEditor || !model) return

    const normalizedHeading = headingText.toLowerCase()
    const lineIndex = model.getLinesContent().findIndex((line) => {
      const normalizedLine = line.toLowerCase()
      return (
        normalizedLine.includes(`heading: "${normalizedHeading}"`) ||
        normalizedLine.includes(`* ${normalizedHeading}`) ||
        normalizedLine.includes(normalizedHeading)
      )
    })

    if (lineIndex === -1) return

    const lineNumber = lineIndex + 1
    nextEditor.revealLineInCenter(lineNumber)
    nextEditor.setPosition({ lineNumber, column: 1 })
    nextEditor.focus()
  }, [])

  useEffect(() => {
    registerNavigator?.({ scrollToHeading })
    return () => registerNavigator?.(null)
  }, [registerNavigator, scrollToHeading])

  useEffect(() => {
    if (!editor) return

    renderComments({
      editor,
      editorId: MONACO_EDITOR_ID,
      commentAnnotations: commentAnnotations ?? [],
    })
  }, [commentAnnotations, editor])

  useEffect(() => {
    if (!editor) return

    const disposables = [
      editor.onDidChangeCursorSelection(updateToolbarPosition),
      editor.onDidScrollChange(updateToolbarPosition),
      editor.onDidLayoutChange(updateToolbarPosition),
    ]

    window.addEventListener('resize', updateToolbarPosition)

    return () => {
      for (const disposable of disposables) {
        disposable.dispose()
      }
      window.removeEventListener('resize', updateToolbarPosition)
    }
  }, [editor, updateToolbarPosition])

  useEffect(() => {
    const observer = new MutationObserver(() => setIsDark(isDarkMode()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    return () => {
      contentChangeDisposableRef.current?.dispose()
      contentChangeDisposableRef.current = null
      handleRef.current?.dispose()
      handleRef.current = null
    }
  }, [])

  const handleAddComment = useCallback(() => {
    const nextEditor = editorRef.current
    if (!nextEditor) return

    nextEditor.focus()
    void addComment({
      editor: nextEditor,
      editorId: MONACO_EDITOR_ID,
      context: {
        source: 'monaco-editor',
      },
    })

    setIsTextSelected(false)
  }, [])

  return (
    <div
      className="relative size-full overflow-hidden"
      style={{ backgroundColor: 'var(--app-bg)' }}
      data-name="Monaco / Code Editor"
    >
      <div className="absolute inset-0 overflow-y-auto pb-20">
        <div className="flex justify-center pt-[51px] px-4">
          <div className="w-full max-w-[1024px]">
            <div
              className="border border-solid rounded-[16px] p-[24px] min-h-[880px]"
              style={{ backgroundColor: 'var(--app-surface)', borderColor: 'var(--app-surface-border)' }}
            >
              <div className="monaco-editor-shell">
                <div className="monaco-editor-toolbar">
                  <span>TypeScript</span>
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={handleAddComment}
                  >
                    Add Comment
                  </button>
                </div>
                <MonacoReact
                  height="760px"
                  defaultLanguage="typescript"
                  defaultValue={initialValue}
                  loading={<div className="monaco-loading">Loading editor...</div>}
                  options={{
                    automaticLayout: true,
                    fontFamily: "'Geist Mono', Menlo, Monaco, Consolas, monospace",
                    fontSize: 13,
                    lineHeight: 21,
                    minimap: { enabled: true },
                    padding: { top: 20, bottom: 20 },
                    scrollBeyondLastLine: false,
                    tabSize: 2,
                    wordWrap: 'on',
                  }}
                  theme={isDark ? 'vs-dark' : 'vs'}
                  onMount={(nextEditor) => {
                    editorRef.current = nextEditor
                    setEditor(nextEditor)
                    handleRef.current?.dispose()
                    handleRef.current = registerVeltComments(nextEditor, {
                      editorId: MONACO_EDITOR_ID,
                    })
                    contentChangeDisposableRef.current?.dispose()
                    contentChangeDisposableRef.current = nextEditor.onDidChangeModelContent(() => {
                      saveContent(nextEditor.getValue())
                    })
                    if (typeof window !== 'undefined') {
                      window.monacoCommentsDemo = {
                        editor: nextEditor,
                        addComment: () => addComment({ editor: nextEditor, editorId: MONACO_EDITOR_ID }),
                        renderComments: () =>
                          renderComments({
                            editor: nextEditor,
                            editorId: MONACO_EDITOR_ID,
                            commentAnnotations: commentAnnotations ?? [],
                          }),
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isTextSelected && typeof document !== 'undefined'
        ? createPortal(
            <div
              style={{
                position: 'fixed',
                top: `${toolbarPosition.top}px`,
                left: `${toolbarPosition.left}px`,
                transform: 'translateX(-50%)',
                zIndex: 1000,
              }}
            >
              <BubbleMenuToolbar onAddComment={handleAddComment} />
            </div>,
            document.body
          )
        : null}
    </div>
  )
}
