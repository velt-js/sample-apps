'use client'

import { useEffect, useRef } from 'react'
import { useCollaboration } from "@veltdev/codemirror-crdt-react"
import { yCollab } from "y-codemirror.next"
import { EditorState, Compartment } from "@codemirror/state"
import { basicSetup, EditorView } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { css } from "@codemirror/lang-css"
import { html } from "@codemirror/lang-html"
import { oneDark } from "@codemirror/theme-one-dark"
import { useTheme } from '@/components/theme/ThemeContext'

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

/** Light theme for CodeMirror editor */
function lightEditorTheme() {
  return EditorView.theme({
    "&": {
      height: "100%",
      fontSize: "14px",
      backgroundColor: "#ffffff"
    },
    ".cm-scroller": {
      overflow: "auto",
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace"
    },
    ".cm-content": {
      caretColor: "#24292f",
      padding: "10px 0"
    },
    ".cm-line": {
      padding: "0 8px"
    },
    ".cm-gutters": {
      backgroundColor: "#f6f8fa",
      color: "#656d76",
      border: "none",
      borderRight: "1px solid #d1d9e0"
    },
    ".cm-activeLineGutter": {
      backgroundColor: "#f0f6ff"
    },
    ".cm-activeLine": {
      backgroundColor: "rgba(84, 174, 255, 0.08)"
    }
  })
}

/** Dark theme for CodeMirror editor (includes oneDark syntax) */
function darkEditorTheme() {
  return [
    oneDark,
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
  ]
}

export default function CodeMirrorComponent() {
  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const themeCompartmentRef = useRef(new Compartment())
  const { resolvedTheme } = useTheme()

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

    const themeCompartment = themeCompartmentRef.current
    const initialThemeExtension = resolvedTheme === 'dark' ? darkEditorTheme() : lightEditorTheme()

    const startState = EditorState.create({
      // primitives.ytext is the shared Yjs Text document that syncs across all collaborators
      // toString() converts it to a plain string for the initial editor content
      doc: primitives.ytext.toString(),
      extensions: [
        basicSetup,
        themeCompartment.of(initialThemeExtension),
        css(),
        javascript(),
        html(),
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

  // Reconfigure theme when resolvedTheme changes
  useEffect(() => {
    if (!viewRef.current) return
    const newThemeExtension = resolvedTheme === 'dark' ? darkEditorTheme() : lightEditorTheme()
    viewRef.current.dispatch({
      effects: themeCompartmentRef.current.reconfigure(newThemeExtension),
    })
  }, [resolvedTheme])

  if (error) {
    return (
      <div className="flex items-center justify-center h-full" style={{ backgroundColor: 'var(--app-filetree-bg)' }}>
        <div className="text-red-400">
          <p className="text-lg font-semibold">Failed to initialize editor</p>
          <p className="text-sm mt-2 opacity-75">{error.message}</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full" style={{ backgroundColor: 'var(--app-filetree-bg)' }}>
        <div style={{ color: 'var(--app-text-primary)' }}>Loading editor...</div>
      </div>
    )
  }

  return (
    <div className="h-full w-full overflow-hidden flex flex-col">
      <div ref={editorRef} className="flex-1 min-h-0" style={{ overflow: 'auto' }} />
      <div className="flex items-center gap-3 px-3 py-1 text-xs font-mono"
        style={{ backgroundColor: 'var(--app-surface)', color: 'var(--app-text-tertiary)', borderTop: '1px solid var(--app-border)' }}>
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
