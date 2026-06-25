export interface TinyMCEComponentProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>
}

export interface ToolbarButtonProps {
  icon: string
  alt: string
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>
  active?: boolean
}

export type TinyMCEInlineStyle = 'BOLD' | 'ITALIC' | 'UNDERLINE' | 'STRIKETHROUGH'
