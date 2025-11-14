import { Editor } from '@tiptap/react'

export interface TipTapComponentProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>
}

export interface ToolbarButtonProps {
  icon: string
  alt: string
  onClick?: () => void
  active?: boolean
}

export interface EditorToolbarProps {
  editor: Editor
}
