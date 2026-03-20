'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import BubbleMenu from '@tiptap/extension-bubble-menu'
import { useEffect, useState, useRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { useCollaboration } from '@veltdev/tiptap-crdt-react'
import { useCommentAnnotations } from '@veltdev/react' // [Velt] Hook that listens to comment annotations and provides real-time updates when comments are added/removed
import { TiptapVeltComments, addComment, renderComments } from '@veltdev/tiptap-velt-comments' // [Velt] TipTap extension and utilities for integrating Velt comments into the editor
import { BubbleMenuToolbar } from './ui/BubbleMenuToolbar'
import { TipTapComponentProps } from './types'
import { initialContent } from './constants'
import { useCurrentDocument } from '@/app/document/useCurrentDocument'
import { InlineH1, InlineH2, InlineH3 } from './extensions'

export default function TipTapComponent({ scrollContainerRef }: TipTapComponentProps) {
  const { documentId } = useCurrentDocument()
  const [bubbleMenuElement, setBubbleMenuElement] = useState<HTMLDivElement | null>(null)
  const bubbleMenuRootRef = useRef<Root | null>(null)

  // [Velt] Initialize CRDT extension for real-time collaborative editing
  const { extension } = useCollaboration({
    editorId: documentId || 'default-editor',
    initialContent: initialContent,
    onError: (err) => console.error('[Velt CRDT] Collaboration error:', err),
  })

  // Create bubble menu element
  useEffect(() => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    setBubbleMenuElement(element)

    return () => {
      document.body.removeChild(element)
    }
  }, [])

  // Initialize the editor - only when bubble menu element is ready
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        undoRedo: false,
        heading: false,
      }),
      TextAlign.configure({
        types: ['paragraph'],
      }),
      Underline,
      InlineH1,
      InlineH2,
      InlineH3,
      TiptapVeltComments, // [Velt] Registers TipTap extension that enables comment markers and selection tracking in the editor
      ...(bubbleMenuElement ? [BubbleMenu.configure({
        element: bubbleMenuElement,
        options: {
          placement: 'top',
          offset: 8,
        },
      })] : []),
      ...(extension ? [extension] : []), // [Velt] Add CRDT extension for real-time collaboration when available
    ],
    // content: initialContent,
    immediatelyRender: false, // Prevents SSR hydration mismatches by only rendering on client
  }, [extension, bubbleMenuElement])

  const commentAnnotations = useCommentAnnotations() // [Velt] Subscribes to comment data changes and returns array of all active comment annotations

  useEffect(() => {
    if (editor && commentAnnotations?.length) {
      renderComments({ editor, commentAnnotations }) // [Velt] Renders comment highlights and markers in the editor based on annotation positions
    }
  }, [editor, commentAnnotations])

  const addTiptapVeltComment = () => {
    if (editor) {
      addComment({ editor }) // [Velt] Triggers comment creation flow on selected text in the editor
    }
  }

  // Render bubble menu toolbar into the bubble menu element
  useEffect(() => {
    if (bubbleMenuElement && editor) {
      if (!bubbleMenuRootRef.current) {
        bubbleMenuRootRef.current = createRoot(bubbleMenuElement)
      }
      bubbleMenuRootRef.current.render(<BubbleMenuToolbar editor={editor} onAddComment={addTiptapVeltComment} />)
    }
  }, [bubbleMenuElement, editor, addTiptapVeltComment])

  // Cleanup bubble menu on unmount
  useEffect(() => {
    return () => {
      if (bubbleMenuRootRef.current) {
        // Defer unmount to avoid race condition
        setTimeout(() => {
          if (bubbleMenuRootRef.current) {
            bubbleMenuRootRef.current.unmount()
            bubbleMenuRootRef.current = null
          }
        }, 0)
      }
    }
  }, [])

  return (
    <div className="relative size-full overflow-hidden" style={{ backgroundColor: 'var(--app-bg)' }} data-name="Tiptap / Bubble Menu">
      <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-auto pb-20">
        <div className="flex justify-center pt-[51px] px-4">
          <div className="w-full max-w-[850px]">
            <div className="border border-solid rounded-[16px] p-[42px_56px_64px_56px] min-h-[880px]" style={{ backgroundColor: 'var(--app-surface)', borderColor: 'var(--app-surface-border)' }}>
              <div className="w-full max-w-[738px]">
                <EditorContent
                  editor={editor}
                  className="tiptap-editor-content prose prose-invert max-w-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
