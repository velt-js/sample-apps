'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useCommentAnnotations } from '@veltdev/react'
import { addComment, renderComments, VeltCommentsPlugin } from '@veltdev/prosemirror-velt-comments'
import { Schema, type MarkSpec, type Node as ProseMirrorNode } from 'prosemirror-model'
import { schema as basicSchema } from 'prosemirror-schema-basic'
import { exampleSetup } from 'prosemirror-example-setup'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { toggleMark } from 'prosemirror-commands'
import { BubbleMenuToolbar } from './ui/BubbleMenuToolbar'
import {
  PROSEMIRROR_CONTENT_STORAGE_KEY,
  PROSEMIRROR_EDITOR_ID,
  PROSEMIRROR_PLACEHOLDER,
  initialContent,
} from './constants'
import type { ProseMirrorComponentProps, ProseMirrorInlineStyle } from './types'

const EMPTY_POSITION = { top: 0, left: 0 }

const underlineMark: MarkSpec = {
  parseDOM: [{ tag: 'u' }, { style: 'text-decoration=underline' }],
  toDOM: () => ['u', 0],
}

const strikethroughMark: MarkSpec = {
  parseDOM: [{ tag: 's' }, { tag: 'strike' }, { style: 'text-decoration=line-through' }],
  toDOM: () => ['s', 0],
}

const prosemirrorSchema = new Schema({
  nodes: basicSchema.spec.nodes,
  marks: basicSchema.spec.marks
    .addToEnd('underline', underlineMark)
    .addToEnd('strikethrough', strikethroughMark),
})

const styleToMark: Record<ProseMirrorInlineStyle, string> = {
  BOLD: 'strong',
  ITALIC: 'em',
  UNDERLINE: 'underline',
  STRIKETHROUGH: 'strikethrough',
}

function createInitialDoc() {
  if (typeof window !== 'undefined') {
    try {
      const savedContent = window.localStorage.getItem(PROSEMIRROR_CONTENT_STORAGE_KEY)
      if (savedContent) {
        return prosemirrorSchema.nodeFromJSON(JSON.parse(savedContent))
      }
    } catch {}
  }

  return prosemirrorSchema.nodeFromJSON(initialContent)
}

function saveContent(doc: ProseMirrorNode) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(PROSEMIRROR_CONTENT_STORAGE_KEY, JSON.stringify(doc.toJSON()))
  } catch {}
}

function getActiveStyles(view: EditorView | null) {
  const activeStyles = new Set<ProseMirrorInlineStyle>()
  if (!view) return activeStyles

  const { state } = view
  const marks = state.storedMarks ?? state.selection.$from.marks()

  for (const style of Object.keys(styleToMark) as ProseMirrorInlineStyle[]) {
    const markType = prosemirrorSchema.marks[styleToMark[style]]
    if (markType && marks.some((mark) => mark.type === markType)) {
      activeStyles.add(style)
    }
  }

  return activeStyles
}

export default function ProseMirrorComponent({ scrollContainerRef }: ProseMirrorComponentProps) {
  const editorRootRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const [viewReady, setViewReady] = useState(0)
  const [isTextSelected, setIsTextSelected] = useState(false)
  const [toolbarPosition, setToolbarPosition] = useState(EMPTY_POSITION)
  const [activeStyles, setActiveStyles] = useState<Set<ProseMirrorInlineStyle>>(new Set())
  const commentAnnotations = useCommentAnnotations()

  const updateToolbarPosition = useCallback(() => {
    const selection = window.getSelection()
    const root = editorRootRef.current
    const view = viewRef.current

    setActiveStyles(getActiveStyles(view))

    if (
      !selection ||
      !root ||
      !view ||
      selection.rangeCount === 0 ||
      selection.toString().trim().length === 0 ||
      view.state.selection.empty
    ) {
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
    const root = editorRootRef.current
    if (!root) return

    const state = EditorState.create({
      doc: createInitialDoc(),
      schema: prosemirrorSchema,
      plugins: [
        ...exampleSetup({ schema: prosemirrorSchema, menuBar: false }),
        VeltCommentsPlugin({ editorId: PROSEMIRROR_EDITOR_ID }),
      ],
    })

    const view = new EditorView(root, {
      state,
      attributes: {
        'aria-label': 'ProseMirror document editor',
        'data-placeholder': PROSEMIRROR_PLACEHOLDER,
      },
      dispatchTransaction(transaction) {
        const nextState = view.state.apply(transaction)
        view.updateState(nextState)

        if (transaction.docChanged) {
          saveContent(nextState.doc)
        }

        updateToolbarPosition()
      },
    })

    viewRef.current = view
    setViewReady((value) => value + 1)

    return () => {
      view.destroy()
      viewRef.current = null
    }
  }, [updateToolbarPosition])

  useEffect(() => {
    const view = viewRef.current
    if (!view) return

    renderComments({
      editor: view,
      editorId: PROSEMIRROR_EDITOR_ID,
      commentAnnotations: commentAnnotations ?? [],
    })
  }, [commentAnnotations, viewReady])

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

  const toggleInlineStyle = useCallback((style: ProseMirrorInlineStyle) => {
    const view = viewRef.current
    const markType = prosemirrorSchema.marks[styleToMark[style]]
    if (!view || !markType) return

    toggleMark(markType)(view.state, view.dispatch, view)
    view.focus()
    setActiveStyles(getActiveStyles(view))
  }, [])

  const handleAddComment = useCallback(() => {
    const view = viewRef.current
    if (!view) return

    const scrollContainer = scrollContainerRef?.current
    const scrollTop = scrollContainer?.scrollTop ?? 0

    void addComment({
      editor: view,
      editorId: PROSEMIRROR_EDITOR_ID,
    })

    setIsTextSelected(false)
    if (scrollContainer) {
      requestAnimationFrame(() => {
        scrollContainer.scrollTop = scrollTop
      })
    }
  }, [scrollContainerRef])

  return (
    <div
      className="relative size-full overflow-hidden"
      style={{ backgroundColor: 'var(--app-bg)' }}
      data-name="ProseMirror / Expanded Toolbar"
    >
      <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-auto pb-20">
        <div className="flex justify-center pt-[51px] px-4">
          <div className="w-full max-w-[850px]">
            <div
              className="border border-solid rounded-[16px] p-[42px_56px_64px_56px] min-h-[880px]"
              style={{ backgroundColor: 'var(--app-surface)', borderColor: 'var(--app-surface-border)' }}
            >
              <div ref={editorRootRef} className="prosemirror-editor-content w-full max-w-[738px]" />
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
