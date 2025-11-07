'use client'

import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
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
        history: false,
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
      addComment({ editor }) // [Velt] Triggers comment creation flow on selected text in the editor
    }
  }

  return (
    <div className="bg-black relative size-full overflow-hidden" data-name="Tiptap / Expanded Toolbar">
      <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-auto pb-20">
        <div className="flex justify-center pt-[51px] px-4">
          <div className="w-full max-w-[850px]">
            <div className="bg-[rgb(17,17,17)] border border-[rgb(20,20,20)] border-solid rounded-[16px] p-[42px_56px_64px_56px] min-h-[880px]">
              <div className="w-full max-w-[738px]">
                <EditorContent
                  editor={editor}
                  className="tiptap-editor-content prose prose-invert max-w-none"
                />
              </div>

              {editor && (
                <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
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
