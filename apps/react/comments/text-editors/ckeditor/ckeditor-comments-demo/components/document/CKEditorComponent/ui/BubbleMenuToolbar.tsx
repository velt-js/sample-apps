import type { MouseEvent } from 'react'
import {
  imgTablerIconBold,
  imgTablerIconItalic,
  imgTablerIconStrikethrough,
  imgTablerIconUnderline,
} from '../constants'
import type { CKEditorInlineStyle } from '../types'
import { ToolbarButton } from './ToolbarButton'
import { ToolbarDivider } from './ToolbarDivider'

interface BubbleMenuToolbarProps {
  activeStyles: Set<CKEditorInlineStyle>
  onAddComment: () => void
  onToggleStyle: (style: CKEditorInlineStyle) => void
}

export function BubbleMenuToolbar({ activeStyles, onAddComment, onToggleStyle }: BubbleMenuToolbarProps) {
  const handleFormatMouseDown = (event: MouseEvent<HTMLButtonElement>, style: CKEditorInlineStyle) => {
    event.preventDefault()
    onToggleStyle(style)
  }

  const handleCommentMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <div
      className="bubble-menu rounded-full p-[6px] shadow-[0_0_80px_rgba(0,0,0,0.25)] flex gap-[4px] items-center"
      style={{ backgroundColor: 'var(--app-surface-hover)' }}
    >
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
        <ToolbarButton
          icon={imgTablerIconBold}
          alt="Bold"
          active={activeStyles.has('BOLD')}
          onMouseDown={(event) => handleFormatMouseDown(event, 'BOLD')}
        />
        <ToolbarButton
          icon={imgTablerIconItalic}
          alt="Italic"
          active={activeStyles.has('ITALIC')}
          onMouseDown={(event) => handleFormatMouseDown(event, 'ITALIC')}
        />
        <ToolbarButton
          icon={imgTablerIconStrikethrough}
          alt="Strikethrough"
          active={activeStyles.has('STRIKETHROUGH')}
          onMouseDown={(event) => handleFormatMouseDown(event, 'STRIKETHROUGH')}
        />
        <ToolbarButton
          icon={imgTablerIconUnderline}
          alt="Underline"
          active={activeStyles.has('UNDERLINE')}
          onMouseDown={(event) => handleFormatMouseDown(event, 'UNDERLINE')}
        />
      </div>

      <ToolbarDivider />

      <button
        aria-label="Add comment"
        className="flex items-center justify-center p-[6px] rounded-full transition-all cursor-pointer"
        onMouseDown={handleCommentMouseDown}
        onClick={onAddComment}
        style={{ opacity: 0.7 }}
        title="Add comment"
        type="button"
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ stroke: 'var(--app-text-primary)' }}
        >
          <path
            d="M10 17.25H4C3.30964 17.25 2.75 16.6904 2.75 16V10C2.75 5.99594 5.99594 2.75 10 2.75C14.0041 2.75 17.25 5.99594 17.25 10C17.25 14.0041 14.0041 17.25 10 17.25Z"
            strokeWidth="1.5"
          />
        </svg>
      </button>
    </div>
  )
}
