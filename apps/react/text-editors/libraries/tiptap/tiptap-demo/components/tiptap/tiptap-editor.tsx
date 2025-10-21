'use client'

import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import React, { useEffect } from 'react'
import { InlineH1, InlineH2, InlineH3 } from './extensions'
import { TiptapVeltComments, addComment, renderComments } from '@veltdev/tiptap-velt-comments'
import { useCommentAnnotations } from '@veltdev/react'

// Icon assets from public/icons directory
const imgTablerIconAlignLeft = "/icons/align-left.svg"
const imgTablerIconAlignCenter = "/icons/align-center.svg"
const imgTablerIconAlignRight = "/icons/align-right.svg"
const imgLine1 = "/icons/line.svg"
const imgTablerIconBold = "/icons/bold.svg"
const imgTablerIconItalic = "/icons/italic.svg"
const imgTablerIconUnderline = "/icons/underline.svg"
const imgTablerIconH1 = "/icons/h1.svg"
const imgTablerIconH2 = "/icons/h2.svg"
const imgTablerIconH3 = "/icons/h3.svg"
const imgTablerIconPilcrow = "/icons/pilcrow.svg"

const initialContent = `
<p><span data-heading="h1">Attention Is All You Need</span></p>
<p>Ashish Vaswani<br>
Google Brain avaswani@google.com<br>
&Noam Shazeer1<br>
Google Brain noam@google.com<br>
&Niki Parmar1<br>
Google Research nikip@google.com<br>
&Jakob Uszkoreit1<br>
Google Research usz@google.com<br>
&Llion Jones1<br>
Google Research llion@google.com<br>
&Aidan N. Gomez1   <br>
University of Toronto aidan@cs.toronto.edu &Łukasz Kaiser1<br>
Google Brain lukaszkaiser@google.com<br>
&Illia Polosukhin1  <br>
illia.polosukhin@gmail.com<br>
<br>
Equal contribution. Listing order is random. Jakob proposed replacing RNNs with self-attention and started the effort to evaluate this idea. Ashish, with Illia, designed and implemented the first Transformer models and has been crucially involved in every aspect of this work. Noam proposed scaled dot-product attention, multi-head attention and the parameter-free position representation and became the other person involved in nearly every detail. Niki designed, implemented, tuned and evaluated countless model variants in our original codebase and tensor2tensor. Llion also experimented with novel model variants, was responsible for our initial codebase, and efficient inference and visualizations. Lukasz and Aidan spent countless long days designing various parts of and implementing tensor2tensor, replacing our earlier codebase, greatly improving results and massively accelerating our research. Work performed while at Google Brain.Work performed while at Google Research.</p>

<p><span data-heading="h2">Abstract</span></p>
<p>The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train. Our model achieves 28.4 BLEU on the WMT 2014 English-to-German translation task, improving over the existing best results, including ensembles, by over 2 BLEU. On the WMT 2014 English-to-French translation task, our model establishes a new single-model state-of-the-art BLEU score of 41.8 after training for 3.5 days on eight GPUs, a small fraction of the training costs of the best models from the literature. We show that the Transformer generalizes well to other tasks by applying it successfully to English constituency parsing both with large and limited training data.</p>
`

interface ToolbarButtonProps {
  icon: string
  alt: string
  onClick?: () => void
  active?: boolean
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ icon, alt, onClick, active }) => {
  return (
    <div
      className={`box-border content-stretch flex items-center p-[8px] relative rounded-[12px] shrink-0 cursor-pointer transition-all ${
        active ? 'bg-[rgb(255,255,255)]' : 'hover:bg-white/10'
      }`}
      onClick={onClick}
    >
      <div className={`relative shrink-0 size-[20px] transition-all`}>
        <img 
          alt={alt} 
          className="block max-w-none size-full" 
          src={icon}
          style={{
            filter: active 
              ? 'brightness(0) saturate(100%) invert(9%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(92%)' // rgb(23,23,23)
              : 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(0deg) brightness(100%) contrast(100%)' // rgb(255,255,255)
          }}
        />
      </div>
    </div>
  )
}

