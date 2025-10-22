'use client'

import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import React, { useEffect } from 'react'
import { useVeltTiptapCrdtExtension } from '@veltdev/tiptap-crdt-react'
import { useCommentAnnotations, useVeltEventCallback } from '@veltdev/react'
import { TiptapVeltComments, addComment, renderComments } from '@veltdev/tiptap-velt-comments'
import { EditorToolbar } from './ui/EditorToolbar'
import { TipTapComponentProps } from './types'
import { initialContent } from './constants'
import { useCurrentDocument } from '@/app/document/useCurrentDocument'
import { InlineH1, InlineH2, InlineH3 } from './extensions'

export default function TipTapComponent({ scrollContainerRef }: TipTapComponentProps) {
  const { documentId } = useCurrentDocument()
  const veltUser = useVeltEventCallback('userUpdate')

  // Initialize CRDT extension
  const { VeltCrdt } = useVeltTiptapCrdtExtension({
    editorId: documentId || 'default-editor',
  })

  // Initialize the editor
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
      TiptapVeltComments,
      ...(VeltCrdt ? [VeltCrdt] : []),
    ],
    content: initialContent,
  }, [VeltCrdt])

  // Comment annotations
  const commentAnnotations = useCommentAnnotations()

  useEffect(() => {
    if (editor && commentAnnotations?.length) {
      renderComments({ editor, commentAnnotations })
    }
  }, [editor, commentAnnotations])

  const addTiptapVeltComment = () => {
    if (editor) {
      addComment({ editor })
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

              {/* Bubble Menu for Comments */}
              {editor && (
                <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                  <div className="bubble-menu bg-[rgb(34,34,34)] rounded-full p-[6px] shadow-[0_0_80px_rgba(0,0,0,1)]">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        addTiptapVeltComment()
                      }}
                      className="flex items-center justify-center p-[6px] hover:bg-white/10 rounded-full transition-all cursor-pointer"
                      title="Add comment"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white">
                        <path
                          d="M10 17.25H4C3.30964 17.25 2.75 16.6904 2.75 16V10C2.75 5.99594 5.99594 2.75 10 2.75C14.0041 2.75 17.25 5.99594 17.25 10C17.25 14.0041 14.0041 17.25 10 17.25Z"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </button>
                  </div>
                </BubbleMenu>
              )}
            </div>
          </div>
        </div>
      </div>

      {editor && <EditorToolbar editor={editor} />}
    </div>
  )
}
