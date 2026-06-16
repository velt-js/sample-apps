'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { useEffect } from 'react'
import {
  useCommentAnnotations,
  useSuggestionModeState,
} from '@veltdev/react' // [Velt] Comments + Suggestions hooks
import { TiptapVeltComments, addComment, renderComments } from '@veltdev/tiptap-velt-comments' // [Velt] TipTap extension and utilities for integrating Velt comments into the editor
import { BubbleMenuToolbar } from './ui/BubbleMenuToolbar'
import { TipTapComponentProps } from './types'
import { initialContent } from './constants'
import { InlineH1, InlineH2, InlineH3 } from './extensions'
// [Velt] Inline per-edit suggestion engine for the body (Google-Docs style):
// each edit is wrapped in deletion (strikethrough) / insertion (underline) marks
// and committed as its own Velt suggestion carrying the real old → new diff.
import { SuggestionExtensions, VeltSuggestionBridge } from './suggestion'

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
      ...SuggestionExtensions(), // [Velt] Inline suggestion marks + ProseMirror plugin (tracks each body edit)
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

  // Subtle accent while suggesting mode is on (always on in this demo). Per-edit
  // pending state is shown inline (dashed strikethrough/underline), not as a
  // whole-body badge.
  const suggesting = useSuggestionModeState() ?? false

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
    <div className="w-full" data-name="Tiptap / Suggestions Body">
      {/* [Velt] Renderless: enables the inline suggestion plugin, sets the
          author, debounce-commits each edit as a suggestion, and applies/reverts
          inline marks on accept/reject. */}
      <VeltSuggestionBridge editor={editor} />

      <div
        className="relative border border-solid rounded-[16px] p-[42px_56px_56px_56px] min-h-[460px] transition-shadow"
        style={{
          backgroundColor: 'var(--app-surface)',
          borderColor: suggesting ? '#6366f1' : 'var(--app-surface-border)',
          boxShadow: suggesting ? '0 0 0 1px rgba(99,102,241,0.45)' : 'none',
        }}
      >
        <EditorContent
          editor={editor}
          className="tiptap-editor-content prose prose-invert max-w-none"
        />

        {editor && (
          <BubbleMenu editor={editor} options={{ placement: 'top', offset: 8 }}>
            <BubbleMenuToolbar editor={editor} onAddComment={addTiptapVeltComment} />
          </BubbleMenu>
        )}
      </div>
    </div>
  )
}
