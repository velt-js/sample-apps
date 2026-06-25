export interface ProseMirrorComponentProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>
}

export interface ToolbarButtonProps {
  icon: string
  alt: string
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>
  active?: boolean
}

export type ProseMirrorInlineStyle = 'BOLD' | 'ITALIC' | 'UNDERLINE' | 'STRIKETHROUGH'
