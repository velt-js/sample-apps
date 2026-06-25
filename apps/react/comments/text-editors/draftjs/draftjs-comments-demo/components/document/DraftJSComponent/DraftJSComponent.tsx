'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useCommentAnnotations } from '@veltdev/react'
import {
  DraftJSVeltEditor,
  addComment,
  exportContentStateWithoutComments,
  renderComments,
} from '@veltdev/draftjs-velt-comments'
import {
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from 'draft-js'
import type { ContentBlock, ContentState, DraftHandleValue } from 'draft-js'
import { BubbleMenuToolbar } from './ui/BubbleMenuToolbar'
import {
  DRAFTJS_CONTENT_STORAGE_KEY,
  DRAFTJS_EDITOR_ID,
  initialContent,
} from './constants'
import type { DraftInlineStyle, DraftJSComponentProps } from './types'

const EMPTY_POSITION = { top: 0, left: 0 }

const customStyleMap = {
  STRIKETHROUGH: {
    textDecoration: 'line-through',
  },
}

function createInitialEditorState() {
  if (typeof window !== 'undefined') {
    try {
      const savedContent = window.localStorage.getItem(DRAFTJS_CONTENT_STORAGE_KEY)
      if (savedContent) {
        return EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent)))
      }
    } catch {}
  }

  return EditorState.createWithContent(convertFromRaw(initialContent))
}

function saveContent(contentState: ContentState) {
  if (typeof window === 'undefined') return

  try {
    const cleanContent = exportContentStateWithoutComments(contentState)
    window.localStorage.setItem(DRAFTJS_CONTENT_STORAGE_KEY, JSON.stringify(convertToRaw(cleanContent)))
  } catch {}
}

function getBlockStyle(block: ContentBlock) {
  switch (block.getType()) {
    case 'header-one':
      return 'draftjs-heading-one'
    case 'header-two':
      return 'draftjs-heading-two'
    case 'header-three':
      return 'draftjs-heading-three'
    case 'blockquote':
      return 'draftjs-blockquote'
    default:
      return ''
  }
}

export default function DraftJSComponent({ scrollContainerRef }: DraftJSComponentProps) {
  const editorRootRef = useRef<HTMLDivElement>(null)
  const [editorState, setEditorState] = useState(createInitialEditorState)
  const [isTextSelected, setIsTextSelected] = useState(false)
  const [toolbarPosition, setToolbarPosition] = useState(EMPTY_POSITION)
  const commentAnnotations = useCommentAnnotations()

  const editor = useMemo(
    () => ({
      editorState,
      setEditorState,
    }),
    [editorState]
  )
  const editorRef = useRef(editor)

  useEffect(() => {
    editorRef.current = editor
  }, [editor])

  useEffect(() => {
    renderComments({
      editor: editorRef.current,
      editorId: DRAFTJS_EDITOR_ID,
      commentAnnotations: commentAnnotations ?? [],
    })
  }, [commentAnnotations])

  const updateToolbarPosition = useCallback(() => {
    const selection = window.getSelection()
    const root = editorRootRef.current

    if (!selection || !root || selection.rangeCount === 0 || selection.toString().trim().length === 0) {
      setIsTextSelected(false)
      return
    }

    const range = selection.getRangeAt(0)
    const anchorNode = selection.anchorNode

    if (!anchorNode || !root.contains(anchorNode)) {
      setIsTextSelected(false)
      return
    }

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
  }, [])

  useEffect(() => {
    document.addEventListener('selectionchange', updateToolbarPosition)
    window.addEventListener('resize', updateToolbarPosition)
    const scrollContainer = scrollContainerRef?.current
    scrollContainer?.addEventListener('scroll', updateToolbarPosition, { passive: true })

    return () => {
      document.removeEventListener('selectionchange', updateToolbarPosition)
      window.removeEventListener('resize', updateToolbarPosition)
      scrollContainer?.removeEventListener('scroll', updateToolbarPosition)
    }
  }, [scrollContainerRef, updateToolbarPosition])

  const onChange = useCallback((nextEditorState: EditorState) => {
    setEditorState(nextEditorState)
    saveContent(nextEditorState.getCurrentContent())
  }, [])

  const handleKeyCommand = useCallback((command: string, state: EditorState): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(state, command)
    if (!newState) return 'not-handled'

    onChange(newState)
    return 'handled'
  }, [onChange])

  const toggleInlineStyle = useCallback((style: DraftInlineStyle) => {
    onChange(RichUtils.toggleInlineStyle(editorRef.current.editorState, style))
  }, [onChange])

  const addDraftJSVeltComment = useCallback(() => {
    const scrollContainer = scrollContainerRef?.current
    const scrollTop = scrollContainer?.scrollTop ?? 0

    addComment({
      editor: editorRef.current,
      editorId: DRAFTJS_EDITOR_ID,
    })

    setIsTextSelected(false)
    if (scrollContainer) {
      requestAnimationFrame(() => {
        scrollContainer.scrollTop = scrollTop
      })
    }
  }, [scrollContainerRef])

  const currentStyles = editorState.getCurrentInlineStyle().toSet()

  return (
    <div
      className="relative size-full overflow-hidden"
      style={{ backgroundColor: 'var(--app-bg)' }}
      data-name="DraftJS / Expanded Toolbar"
    >
      <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-auto pb-20">
        <div className="flex justify-center pt-[51px] px-4">
          <div className="w-full max-w-[850px]">
            <div
              className="border border-solid rounded-[16px] p-[42px_56px_64px_56px] min-h-[880px]"
              style={{ backgroundColor: 'var(--app-surface)', borderColor: 'var(--app-surface-border)' }}
            >
              <div ref={editorRootRef} className="draftjs-editor-content w-full max-w-[738px]">
                <DraftJSVeltEditor
                  editorState={editorState}
                  handleKeyCommand={handleKeyCommand}
                  onChange={onChange}
                  customStyleMap={customStyleMap}
                  blockStyleFn={getBlockStyle}
                  placeholder="Start typing..."
                  spellCheck
                  stripPastedStyles={false}
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
                activeStyles={currentStyles}
                onAddComment={addDraftJSVeltComment}
                onToggleStyle={toggleInlineStyle}
              />
            </div>,
            document.body
          )
        : null}
    </div>
  )
}
