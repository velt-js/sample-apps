'use client'

import { useEffect, useRef } from 'react'
import { useVeltCodeMirrorCrdtExtension } from "@veltdev/codemirror-crdt-react"
import { yCollab } from "y-codemirror.next"
import { EditorState } from "@codemirror/state"
import { basicSetup, EditorView } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { css } from "@codemirror/lang-css"
import { html } from "@codemirror/lang-html"
import { oneDark } from "@codemirror/theme-one-dark"

// Initial content for the editor
const initialContent = `// Start coding here...
`

export default function CodeMirrorComponent() {
  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)

  // Initialize the Velt CRDT extension
  const { store, isLoading } = useVeltCodeMirrorCrdtExtension({
    editorId: 'codemirror-editor-1',
    initialContent: initialContent
  })

  useEffect(() => {
    if (!store || !editorRef.current) return

    // Clean up existing view if any
    if (viewRef.current) {
      viewRef.current.destroy()
      viewRef.current = null
    }

    const startState = EditorState.create({
      // store.getYText() returns the shared Yjs Text document that syncs across all collaborators
      // toString() converts it to a plain string for the initial editor content
      doc: store.getYText()?.toString() ?? '',
      extensions: [
        basicSetup,
        oneDark,
        css(),
        javascript(),
        html(),
        EditorView.theme({
          "&": {
            height: "100%",
            fontSize: "14px",
            backgroundColor: "#1e1e1e"
          },
          ".cm-scroller": {
            overflow: "auto",
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace"
          },
          ".cm-content": {
            caretColor: "#fff",
            padding: "10px 0"
          },
          ".cm-line": {
            padding: "0 8px"
          },
          ".cm-gutters": {
            backgroundColor: "#1e1e1e",
            color: "#858585",
            border: "none"
          },
          ".cm-activeLineGutter": {
            backgroundColor: "#2a2a2a"
          },
          ".cm-activeLine": {
            backgroundColor: "#2a2a2a"
          }
        }),
        // yCollab enables real-time collaborative editing with CodeMirror using Yjs
        // - store.getYText(): The shared Yjs Text document that automatically syncs changes
        // - store.getAwareness(): Provides presence information (cursors, selections) for other users
        // - store.getUndoManager(): Enables collaborative undo/redo that respects all users' changes
        yCollab(store.getYText()!, store.getAwareness(), {
          undoManager: store.getUndoManager()
        }),
      ],
    })

    viewRef.current = new EditorView({
      state: startState,
      parent: editorRef.current,
    })

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy()
        viewRef.current = null
      }
    }
  }, [store])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-[#1e1e1e]">
        <div className="text-white">Loading editor...</div>
      </div>
    )
  }

  return (
    <div className="h-full w-full overflow-hidden bg-[#1e1e1e]">
      <div ref={editorRef} className="h-full w-full" style={{ overflow: 'auto' }} />
    </div>
  )
}
