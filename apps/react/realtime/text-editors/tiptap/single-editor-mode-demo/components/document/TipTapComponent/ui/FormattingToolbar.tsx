'use client'

import React from 'react'
import { Editor } from '@tiptap/react'
import EditorRoleChip from '@/components/header/EditorRoleChip'
import {
  imgTablerIconBold,
  imgTablerIconItalic,
  imgTablerIconUnderline,
  imgTablerIconStrikethrough,
  imgTablerIconH1,
  imgTablerIconH2,
  imgTablerIconH3,
  imgTablerIconPilcrow,
  imgTablerIconAlignLeft,
  imgTablerIconAlignCenter,
  imgTablerIconAlignRight,
} from '../constants'

interface FormattingToolbarProps {
  editor: Editor | null
  disabled: boolean
  onAddComment: () => void
}

interface ToolButtonProps {
  icon: string
  alt: string
  active?: boolean
  onClick: () => void
}

function ToolButton({ icon, alt, active, onClick }: ToolButtonProps) {
  return (
    <button
      type="button"
      title={alt}
      onClick={onClick}
      className={`flex items-center justify-center p-[6px] rounded-[8px] transition-all cursor-pointer ${
        active ? 'bg-black/10 dark:bg-white/20' : 'hover:bg-black/5 dark:hover:bg-white/10'
      }`}
    >
      {/* Icons are black SVG strokes; invert to white in dark mode */}
      <img src={icon} alt={alt} className="size-[18px] dark:invert" />
    </button>
  )
}

function Divider() {
  return <div className="w-px h-[20px] mx-[4px]" style={{ backgroundColor: 'var(--app-border, rgba(128,128,128,0.3))' }} />
}

/**
 * Word-style static formatting toolbar above the document page.
 * Disabled (dimmed, input-blocked) for viewers while another user holds the
 * Single Editor Mode editor role; the comment action stays available to everyone.
 */
export function FormattingToolbar({ editor, disabled, onAddComment }: FormattingToolbarProps) {
  if (!editor) return null

  return (
    <div
      className="flex items-center gap-[2px] px-[10px] py-[6px] rounded-[12px] border mb-3 sticky top-0 z-20"
      style={{
        backgroundColor: 'var(--app-surface)',
        borderColor: 'var(--app-surface-border, var(--app-border))',
      }}
    >
      <div
        className="flex items-center gap-[2px]"
        style={disabled ? { opacity: 0.35, pointerEvents: 'none' } : undefined}
      >
        <ToolButton icon={imgTablerIconBold} alt="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} />
        <ToolButton icon={imgTablerIconItalic} alt="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} />
        <ToolButton icon={imgTablerIconUnderline} alt="Underline" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} />
        <ToolButton icon={imgTablerIconStrikethrough} alt="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} />
        <Divider />
        <ToolButton icon={imgTablerIconH1} alt="Heading 1" active={editor.isActive('inlineH1')} onClick={() => editor.chain().focus().toggleInlineH1().run()} />
        <ToolButton icon={imgTablerIconH2} alt="Heading 2" active={editor.isActive('inlineH2')} onClick={() => editor.chain().focus().toggleInlineH2().run()} />
        <ToolButton icon={imgTablerIconH3} alt="Heading 3" active={editor.isActive('inlineH3')} onClick={() => editor.chain().focus().toggleInlineH3().run()} />
        <ToolButton
          icon={imgTablerIconPilcrow}
          alt="Paragraph"
          onClick={() => editor.chain().focus().unsetMark('inlineH1').unsetMark('inlineH2').unsetMark('inlineH3').run()}
        />
        <Divider />
        <ToolButton icon={imgTablerIconAlignLeft} alt="Align left" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} />
        <ToolButton icon={imgTablerIconAlignCenter} alt="Align center" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} />
        <ToolButton icon={imgTablerIconAlignRight} alt="Align right" active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} />
      </div>
      {/* [Velt] Single Editor Mode role chip (claim / request / release), left of the comment button */}
      <div className="ml-auto mr-[10px]">
        <EditorRoleChip />
      </div>
      {/* [Velt] Comment on selected text; available to editors and viewers alike */}
      <button
        type="button"
        title="Add comment"
        onClick={onAddComment}
        className="flex items-center gap-[6px] px-[10px] py-[5px] rounded-[8px] text-[12px] font-medium transition-all cursor-pointer hover:opacity-90"
        style={{ backgroundColor: '#6366f1', color: '#fff' }}
      >
        Comment
      </button>
    </div>
  )
}
