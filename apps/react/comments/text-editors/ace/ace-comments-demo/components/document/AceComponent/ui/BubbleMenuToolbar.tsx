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
  x: number
  y: number
  onAddComment: () => void
  onBold: () => void
  onItalic: () => void
  onStrikethrough: () => void
  onUnderline: () => void
  onMouseDown: () => void
}

export const BubbleMenuToolbar: React.FC<BubbleMenuToolbarProps> = ({
  x,
  y,
  onAddComment,
  onBold,
  onItalic,
  onStrikethrough,
  onUnderline,
  onMouseDown,
}) => {
  return (
    <div
      className="bubble-menu rounded-full p-[6px] shadow-[0_0_80px_rgba(0,0,0,0.25)] flex gap-[4px] items-center fixed z-50"
      style={{
        backgroundColor: 'var(--app-surface-hover)',
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translateX(-50%)',
      }}
      onMouseDown={(e) => {
        e.preventDefault()
        onMouseDown()
      }}
    >
      {/* Text Formatting Group */}
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
        <ToolbarButton
          icon={imgTablerIconBold}
          alt="Bold"
          onClick={onBold}
        />
        <ToolbarButton
          icon={imgTablerIconItalic}
          alt="Italic"
          onClick={onItalic}
        />
        <ToolbarButton
          icon={imgTablerIconStrikethrough}
          alt="Strikethrough"
          onClick={onStrikethrough}
        />
        <ToolbarButton
          icon={imgTablerIconUnderline}
          alt="Underline"
          onClick={onUnderline}
        />
      </div>

      <ToolbarDivider />

      {/* Comment Button */}
      <button
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
