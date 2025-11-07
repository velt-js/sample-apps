import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { FORMAT_TEXT_COMMAND, TextFormatType } from 'lexical'
import { $getSelection, $isRangeSelection } from 'lexical'

export function FormattingPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    // Register keyboard shortcuts
    return editor.registerCommand(
      FORMAT_TEXT_COMMAND,
      (payload: TextFormatType) => {
        editor.update(() => {
          const selection = $getSelection()
          if ($isRangeSelection(selection)) {
            selection.formatText(payload)
          }
        })
        return true
      },
      1
    )
  }, [editor])

  return null
}
