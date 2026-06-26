import type React from 'react'

export interface NutrientComponentProps {
  pageNavigatorRef?: React.MutableRefObject<((pageIndex: number) => void) | null>
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>
}

export interface AddCommentBubblePosition {
  left: number
  placement: 'bottom' | 'top'
  top: number
}

export interface AddCommentToolbarProps {
  onAddComment: () => void
  position?: AddCommentBubblePosition | null
}
