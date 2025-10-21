import { Editor } from '@tiptap/react'

export interface TipTapComponentProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement>
}

export interface ToolbarButtonProps {
  icon: string
  alt: string
  onClick?: () => void
  active?: boolean
}

export interface EditorContentAreaProps {
  editor: Editor
  hasSelection: boolean
  addTiptapVeltComment: () => void
}

export interface EditorToolbarProps {
  editor: Editor
}
