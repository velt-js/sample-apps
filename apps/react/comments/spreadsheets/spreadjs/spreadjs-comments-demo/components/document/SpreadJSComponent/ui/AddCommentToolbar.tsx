import React from 'react'
import { AddCommentToolbarProps } from '../types'

export const AddCommentToolbar: React.FC<AddCommentToolbarProps> = ({
  onAddComment,
  position,
}) => {
  if (!position) return null

  return (
    <div
      className="fixed z-[80] -translate-x-1/2"
      style={{
        left: position.left,
        top: position.top,
        transform:
          position.placement === 'top'
            ? 'translate(-50%, -100%)'
            : 'translate(-50%, 0)',
      }}
    >
      <button
        data-testid="add-comment-bubble"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onAddComment()
        }}
        onMouseDown={(event) => {
          event.preventDefault()
        }}
        className="flex items-center gap-[8px] pl-[14px] pr-[18px] py-[10px] rounded-full cursor-pointer transition-colors bg-[#6366f1] hover:bg-[#4f46e5] shadow-[0_8px_24px_rgba(79,70,229,0.45),0_2px_6px_rgba(0,0,0,0.2)] outline-none focus:outline-none focus-visible:outline-none"
        style={{ border: 'none', outline: 'none' }}
        title="Add a Velt comment to the selected cell or range"
        type="button"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ stroke: '#ffffff' }}
        >
          <path
            d="M10 17.25H4C3.30964 17.25 2.75 16.6904 2.75 16V10C2.75 5.99594 5.99594 2.75 10 2.75C14.0041 2.75 17.25 5.99594 17.25 10C17.25 14.0041 14.0041 17.25 10 17.25Z"
            strokeWidth="1.5"
          />
        </svg>
        <span className="text-[14px] font-semibold text-white whitespace-pre">
          Add Comment
        </span>
      </button>
    </div>
  )
}
