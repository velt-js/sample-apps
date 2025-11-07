import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getSelection, $isRangeSelection, $isElementNode, LexicalNode, LexicalEditor, ElementFormatType } from 'lexical'

export type TextAlignment = 'left' | 'center' | 'right' | 'justify'

export function TextAlignPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    // Plugin initialization if needed
  }, [editor])

  return null
}

export function setTextAlignment(editor: LexicalEditor, alignment: TextAlignment) {
  editor.update(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const nodes = selection.getNodes()
      nodes.forEach((node) => {
        let parent: LexicalNode | null = node.getParent()
        while (parent && !$isElementNode(parent)) {
          parent = parent.getParent()
        }
        if (parent && $isElementNode(parent)) {
          const writable = parent.getWritable()
          writable.setFormat(alignment as ElementFormatType)
        }
      })
    }
  })
}

export function getTextAlignment(editor: LexicalEditor): TextAlignment {
  let alignment: TextAlignment = 'left'

  editor.getEditorState().read(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const nodes = selection.getNodes()
      if (nodes.length > 0) {
        let parent: LexicalNode | null = nodes[0].getParent()
        while (parent && !$isElementNode(parent)) {
          parent = parent.getParent()
        }
        if (parent && $isElementNode(parent)) {
          const format = parent.getFormatType()
          alignment = (format || 'left') as TextAlignment
        }
      }
    }
  })

  return alignment
}
