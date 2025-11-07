import { LexicalEditor } from 'lexical'

export interface LexicalComponentProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>
}

export interface ToolbarButtonProps {
  icon: string
  alt: string
  onClick?: () => void
  active?: boolean
}

export interface EditorToolbarProps {
  editor: LexicalEditor
}
