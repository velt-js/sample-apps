'use client'

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useCommentAnnotations } from '@veltdev/react' // [Velt] Hook that listens to comment annotations and provides real-time updates when comments are added/removed
import { CommentNode, addComment, renderComments } from '@veltdev/lexical-velt-comments' // [Velt] Lexical node and utilities for integrating Velt comments into the editor
import { BubbleMenuToolbar } from './ui/BubbleMenuToolbar'
import { LexicalComponentProps } from './types'
import { initialContent } from './constants'
import { FormattingPlugin } from './plugins/FormattingPlugin'
import { BubbleMenuPlugin } from './plugins/BubbleMenuPlugin'
import { HeadingPlugin } from './plugins/HeadingPlugin'
import { TextAlignPlugin } from './plugins/TextAlignPlugin'
import { InitialContentPlugin } from './plugins/InitialContentPlugin'
import { HeadingSpanNode } from './nodes/HeadingSpanNode'

function LexicalEditor({ scrollContainerRef }: LexicalComponentProps) {
  const [editor] = useLexicalComposerContext()
  const commentAnnotations = useCommentAnnotations() // [Velt] Subscribes to comment data changes and returns array of all active comment annotations

  useEffect(() => {
    if (editor && commentAnnotations?.length) {
      renderComments({ editor, commentAnnotations }) // [Velt] Renders comment highlights and markers in the editor based on annotation positions
    }
  }, [editor, commentAnnotations])

  const addLexicalVeltComment = () => {
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
    <div className="relative size-full overflow-hidden" style={{ backgroundColor: 'var(--app-bg)' }} data-name="Lexical / Expanded Toolbar">
      <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-auto pb-20">
        <div className="flex justify-center pt-[51px] px-4">
          <div className="w-full max-w-[850px]">
            <div className="border border-solid rounded-[16px] p-[42px_56px_64px_56px] min-h-[880px]" style={{ backgroundColor: 'var(--app-surface)', borderColor: 'var(--app-surface-border)' }}>
              <div className="w-full max-w-[738px]">
                <RichTextPlugin
                  contentEditable={
                    <ContentEditable className="lexical-editor-content prose prose-invert max-w-none outline-none" />
                  }
                  placeholder={<div className="absolute top-0 left-0 pointer-events-none opacity-50">Start typing...</div>}
                  ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <FormattingPlugin />
                <HeadingPlugin />
                <TextAlignPlugin />
                <InitialContentPlugin initialContent={initialContent} />
                <BubbleMenuPlugin onAddComment={addLexicalVeltComment} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LexicalComponent({ scrollContainerRef }: LexicalComponentProps) {
  const initialConfig = {
    namespace: 'VeltLexicalEditor',
    nodes: [CommentNode, HeadingSpanNode], // [Velt] Registers CommentNode to enable comment markers and tracking in the editor
    onError: (error: Error) => console.error(error),
    theme: {
      text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
        strikethrough: 'line-through',
      },
    },
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <LexicalEditor scrollContainerRef={scrollContainerRef} />
    </LexicalComposer>
  )
}
