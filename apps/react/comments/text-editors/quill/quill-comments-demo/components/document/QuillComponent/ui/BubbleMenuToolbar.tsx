import React from 'react'
import { ToolbarButton } from './ToolbarButton'
import { ToolbarDivider } from './ToolbarDivider'
import {
  imgTablerIconBold,
  imgTablerIconItalic,
  imgTablerIconStrikethrough,
  imgTablerIconUnderline,
} from '../constants'

interface BubbleMenuToolbarProps {
  activeFormats: Record<string, boolean>
  onFormat: (format: string) => void
  onAddComment: () => void
  onSaveSelection: () => void
}

export const BubbleMenuToolbar: React.FC<BubbleMenuToolbarProps> = ({ activeFormats, onFormat, onAddComment, onSaveSelection }) => {
  return (
    <div className="bubble-menu rounded-full p-[6px] shadow-[0_0_80px_rgba(0,0,0,0.25)] flex gap-[4px] items-center" style={{ backgroundColor: 'var(--app-surface-hover)' }}>
      {/* Text Formatting Group */}
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
        <ToolbarButton
          icon={imgTablerIconBold}
          alt="Bold"
          active={!!activeFormats.bold}
          onClick={() => onFormat('bold')}
        />
        <ToolbarButton
          icon={imgTablerIconItalic}
          alt="Italic"
          active={!!activeFormats.italic}
          onClick={() => onFormat('italic')}
        />
        <ToolbarButton
          icon={imgTablerIconStrikethrough}
          alt="Strikethrough"
          active={!!activeFormats.strike}
          onClick={() => onFormat('strike')}
        />
        <ToolbarButton
          icon={imgTablerIconUnderline}
          alt="Underline"
          active={!!activeFormats.underline}
          onClick={() => onFormat('underline')}
        />
      </div>

      <ToolbarDivider />

      {/* Comment Button */}
      <button
        onMouseDown={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onSaveSelection()
        }}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onAddComment()
        }}
        className="flex items-center justify-center p-[6px] rounded-full transition-all cursor-pointer"
        style={{ opacity: 0.7 }}
        title="Add comment"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: 'var(--app-text-primary)' }}>
          <path
            d="M10 17.25H4C3.30964 17.25 2.75 16.6904 2.75 16V10C2.75 5.99594 5.99594 2.75 10 2.75C14.0041 2.75 17.25 5.99594 17.25 10C17.25 14.0041 14.0041 17.25 10 17.25Z"
            strokeWidth="1.5"
          />
        </svg>
      </button>
    </div>
  )
}
