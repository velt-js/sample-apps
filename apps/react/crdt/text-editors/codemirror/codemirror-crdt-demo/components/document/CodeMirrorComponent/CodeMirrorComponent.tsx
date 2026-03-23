'use client'

import { useEffect, useRef } from 'react'
import { useCollaboration } from "@veltdev/codemirror-crdt-react"
import { yCollab } from "y-codemirror.next"
import { EditorState } from "@codemirror/state"
import { basicSetup, EditorView } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { css } from "@codemirror/lang-css"
import { html } from "@codemirror/lang-html"
import { oneDark } from "@codemirror/theme-one-dark"

// Initial content for the editor
const initialContent = `@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(0.98 0.005 85);
  --foreground: oklch(0.25 0.01 85);
  --card: oklch(0.99 0.003 85);
  --card-foreground: oklch(0.25 0.01 85);
  --popover: oklch(0.99 0.003 85);
  --popover-foreground: oklch(0.25 0.01 85);
  --primary: oklch(0.25 0.01 85);
  --primary-foreground: oklch(0.98 0.005 85);
  --secondary: oklch(0.92 0.008 85);
  --secondary-foreground: oklch(0.25 0.01 85);
  --muted: oklch(0.55 0.015 85);
  --muted-foreground: oklch(0.55 0.015 85);
  --accent: oklch(0.92 0.008 85);
  --accent-foreground: oklch(0.25 0.01 85);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.98 0.005 85);
  --border: oklch(0.9 0.008 85);
  --input: oklch(0.9 0.008 85);
  --ring: oklch(0.25 0.01 85);
  --radius: 0rem;
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.882 0.01 0);
  --sidebar-ring: oklch(0.225 0 0);
}
`

export default function CodeMirrorComponent() {
  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)

  // Initialize the Velt CRDT extension
  const { primitives, isLoading, isSynced, status, error } = useCollaboration({
    editorId: 'codemirror-editor-1',
    initialContent: initialContent,
    onError: (err) => console.error('Collaboration error:', err),
  })

  useEffect(() => {
    if (!primitives?.ytext || !editorRef.current) return

    // Clean up existing view if any
    if (viewRef.current) {
      viewRef.current.destroy()
      viewRef.current = null
    }

    const startState = EditorState.create({
      // primitives.ytext is the shared Yjs Text document that syncs across all collaborators
      // toString() converts it to a plain string for the initial editor content
      doc: primitives.ytext.toString(),
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
        // - primitives.ytext: The shared Yjs Text document that automatically syncs changes
        // - primitives.awareness: Provides presence information (cursors, selections) for other users
        // - primitives.undoManager: Enables collaborative undo/redo that respects all users' changes
        yCollab(primitives.ytext!, primitives.awareness, {
          undoManager: primitives.undoManager || false
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
  }, [primitives])

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-[#1e1e1e]">
        <div className="text-red-400">
          <p className="text-lg font-semibold">Failed to initialize editor</p>
          <p className="text-sm mt-2 opacity-75">{error.message}</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-[#1e1e1e]">
        <div className="text-white">Loading editor...</div>
      </div>
    )
  }

  return (
    <div className="h-full w-full overflow-hidden bg-[#1e1e1e] flex flex-col">
      <div ref={editorRef} className="flex-1 min-h-0" style={{ overflow: 'auto' }} />
      <div className="flex items-center gap-3 px-3 py-1 text-xs font-mono border-t border-[#333]"
        style={{ backgroundColor: '#1a1a1a', color: '#858585' }}>
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{
              backgroundColor:
                status === 'connected' ? '#4ec9b0' :
                status === 'connecting' ? '#dcdcaa' :
                '#f14c4c',
            }}
          />
          {status}
        </span>
        <span className="opacity-40">|</span>
        <span>{isSynced ? 'Synced' : 'Syncing\u2026'}</span>
      </div>
    </div>
  )
}
