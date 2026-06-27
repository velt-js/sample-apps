'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useCommentAnnotations } from '@veltdev/react'
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link,
  List,
  BlockQuote,
  type Editor,
} from 'ckeditor5'
import { addComment, renderComments, VeltCommentsPlugin } from '@veltdev/ckeditor-velt-comments'
import { BubbleMenuToolbar } from './ui/BubbleMenuToolbar'
import {
  CKEDITOR_CONTENT_STORAGE_KEY,
  CKEDITOR_DOCUMENT_ID_STORAGE_KEY,
  CKEDITOR_EDITOR_ID,
  CKEDITOR_PLACEHOLDER,
  initialContent,
} from './constants'
import type { CKEditorComponentProps, CKEditorInlineStyle } from './types'

const EMPTY_POSITION = { top: 0, left: 0 }

const styleToCommand: Record<CKEditorInlineStyle, string> = {
  BOLD: 'bold',
  ITALIC: 'italic',
  UNDERLINE: 'underline',
  STRIKETHROUGH: 'strikethrough',
}

declare global {
  interface Window {
    __ckeditorDemo?: {
      addComment: typeof addComment
      editor: Editor
      renderComments: typeof renderComments
    }
  }
}

function loadInitialContent() {
  if (typeof window === 'undefined') return initialContent

  try {
    return window.localStorage.getItem(getContentStorageKey()) ?? initialContent
  } catch {
    return initialContent
  }
}

function getContentStorageKey() {
  if (typeof window === 'undefined') return CKEDITOR_CONTENT_STORAGE_KEY

  const urlDocumentId = new URLSearchParams(window.location.search).get('documentId')
  const storedDocumentId = window.localStorage.getItem(CKEDITOR_DOCUMENT_ID_STORAGE_KEY)
  const documentId = urlDocumentId || storedDocumentId

  return documentId ? `${CKEDITOR_CONTENT_STORAGE_KEY}:${documentId}` : CKEDITOR_CONTENT_STORAGE_KEY
}

function saveContent(content: string) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(getContentStorageKey(), content)
  } catch {}
}

function getEditorRoot(editor: Editor | null) {
  return editor?.editing.view.getDomRoot() as HTMLElement | null
}

function getActiveStyles(editor: Editor | null) {
  const activeStyles = new Set<CKEditorInlineStyle>()
  if (!editor) return activeStyles

  for (const style of Object.keys(styleToCommand) as CKEditorInlineStyle[]) {
    if (editor.commands.get(styleToCommand[style])?.value) {
      activeStyles.add(style)
    }
  }

  return activeStyles
}

