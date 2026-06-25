'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Editor as TinyMCEReact } from '@tinymce/tinymce-react'
import { useCommentAnnotations } from '@veltdev/react'
import { addComment, renderComments, VeltCommentsPlugin } from '@veltdev/tinymce-velt-comments'
import type { Editor as TinyMCEEditor } from 'tinymce'
import 'tinymce'
import 'tinymce/icons/default'
import 'tinymce/themes/silver'
import 'tinymce/models/dom'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import { BubbleMenuToolbar } from './ui/BubbleMenuToolbar'
import {
  TINYMCE_CONTENT_STORAGE_KEY,
  TINYMCE_DOCUMENT_ID_STORAGE_KEY,
  TINYMCE_EDITOR_ID,
  TINYMCE_PLACEHOLDER,
  initialContent,
} from './constants'
import type { TinyMCEComponentProps, TinyMCEInlineStyle } from './types'

const EMPTY_POSITION = { top: 0, left: 0 }
const MIN_EDITOR_HEIGHT = 760

const styleToCommand: Record<TinyMCEInlineStyle, string> = {
  BOLD: 'Bold',
  ITALIC: 'Italic',
  UNDERLINE: 'Underline',
  STRIKETHROUGH: 'Strikethrough',
}

const editorContentStyle = `
  html, body {
    background: transparent;
    color: #111111;
  }

  html.dark body {
    color: #ffffff;
  }

  body {
    font-family: 'Geist Mono', Menlo, Monaco, Consolas, monospace;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.4;
    margin: 0;
    padding: 0;
  }

  p {
    line-height: 1.4;
    margin: 0 0 16px;
    opacity: 0.8;
  }

  h1, h2, h3 {
    font-family: Urbanist, Inter, Arial, sans-serif;
    font-weight: 700;
    line-height: 1.5;
    margin-left: 0;
    margin-right: 0;
  }

  h1 {
    font-size: 32px;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 20px;
    margin-top: 26px;
    margin-bottom: 8px;
  }

  h3 {
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 8px;
  }

  blockquote {
    border-left: 2px solid rgba(0, 0, 0, 0.35);
    margin-left: 0;
    padding-left: 16px;
  }

  html.dark blockquote {
    border-left-color: rgba(255, 255, 255, 0.45);
  }
`

function loadInitialContent() {
  if (typeof window === 'undefined') return initialContent

  try {
    return window.localStorage.getItem(getContentStorageKey()) ?? initialContent
  } catch {
    return initialContent
  }
}

function getContentStorageKey() {
  if (typeof window === 'undefined') return TINYMCE_CONTENT_STORAGE_KEY

  const urlDocumentId = new URLSearchParams(window.location.search).get('documentId')
  const storedDocumentId = window.localStorage.getItem(TINYMCE_DOCUMENT_ID_STORAGE_KEY)
  const documentId = urlDocumentId || storedDocumentId

  return documentId ? `${TINYMCE_CONTENT_STORAGE_KEY}:${documentId}` : TINYMCE_CONTENT_STORAGE_KEY
}

function saveContent(content: string) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(getContentStorageKey(), content)
  } catch {}
}

function getIframeElement(editor: TinyMCEEditor) {
  return editor.iframeElement ?? editor.getContentAreaContainer().querySelector('iframe')
}

function syncEditorTheme(editor: TinyMCEEditor) {
  const iframeDocument = editor.getDoc()
  const isDark = document.documentElement.classList.contains('dark')
  iframeDocument.documentElement.classList.toggle('dark', isDark)
}

function resizeEditorToContent(editor: TinyMCEEditor) {
  requestAnimationFrame(() => {
    editor.execCommand('mceAutoResize')

    const iframe = getIframeElement(editor)
    const container = editor.getContainer()
    const iframeDocument = editor.getDoc()
    const editorBody = editor.getBody()

    if (!iframe || !container || !iframeDocument || !editorBody) return

    const contentHeight = Math.max(
      MIN_EDITOR_HEIGHT,
      iframeDocument.documentElement.scrollHeight,
      editorBody.scrollHeight,
      editorBody.offsetHeight
    )
    const editorHeader = container.querySelector<HTMLElement>('.tox-editor-header')
    const editorContainer = container.querySelector<HTMLElement>('.tox-editor-container')
    const sidebarWrap = container.querySelector<HTMLElement>('.tox-sidebar-wrap')
    const editArea = container.querySelector<HTMLElement>('.tox-edit-area')
    const editAreaIframe = container.querySelector<HTMLElement>('.tox-edit-area__iframe')
    const totalHeight = contentHeight + (editorHeader?.offsetHeight ?? 0)

    container.style.setProperty('height', `${totalHeight}px`, 'important')
    editorContainer?.style.setProperty('height', `${totalHeight}px`, 'important')
    sidebarWrap?.style.setProperty('height', `${contentHeight}px`)
    editArea?.style.setProperty('height', `${contentHeight}px`)
    editAreaIframe?.style.setProperty('height', `${contentHeight}px`)
    iframe.style.setProperty('height', `${contentHeight}px`, 'important')
  })
}

