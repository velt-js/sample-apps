'use client'

import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import React, { useEffect } from 'react'
import { useVeltTiptapCrdtExtension } from '@veltdev/tiptap-crdt-react'
import { useCommentAnnotations, useVeltEventCallback } from '@veltdev/react'
import TiptapVeltComments, { addTiptapVeltComment } from '@veltdev/tiptap-velt-comments'
import { EditorToolbar } from './ui/EditorToolbar'
import { BubbleMenuToolbar } from './ui/BubbleMenuToolbar'
import { TipTapComponentProps } from './types'
import { initialContent } from './constants'
import { useCurrentDocument } from '@/app/document/useCurrentDocument'
import { InlineH1, InlineH2, InlineH3 } from './extensions'

export default function TipTapComponent({ scrollContainerRef }: TipTapComponentProps) {
  const { documentId } = useCurrentDocument()
  const veltUser = useVeltEventCallback('userUpdate')

  // Initialize CRDT extension
  const { VeltCrdt, store } = useVeltTiptapCrdtExtension({
    editorId: documentId || 'default-editor',
    initialContent: initialContent,
  })

  useEffect(() => {
    console.log('VeltCrdt', VeltCrdt);
  }, [VeltCrdt]);

  useEffect(() => {
    console.log('store', store);
  }, [store]);

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

  const addVeltComment = () => {
    if (editor) {
      addTiptapVeltComment(editor)
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
                  <BubbleMenuToolbar editor={editor} onAddComment={addVeltComment} />
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