export default function CKEditorComponent({ scrollContainerRef }: CKEditorComponentProps) {
  const initialValue = useMemo(loadInitialContent, [])
  const [editor, setEditor] = useState<Editor | null>(null)
  const [isTextSelected, setIsTextSelected] = useState(false)
  const [toolbarPosition, setToolbarPosition] = useState(EMPTY_POSITION)
  const [activeStyles, setActiveStyles] = useState<Set<CKEditorInlineStyle>>(new Set())
  const commentAnnotations = useCommentAnnotations()

  const updateToolbarPosition = useCallback(() => {
    setActiveStyles(getActiveStyles(editor))

    const selection = window.getSelection()
    const editorRoot = getEditorRoot(editor)

    if (
      !selection ||
      !editorRoot ||
      selection.rangeCount === 0 ||
      selection.toString().trim().length === 0 ||
      editor?.model.document.selection.isCollapsed
    ) {
      setIsTextSelected(false)
      return
    }

    const anchorNode = selection.anchorNode
    if (!anchorNode || !editorRoot.contains(anchorNode)) {
      setIsTextSelected(false)
      return
    }

    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    if (rect.width === 0 && rect.height === 0) {
      setIsTextSelected(false)
      return
    }

    setToolbarPosition({
      top: Math.max(rect.top - 52, 12),
      left: rect.left + rect.width / 2,
    })
    setIsTextSelected(true)
  }, [editor])

  useEffect(() => {
    if (!editor) return

    renderComments({
      editor,
      editorId: CKEDITOR_EDITOR_ID,
      commentAnnotations: commentAnnotations ?? [],
    })
  }, [commentAnnotations, editor])

  useEffect(() => {
    if (!editor) return

    const update = () => updateToolbarPosition()
    const scrollContainer = scrollContainerRef?.current

    editor.model.document.on('change:data', update)
    editor.model.document.selection.on('change:range', update)
    document.addEventListener('selectionchange', update)
    window.addEventListener('resize', update)
    scrollContainer?.addEventListener('scroll', update, { passive: true })

    return () => {
      editor.model.document.off('change:data', update)
      editor.model.document.selection.off('change:range', update)
      document.removeEventListener('selectionchange', update)
      window.removeEventListener('resize', update)
      scrollContainer?.removeEventListener('scroll', update)
    }
  }, [editor, scrollContainerRef, updateToolbarPosition])

  const toggleInlineStyle = useCallback((style: CKEditorInlineStyle) => {
    if (!editor) return

    editor.execute(styleToCommand[style])
    editor.editing.view.focus()
    setActiveStyles(getActiveStyles(editor))
    updateToolbarPosition()
  }, [editor, updateToolbarPosition])

  const handleAddComment = useCallback(() => {
    if (!editor) return

    const scrollContainer = scrollContainerRef?.current
    const scrollTop = scrollContainer?.scrollTop ?? 0

    editor.editing.view.focus()
    void addComment({
      editor,
      editorId: CKEDITOR_EDITOR_ID,
    })

    setIsTextSelected(false)
    if (scrollContainer) {
      requestAnimationFrame(() => {
        scrollContainer.scrollTop = scrollTop
      })
    }
  }, [editor, scrollContainerRef])

  return (
    <div
      className="relative size-full overflow-hidden"
      style={{ backgroundColor: 'var(--app-bg)' }}
      data-name="CKEditor / Expanded Toolbar"
    >
      <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-auto pb-20">
        <div className="flex justify-center pt-[51px] px-4">
          <div className="w-full max-w-[850px]">
            <div
              className="border border-solid rounded-[16px] p-[42px_56px_64px_56px] min-h-[880px]"
              style={{ backgroundColor: 'var(--app-surface)', borderColor: 'var(--app-surface-border)' }}
            >
              <div className="ckeditor-editor-content w-full max-w-[738px]">
                <CKEditor
                  editor={ClassicEditor}
                  config={{
                    licenseKey: 'GPL',
                    plugins: [
                      Essentials,
                      Paragraph,
                      Heading,
                      Bold,
                      Italic,
                      Underline,
                      Strikethrough,
                      Link,
                      List,
                      BlockQuote,
                      VeltCommentsPlugin,
                    ],
                    toolbar: [
                      'undo',
                      'redo',
                      '|',
                      'heading',
                      '|',
                      'bold',
                      'italic',
                      'underline',
                      'strikethrough',
                      'link',
                      '|',
                      'bulletedList',
                      'numberedList',
                      '|',
                      'blockQuote',
                    ],
                    initialData: initialValue,
                    placeholder: CKEDITOR_PLACEHOLDER,
                    veltComments: { editorId: CKEDITOR_EDITOR_ID },
                  }}
                  onReady={(nextEditor) => {
                    setEditor(nextEditor)
                    window.__ckeditorDemo = { addComment, editor: nextEditor, renderComments }
                  }}
                  onChange={(_event, nextEditor) => {
                    saveContent(nextEditor.getData())
                    updateToolbarPosition()
                  }}
                  onAfterDestroy={() => {
                    setEditor(null)
                    window.__ckeditorDemo = undefined
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
              <BubbleMenuToolbar
                activeStyles={activeStyles}
                onAddComment={handleAddComment}
                onToggleStyle={toggleInlineStyle}
              />
            </div>,
            document.body
          )
        : null}
    </div>
  )
}
