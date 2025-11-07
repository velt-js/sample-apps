import { Editor, BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export interface SlateJSComponentProps {
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

type CustomElement = VeltCommentsElement | ParagraphElement

interface VeltCommentsElement {
  type: 'veltComment'
  annotationId: string
  children: CustomText[]
}

interface ParagraphElement {
  type: 'paragraph'
  children: CustomText[]
}

type CustomText = {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  heading?: 'h1' | 'h2' | 'h3'
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}
