import type React from 'react'

export interface MonacoNavigator {
  scrollToHeading: (headingText: string) => void
}

export interface MonacoComponentProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>
  registerNavigator?: (navigator: MonacoNavigator | null) => void
}

export interface ToolbarButtonProps {
  icon: string
  alt: string
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>
  active?: boolean
}
