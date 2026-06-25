export interface DraftJSComponentProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>
}

export interface ToolbarButtonProps {
  icon: string
  alt: string
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>
  active?: boolean
}

export type DraftInlineStyle = 'BOLD' | 'ITALIC' | 'UNDERLINE' | 'STRIKETHROUGH'