function getActiveStyles(editor: TinyMCEEditor | null) {
  const activeStyles = new Set<TinyMCEInlineStyle>()
  if (!editor) return activeStyles

  for (const style of Object.keys(styleToCommand) as TinyMCEInlineStyle[]) {
    if (editor.queryCommandState(styleToCommand[style])) {
      activeStyles.add(style)
    }
  }

  return activeStyles
}

export default function TinyMCEComponent({ scrollContainerRef }: TinyMCEComponentProps) {
  const initialValue = useMemo(loadInitialContent, [])
  const [editor, setEditor] = useState<TinyMCEEditor | null>(null)
  const [isTextSelected, setIsTextSelected] = useState(false)
  const [toolbarPosition, setToolbarPosition] = useState(EMPTY_POSITION)
  const [activeStyles, setActiveStyles] = useState<Set<TinyMCEInlineStyle>>(new Set())
  const commentAnnotations = useCommentAnnotations()

  const updateToolbarPosition = useCallback(() => {
    setActiveStyles(getActiveStyles(editor))

    if (!editor) {
      setIsTextSelected(false)
      return
    }

    const selectionText = editor.selection.getContent({ format: 'text' }).trim()
    const range = editor.selection.getRng()
    const iframe = getIframeElement(editor)

    if (!selectionText || !range || !iframe) {
      setIsTextSelected(false)
      return
    }

    const rangeRect = range.getBoundingClientRect()
    if (rangeRect.width === 0 && rangeRect.height === 0) {
      setIsTextSelected(false)
      return
    }

    const iframeRect = iframe.getBoundingClientRect()
    setToolbarPosition({
      top: Math.max(iframeRect.top + rangeRect.top - 52, 12),
      left: iframeRect.left + rangeRect.left + rangeRect.width / 2,
    })
    setIsTextSelected(true)
  }, [editor])

  useEffect(() => {
    if (!editor) return

    renderComments({
      editor,
      editorId: TINYMCE_EDITOR_ID,
      commentAnnotations: commentAnnotations ?? [],
    })
    resizeEditorToContent(editor)
  }, [commentAnnotations, editor])

  useEffect(() => {
    if (!editor) return

    const update = () => updateToolbarPosition()
    const iframeWindow = editor.getWin()
    const scrollContainer = scrollContainerRef?.current

    editor.on('NodeChange SelectionChange MouseUp KeyUp SetContent', update)
    window.addEventListener('resize', update)
    iframeWindow.addEventListener('scroll', update, { passive: true })
    scrollContainer?.addEventListener('scroll', update, { passive: true })

    return () => {
      editor.off('NodeChange SelectionChange MouseUp KeyUp SetContent', update)
      window.removeEventListener('resize', update)
      iframeWindow.removeEventListener('scroll', update)
      scrollContainer?.removeEventListener('scroll', update)
    }
  }, [editor, scrollContainerRef, updateToolbarPosition])

  useEffect(() => {
    if (!editor) return

    syncEditorTheme(editor)
    const observer = new MutationObserver(() => syncEditorTheme(editor))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [editor])

  const handleEditorInit = useCallback((_event: unknown, nextEditor: TinyMCEEditor) => {
    setEditor(nextEditor)
    syncEditorTheme(nextEditor)
    resizeEditorToContent(nextEditor)
  }, [])

  const handleEditorChange = useCallback((content: string) => {
    saveContent(content)
    if (editor) {
      resizeEditorToContent(editor)
    }
  }, [editor])

  const toggleInlineStyle = useCallback((style: TinyMCEInlineStyle) => {
    if (!editor) return

    editor.execCommand(styleToCommand[style])
    editor.focus()
    setActiveStyles(getActiveStyles(editor))
    updateToolbarPosition()
  }, [editor, updateToolbarPosition])

  const handleAddComment = useCallback(() => {
    if (!editor) return

    const scrollContainer = scrollContainerRef?.current
    const scrollTop = scrollContainer?.scrollTop ?? 0

    editor.focus()
    void addComment({
      editor,
      editorId: TINYMCE_EDITOR_ID,
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
      data-name="TinyMCE / Expanded Toolbar"
    >
      <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-auto pb-20">
        <div className="flex justify-center pt-[51px] px-4">
          <div className="w-full max-w-[850px]">
            <div
              className="border border-solid rounded-[16px] p-[42px_56px_64px_56px] min-h-[880px]"
              style={{ backgroundColor: 'var(--app-surface)', borderColor: 'var(--app-surface-border)' }}
            >
              <div className="tinymce-editor-content w-full max-w-[738px]">
                <TinyMCEReact
                  licenseKey="gpl"
                  initialValue={initialValue}
                  init={{
                    skin: false,
                    content_css: false,
                    content_style: editorContentStyle,
                    min_height: 760,
                    menubar: false,
                    statusbar: false,
                    branding: false,
                    plugins: ['autolink', 'autoresize', 'lists', 'link', VeltCommentsPlugin],
                    toolbar: 'undo redo | blocks | bold italic underline strikethrough | bullist numlist | link blockquote | addveltcomment',
                    toolbar_mode: 'sliding',
                    placeholder: TINYMCE_PLACEHOLDER,
                    velt_comments_editor_id: TINYMCE_EDITOR_ID,
                    autoresize_on_init: true,
                    autoresize_bottom_margin: 0,
                  }}
                  onEditorChange={handleEditorChange}
                  onInit={handleEditorInit}
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
