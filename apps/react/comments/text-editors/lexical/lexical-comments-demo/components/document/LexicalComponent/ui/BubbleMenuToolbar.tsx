import React, { useState, useEffect } from 'react'
import { LexicalEditor } from 'lexical'
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical'
import { ToolbarButton } from './ToolbarButton'
import { ToolbarDivider } from './ToolbarDivider'
import {
  imgTablerIconBold,
  imgTablerIconItalic,
  imgTablerIconStrikethrough,
  imgTablerIconUnderline,
} from '../constants'

interface BubbleMenuToolbarProps {
  editor: LexicalEditor
  onAddComment: () => void
}

export const BubbleMenuToolbar: React.FC<BubbleMenuToolbarProps> = ({ editor, onAddComment }) => {
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
  })

  useEffect(() => {
    const updateFormats = () => {
      editor.getEditorState().read(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          setActiveFormats({
            bold: selection.hasFormat('bold'),
            italic: selection.hasFormat('italic'),
            underline: selection.hasFormat('underline'),
            strikethrough: selection.hasFormat('strikethrough'),
          })
        }
      })
    }

    updateFormats()
    return editor.registerUpdateListener(updateFormats)
  }, [editor])

  const toggleFormat = (format: 'bold' | 'italic' | 'underline' | 'strikethrough') => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)
  }

  return (
    <div className="bubble-menu bg-[rgb(34,34,34)] rounded-full p-[6px] shadow-[0_0_80px_rgba(0,0,0,1)] flex gap-[4px] items-center">
      {/* Text Formatting Group */}
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
        <ToolbarButton
          icon={imgTablerIconBold}
          alt="Bold"
          active={activeFormats.bold}
          onClick={() => toggleFormat('bold')}
        />
        <ToolbarButton
          icon={imgTablerIconItalic}
          alt="Italic"
          active={activeFormats.italic}
          onClick={() => toggleFormat('italic')}
        />
        <ToolbarButton
          icon={imgTablerIconStrikethrough}
          alt="Strikethrough"
          active={activeFormats.strikethrough}
          onClick={() => toggleFormat('strikethrough')}
        />
        <ToolbarButton
          icon={imgTablerIconUnderline}
          alt="Underline"
          active={activeFormats.underline}
          onClick={() => toggleFormat('underline')}
        />
      </div>

      <ToolbarDivider />

      {/* Comment Button */}
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onAddComment()
        }}
        className="flex items-center justify-center p-[6px] hover:bg-white/10 rounded-full transition-all cursor-pointer"
        title="Add comment"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white">
          <path
            d="M10 17.25H4C3.30964 17.25 2.75 16.6904 2.75 16V10C2.75 5.99594 5.99594 2.75 10 2.75C14.0041 2.75 17.25 5.99594 17.25 10C17.25 14.0041 14.0041 17.25 10 17.25Z"
            strokeWidth="1.5"
          />
        </svg>
      </button>
    </div>
  )
}
