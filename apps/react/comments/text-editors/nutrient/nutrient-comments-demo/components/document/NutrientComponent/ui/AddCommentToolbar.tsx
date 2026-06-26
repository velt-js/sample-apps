import type { AddCommentToolbarProps } from '../types'

export function AddCommentToolbar({
  onAddComment,
  position,
}: AddCommentToolbarProps) {
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
        className="flex items-center gap-2 rounded-full bg-[#6366f1] py-[10px] pl-[14px] pr-[18px] text-white shadow-[0_8px_24px_rgba(79,70,229,0.45),0_2px_6px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#4f46e5]"
        data-testid="add-comment-bubble"
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          onAddComment()
        }}
        onMouseDown={(event) => {
          event.preventDefault()
        }}
        title="Add a Velt comment to the selected text"
        type="button"
      >
        <svg
          aria-hidden="true"
          fill="none"
          height="16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="16"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="whitespace-nowrap text-[14px] font-semibold leading-none">
          Add Comment
        </span>
      </button>
    </div>
  )
}
