'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import React from 'react'
import { InlineH1, InlineH2, InlineH3 } from './extensions'
import Header from '../header/header'

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
      className={`box-border content-stretch flex gap-[10px] items-center p-[8px] relative rounded-[12px] shrink-0 cursor-pointer transition-all ${
        active ? 'bg-white' : 'hover:bg-white/10'
      }`}
      onClick={onClick}
    >
      <div className={`relative shrink-0 size-[20px] transition-all ${active ? 'text-[rgb(23,23,23)]' : 'text-white'}`}>
        <img alt={alt} className="block max-w-none size-full" src={icon} />
      </div>
    </div>
  )
}

const ToolbarDivider: React.FC = () => {
  return (
    <div
      className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]"
      style={{ '--transform-inner-width': '12', '--transform-inner-height': '0' } as React.CSSProperties}
    >
      <div className="flex-none rotate-[90deg]">
        <div className="h-0 relative w-[12px]">
          <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
            <img alt="" className="block max-w-none size-full" src={imgLine1} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TiptapEditor() {
  const [, setForceUpdate] = React.useState({})

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
    ],
    content: initialContent,
    immediatelyRender: false,
    onUpdate: () => {
      setForceUpdate({})
    },
    onSelectionUpdate: () => {
      setForceUpdate({})
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="bg-black relative size-full overflow-hidden" data-name="Tiptap / Expanded Toolbar">
      {/* Header with Velt Tools */}
      <Header />

      {/* Document Content - Scrollable */}
      <div className="absolute inset-0 overflow-y-auto pb-20">
        <div className="flex justify-center pt-[51px]">
          <div className="w-[696px]">
            {/* Document Background */}
            <div className="bg-[rgb(17,17,17)] border border-[rgb(20,20,20)] border-solid rounded-[16px] p-[42px_42px_64px_42px] min-h-[880px]">
              {/* Editor Content Container */}
              <div className="w-[558px] mx-auto">
                <EditorContent
                  editor={editor}
                  className="tiptap-editor-content prose prose-invert max-w-none"
                />
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
