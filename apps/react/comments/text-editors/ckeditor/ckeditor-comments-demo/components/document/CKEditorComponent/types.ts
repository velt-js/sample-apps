export interface CKEditorComponentProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>
}

export interface ToolbarButtonProps {
  icon: string
  alt: string
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>
  active?: boolean
}

export type CKEditorInlineStyle = 'BOLD' | 'ITALIC' | 'UNDERLINE' | 'STRIKETHROUGH'
