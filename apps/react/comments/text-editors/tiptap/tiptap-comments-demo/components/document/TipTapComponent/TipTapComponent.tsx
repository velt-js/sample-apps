'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { useEffect } from 'react'
import { useCommentAnnotations } from '@veltdev/react' // [Velt] Hook that listens to comment annotations and provides real-time updates when comments are added/removed
import { TiptapVeltComments, addComment, renderComments } from '@veltdev/tiptap-velt-comments' // [Velt] TipTap extension and utilities for integrating Velt comments into the editor
import { BubbleMenuToolbar } from './ui/BubbleMenuToolbar'
import { TipTapComponentProps } from './types'
import { initialContent } from './constants'
import { InlineH1, InlineH2, InlineH3 } from './extensions'

export default function TipTapComponent({ scrollContainerRef }: TipTapComponentProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
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
    ],
    content: initialContent,
    immediatelyRender: false, // Prevents SSR hydration mismatches by only rendering on client
  })

  const commentAnnotations = useCommentAnnotations() // [Velt] Subscribes to comment data changes and returns array of all active comment annotations

  useEffect(() => {
    if (editor && commentAnnotations?.length) {
      renderComments({ editor, commentAnnotations }) // [Velt] Renders comment highlights and markers in the editor based on annotation positions
    }
  }, [editor, commentAnnotations])

  const addTiptapVeltComment = () => {
    if (editor) {
      // Preserve scroll position across Velt comment creation
      const scrollContainer = scrollContainerRef?.current
      const scrollTop = scrollContainer?.scrollTop ?? 0
      addComment({ editor }) // [Velt] Triggers comment creation flow on selected text in the editor
      if (scrollContainer) {
        requestAnimationFrame(() => {
          scrollContainer.scrollTop = scrollTop
        })
      }
    }
  }

  return (
    <div className="relative size-full overflow-hidden" style={{ backgroundColor: 'var(--app-bg)' }} data-name="Tiptap / Expanded Toolbar">
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

              {editor && (
                <BubbleMenu editor={editor} options={{ placement: 'top', offset: 8 }}>
                  <BubbleMenuToolbar editor={editor} onAddComment={addTiptapVeltComment} />
                </BubbleMenu>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
