import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

export function HeadingPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    // Plugin logic if needed
  }, [editor])

  return null
}