const ToolbarDivider: React.FC = () => {
  return (
    <div className="flex items-center justify-center relative shrink-0 h-[20px]">
      <div className="w-[1px] h-full bg-[rgb(255,255,255)] opacity-20"></div>
    </div>
  )
}

export default function TiptapEditor() {
  const [, setForceUpdate] = React.useState({})
  const [hasSelection, setHasSelection] = React.useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // Disable default heading nodes
      }),
      TextAlign.configure({
        types: ['paragraph'],
      }),
      Underline,
      InlineH1,
      InlineH2,
      InlineH3,
      TiptapVeltComments,
    ],
    content: initialContent,
    immediatelyRender: false,
    onUpdate: () => {
      setForceUpdate({})
    },
    onSelectionUpdate: ({ editor }) => {
      // Track if text is selected
      const { from, to } = editor.state.selection
      setHasSelection(from !== to)
      setForceUpdate({})
    },
  })

  // Get comment annotations from Velt
  const commentAnnotations = useCommentAnnotations()

  // Render comments in the editor when annotations change
  useEffect(() => {
    if (editor && commentAnnotations?.length) {
      renderComments({ editor, commentAnnotations })
    }
  }, [editor, commentAnnotations])

  // Handler to add a comment
  const addTiptapVeltComment = () => {
    if (editor) {
      addComment({ editor })
    }
  }

  if (!editor) {
    return null
  }

  return (
    <div className="bg-black relative size-full overflow-hidden" data-name="Tiptap / Expanded Toolbar">
      {/* Document Content - Scrollable */}
      <div className="absolute inset-0 overflow-y-auto pb-20">
        <div className="flex justify-center pt-[51px]">
          <div className="w-[696px]">
            {/* Document Background */}
            <div className="bg-[rgb(17,17,17)] border border-[rgb(20,20,20)] border-solid rounded-[16px] p-[42px_42px_64px_42px] min-h-[880px]">
              {/* Editor Content Container */}
              <div className="w-[558px] mx-auto">
                {/* Helper Text */}
                <div 
                  className={`flex items-center gap-2 text-sm px-2 py-2 bg-white/[0.04] rounded-lg mb-4 transition-opacity duration-300 ${
                    hasSelection ? 'opacity-30' : 'opacity-100 animate-pulse-subtle'
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-50 shrink-0">
                    <path
                      d="M8.00004 1.33334C11.682 1.33334 14.6667 4.31801 14.6667 8.00001C14.6681 9.75033 13.9811 11.431 12.754 12.6791C11.5269 13.9272 9.85814 14.6427 8.10806 14.6711C6.35797 14.6994 4.66693 14.0384 3.40004 12.8307C2.13315 11.623 1.39203 9.96545 1.33671 8.21601L1.33337 8.00001L1.33604 7.81334C1.43471 4.21801 4.38004 1.33334 8.00004 1.33334ZM8.00004 7.33334H7.33337L7.25537 7.33801C7.09334 7.35728 6.944 7.43531 6.83565 7.55732C6.7273 7.67933 6.66745 7.83684 6.66745 8.00001C6.66745 8.16319 6.7273 8.32069 6.83565 8.4427C6.944 8.56471 7.09334 8.64274 7.25537 8.66201L7.33337 8.66668V10.6667L7.33804 10.7447C7.35559 10.8935 7.42276 11.032 7.52872 11.138C7.63467 11.244 7.77323 11.3111 7.92204 11.3287L8.00004 11.3333H8.66671L8.74471 11.3287C8.89352 11.3111 9.03208 11.244 9.13803 11.138C9.24399 11.032 9.31116 10.8935 9.32871 10.7447L9.33337 10.6667L9.32871 10.5887C9.31277 10.4527 9.25533 10.3249 9.1642 10.2226C9.07307 10.1204 8.95267 10.0487 8.81937 10.0173L8.74471 10.004L8.66671 10V8.00001L8.66204 7.92201C8.64449 7.7732 8.57732 7.63464 8.47137 7.52868C8.36541 7.42273 8.22685 7.35556 8.07804 7.33801L8.00004 7.33334ZM8.00671 5.33334L7.92204 5.33801C7.76001 5.35728 7.61067 5.43531 7.50232 5.55732C7.39396 5.67933 7.33412 5.83684 7.33412 6.00001C7.33412 6.16319 7.39396 6.32069 7.50232 6.4427C7.61067 6.56471 7.76001 6.64274 7.92204 6.66201L8.00004 6.66668L8.08471 6.66201C8.24674 6.64274 8.39608 6.56471 8.50443 6.4427C8.61279 6.32069 8.67263 6.16319 8.67263 6.00001C8.67263 5.83684 8.61279 5.67933 8.50443 5.55732C8.39608 5.43531 8.24674 5.35728 8.08471 5.33801L8.00671 5.33334Z"
                      fill="white"
                    />
                  </svg>
                  <span className="text-white opacity-50">Select text to add comment</span>
                </div>
                
                <EditorContent
                  editor={editor}
                  className="tiptap-editor-content prose prose-invert max-w-none"
                />
                
                {/* Bubble Menu for Comments */}
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Toolbar */}
      <div className="absolute bg-[rgb(34,34,34)] bottom-[15.2px] box-border content-stretch flex gap-[12px] items-center left-1/2 p-[4px] rounded-[16px] -translate-x-1/2 shadow-[0_0_80px_rgba(0,0,0,1)]">
        {/* Alignment Group */}
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
          <ToolbarButton
            icon={imgTablerIconAlignLeft}
            alt="Align left"
            active={editor.isActive({ textAlign: 'left' }) || (!editor.isActive({ textAlign: 'center' }) && !editor.isActive({ textAlign: 'right' }))}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
          />
          <ToolbarButton
            icon={imgTablerIconAlignCenter}
            alt="Align center"
            active={editor.isActive({ textAlign: 'center' })}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
          />
          <ToolbarButton
            icon={imgTablerIconAlignRight}
            alt="Align right"
            active={editor.isActive({ textAlign: 'right' })}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
          />
        </div>

        <ToolbarDivider />

        {/* Text Formatting Group */}
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
          <ToolbarButton
            icon={imgTablerIconBold}
            alt="Bold"
            active={editor.isActive('bold')}
            onClick={() => editor.chain().focus().toggleBold().run()}
          />
          <ToolbarButton
            icon={imgTablerIconItalic}
            alt="Italic"
            active={editor.isActive('italic')}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          />
          <ToolbarButton
            icon={imgTablerIconUnderline}
            alt="Underline"
            active={editor.isActive('underline')}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          />
        </div>

        <ToolbarDivider />

        {/* Heading Group */}
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
          <ToolbarButton
            icon={imgTablerIconH1}
            alt="Heading 1"
            active={editor.isActive('inlineH1')}
            onClick={() => editor.chain().focus().toggleInlineH1().run()}
          />
          <ToolbarButton
            icon={imgTablerIconH2}
            alt="Heading 2"
            active={editor.isActive('inlineH2')}
            onClick={() => editor.chain().focus().toggleInlineH2().run()}
          />
          <ToolbarButton
            icon={imgTablerIconH3}
            alt="Heading 3"
            active={editor.isActive('inlineH3')}
            onClick={() => editor.chain().focus().toggleInlineH3().run()}
          />
          <ToolbarButton
            icon={imgTablerIconPilcrow}
            alt="Paragraph"
            active={!editor.isActive('inlineH1') && !editor.isActive('inlineH2') && !editor.isActive('inlineH3')}
            onClick={() => {
              editor.chain().focus().unsetMark('inlineH1').unsetMark('inlineH2').unsetMark('inlineH3').run()
            }}
          />
        </div>
      </div>
    </div>
  )
}
