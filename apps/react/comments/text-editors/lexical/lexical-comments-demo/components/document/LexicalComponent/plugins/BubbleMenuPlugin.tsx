import { useEffect, useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getSelection, $isRangeSelection, SELECTION_CHANGE_COMMAND } from 'lexical'
import { BubbleMenuToolbar } from '../ui/BubbleMenuToolbar'
import { createPortal } from 'react-dom'

interface BubbleMenuPluginProps {
  onAddComment: () => void
}

export function BubbleMenuPlugin({ onAddComment }: BubbleMenuPluginProps) {
  const [editor] = useLexicalComposerContext()
  const [isTextSelected, setIsTextSelected] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    const updateBubbleMenu = () => {
      editor.getEditorState().read(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection) && !selection.isCollapsed()) {
          const nativeSelection = window.getSelection()
          if (nativeSelection && nativeSelection.rangeCount > 0) {
            const range = nativeSelection.getRangeAt(0)
            const rect = range.getBoundingClientRect()

            setPosition({
              top: rect.top - 50,
              left: rect.left + rect.width / 2,
            })
            setIsTextSelected(true)
          }
        } else {
          setIsTextSelected(false)
        }
      })
    }

    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateBubbleMenu()
        return false
      },
      1
    )
  }, [editor])

  if (!isTextSelected) {
    return null
  }

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: 'translateX(-50%)',
        zIndex: 1000,
      }}
    >
      <BubbleMenuToolbar editor={editor} onAddComment={onAddComment} />
    </div>,
    document.body
  )
}
