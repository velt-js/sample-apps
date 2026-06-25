import type { MouseEvent } from 'react'

interface BubbleMenuToolbarProps {
  onAddComment: () => void
}

export function BubbleMenuToolbar({ onAddComment }: BubbleMenuToolbarProps) {
  const handleCommentMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <div
      className="bubble-menu rounded-full p-[6px] shadow-[0_0_80px_rgba(0,0,0,0.25)] flex gap-[4px] items-center"
      style={{ backgroundColor: 'var(--app-surface-hover)' }}
    >
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
