'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { useEffect } from 'react'
import {
  useCommentAnnotations,
  useRegisterTarget,
  useUnregisterTarget,
  useSuggestionModeState,
  useSuggestionEventCallback,
  usePendingSuggestion,
} from '@veltdev/react' // [Velt] Comments + Suggestions hooks
import { TiptapVeltComments, addComment, renderComments } from '@veltdev/tiptap-velt-comments' // [Velt] TipTap extension and utilities for integrating Velt comments into the editor
import { BubbleMenuToolbar } from './ui/BubbleMenuToolbar'
import { TipTapComponentProps } from './types'
import { initialContent } from './constants'
import { InlineH1, InlineH2, InlineH3 } from './extensions'
import { TARGET } from '@/components/suggestions/types'

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

  // ── [Velt] The editor body as a Suggestion target ──────────────────────────
  // Register the editor as a complex target with a getter returning its live
  // HTML. When suggestion mode is on, focusing the body snapshots oldValue and
  // blurring commits one suggestion (whole-body old → new). Comments still work
  // (selecting text doesn't change content, so it never creates a suggestion).
  const suggesting = useSuggestionModeState() ?? false
  const bodyPending = usePendingSuggestion(TARGET.body)
  const { registerTarget } = useRegisterTarget()
  const { unregisterTarget } = useUnregisterTarget()

  useEffect(() => {
    if (!editor) return
    registerTarget({ targetId: TARGET.body, getter: () => editor.getHTML() })
    return () => unregisterTarget(TARGET.body)
  }, [editor, registerTarget, unregisterTarget])

  // Apply / revert body suggestions on the editor. Idempotent: only sets
  // content when it actually differs, so re-fired events are harmless.
  const approvedEvent = useSuggestionEventCallback('suggestionApproved')
  const rejectedEvent = useSuggestionEventCallback('suggestionRejected')

  useEffect(() => {
    const s = approvedEvent?.suggestion
    if (!editor || !s || s.targetId !== TARGET.body) return
    const next = s.newValue as string
    if (editor.getHTML() !== next) editor.commands.setContent(next)
  }, [approvedEvent, editor])

  useEffect(() => {
    const s = rejectedEvent?.suggestion
    if (!editor || !s || s.targetId !== TARGET.body) return
    const prev = s.oldValue as string
    if (editor.getHTML() !== prev) editor.commands.setContent(prev)
  }, [rejectedEvent, editor])

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
      <div
        className="relative border border-solid rounded-[16px] p-[42px_56px_56px_56px] min-h-[460px] transition-shadow"
        style={{
          backgroundColor: 'var(--app-surface)',
          borderColor: bodyPending ? '#f59e0b' : suggesting ? '#6366f1' : 'var(--app-surface-border)',
          boxShadow: bodyPending
            ? '0 0 0 1px rgba(245,158,11,0.55)'
            : suggesting
              ? '0 0 0 1px rgba(99,102,241,0.45)'
              : 'none',
        }}
      >
        {bodyPending && (
          <span
            title={bodyPending.summary ?? undefined}
            className="absolute top-4 right-4 z-10"
            style={{
              background: '#f59e0b',
              color: '#1a1205',
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '.08em',
              padding: '2px 7px',
              borderRadius: 4,
            }}
          >
            PENDING
          </span>
        )}

        {/* Tagging this wrapper makes the editor a suggestion target — the SDK
            walks up from the edited contenteditable to find this targetId. */}
        <div data-velt-suggestion-target={TARGET.body}>
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
  )
}
