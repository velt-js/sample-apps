import type { RefObject } from 'react'

export interface SuperDocComponentProps {
  scrollContainerRef?: RefObject<HTMLDivElement | null>
}

export interface AddCommentBubblePosition {
  left: number
  placement: 'bottom' | 'top'
  top: number
}

export interface AddCommentToolbarProps {
  onAddComment: () => void
  position: AddCommentBubblePosition | null
}
