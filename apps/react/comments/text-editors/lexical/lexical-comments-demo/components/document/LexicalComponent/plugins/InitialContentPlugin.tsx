import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getRoot, $createParagraphNode, $createTextNode } from 'lexical'
import { $createHeadingSpanNode, HeadingLevel } from '../nodes/HeadingSpanNode'

interface InitialContentPluginProps {
  initialContent: string
}

export function InitialContentPlugin({ initialContent }: InitialContentPluginProps) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    editor.update(() => {
      const root = $getRoot()

      // Clear existing content
      root.clear()

      // Parse HTML content
      const parser = new DOMParser()
      const doc = parser.parseFromString(initialContent, 'text/html')
      const paragraphs = doc.querySelectorAll('p')

      paragraphs.forEach((p) => {
        const paragraph = $createParagraphNode()

        // Process child nodes
        p.childNodes.forEach((childNode) => {
          if (childNode.nodeType === Node.TEXT_NODE) {
            const textContent = childNode.textContent || ''
            if (textContent.trim()) {
              paragraph.append($createTextNode(textContent))
            }
          } else if (childNode.nodeName === 'SPAN') {
            const span = childNode as HTMLSpanElement
            const headingType = span.getAttribute('data-heading') as HeadingLevel | null
            const textContent = span.textContent || ''

            if (headingType && (headingType === 'h1' || headingType === 'h2' || headingType === 'h3') && textContent) {
              // Create a custom heading span node that preserves the data-heading attribute
              const headingNode = $createHeadingSpanNode(textContent, headingType)
              paragraph.append(headingNode)
            } else if (textContent) {
              paragraph.append($createTextNode(textContent))
            }
          } else if (childNode.nodeName === 'BR') {
            paragraph.append($createTextNode('\n'))
          } else if (childNode.nodeName === 'STRONG') {
            const textNode = $createTextNode(childNode.textContent || '')
            textNode.toggleFormat('bold')
            paragraph.append(textNode)
          } else {
            // For any other nodes, just get the text content
            const textContent = childNode.textContent || ''
            if (textContent.trim()) {
              paragraph.append($createTextNode(textContent))
            }
          }
        })

        root.append(paragraph)
      })
    })
  }, [editor, initialContent])

  return null
}
