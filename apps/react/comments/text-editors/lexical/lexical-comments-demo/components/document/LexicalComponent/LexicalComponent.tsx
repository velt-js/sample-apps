'use client'

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useCommentAnnotations } from '@veltdev/react'
import { CommentNode, addComment, renderComments } from '@veltdev/lexical-velt-comments'
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
  const commentAnnotations = useCommentAnnotations()

  useEffect(() => {
    if (editor && commentAnnotations?.length) {
      renderComments({ editor, commentAnnotations })
    }
  }, [editor, commentAnnotations])

  const addLexicalVeltComment = () => {
    if (editor) {
      addComment({ editor })
    }
  }

  return (
    <div className="bg-black relative size-full overflow-hidden" data-name="Lexical / Expanded Toolbar">
      <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-auto pb-20">
        <div className="flex justify-center pt-[51px] px-4">
          <div className="w-full max-w-[850px]">
            <div className="bg-[rgb(17,17,17)] border border-[rgb(20,20,20)] border-solid rounded-[16px] p-[42px_56px_64px_56px] min-h-[880px]">
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
    nodes: [CommentNode, HeadingSpanNode],
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
