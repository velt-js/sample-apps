import React from 'react'
import { EditorToolbarProps } from '../types'
import { ToolbarButton } from './ToolbarButton'
import { ToolbarDivider } from './ToolbarDivider'
import {
  imgTablerIconAlignLeft,
  imgTablerIconAlignCenter,
  imgTablerIconAlignRight,
  imgTablerIconBold,
  imgTablerIconItalic,
  imgTablerIconUnderline,
  imgTablerIconStrikethrough,
  imgTablerIconH1,
  imgTablerIconH2,
  imgTablerIconH3,
  imgTablerIconPilcrow,
} from '../constants'

export const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor }) => {
  return (
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
          icon={imgTablerIconStrikethrough}
          alt="Strikethrough"
          active={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
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
  )
}
