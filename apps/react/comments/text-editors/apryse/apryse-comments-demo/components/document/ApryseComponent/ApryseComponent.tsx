'use client'

import { useEffect, useRef, useState } from 'react'
import type { WebViewerInstance } from '@pdftron/webviewer'
import { useCommentAnnotations } from '@veltdev/react' // [Velt] Hook that listens to comment annotations and provides real-time updates when comments are added/removed
import {
  ApryseVeltComments,
  addComment,
  renderComments,
  type AttachedExtension,
} from '@veltdev/apryse-velt-comments' // [Velt] Apryse extension and utilities for integrating Velt comments into the WebViewer
import { AddCommentToolbar } from './ui/AddCommentToolbar'
import { ApryseComponentProps } from './types'
import { INITIAL_DOC, EDITOR_ID } from './constants'
import { useTheme } from '@/components/theme/ThemeContext'

export default function ApryseComponent({ scrollContainerRef }: ApryseComponentProps) {
  const viewerRef = useRef<HTMLDivElement | null>(null)
  const instanceRef = useRef<WebViewerInstance | null>(null)
  const extensionRef = useRef<AttachedExtension | null>(null)
  const [instance, setInstance] = useState<WebViewerInstance | null>(null)

  const commentAnnotations = useCommentAnnotations() // [Velt] Subscribes to comment data changes and returns array of all active comment annotations
  const { resolvedTheme } = useTheme() // App light/dark state, driven by the header ThemeToggle

  useEffect(() => {
    if (!viewerRef.current || instanceRef.current) return

    let cancelled = false

    // WebViewer is imported dynamically so it only loads in the browser
    // (it touches the DOM and cannot run during server-side rendering).
    import('@pdftron/webviewer').then(({ default: WebViewer }) => {
      if (cancelled || !viewerRef.current || instanceRef.current) return

      WebViewer(
        {
          path: 'lib/webviewer', // Apryse assets served from /public/lib/webviewer
          licenseKey:
            process.env.NEXT_PUBLIC_APRYSE_LICENSE_KEY || 'YOUR_LICENSE_KEY',
          initialDoc: INITIAL_DOC,
          initialMode: 'docxEditor',
        },
        viewerRef.current,
      ).then((webViewerInstance) => {
        if (cancelled) return

        instanceRef.current = webViewerInstance

        // [Velt] Attach the Apryse <> Velt comments extension to the WebViewer
        // instance. This enables comment markers and selection tracking.
        extensionRef.current = ApryseVeltComments.configure({
          editorId: EDITOR_ID,
        }).attach(webViewerInstance)

        setInstance(webViewerInstance)
      })
    })

    return () => {
      cancelled = true
      extensionRef.current?.detach()
      extensionRef.current = null
      instanceRef.current = null
      setInstance(null)
    }
  }, [])

  useEffect(() => {
    if (!instance) return
    // [Velt] Renders comment highlights in the WebViewer based on annotation positions
    renderComments({ instance, commentAnnotations: commentAnnotations ?? [] })
  }, [instance, commentAnnotations])

  // [Apryse] Sync the WebViewer's built-in UI theme with the app's light/dark
  // toggle. The viewer renders in its own iframe, so it does NOT inherit the
  // host page's `.dark` class — its theme must be set explicitly via the UI API.
  useEffect(() => {
    if (!instance) return
    const { UI } = instance
    UI.setTheme(resolvedTheme === 'dark' ? UI.Theme.DARK : UI.Theme.LIGHT)
  }, [instance, resolvedTheme])

  const addApryseVeltComment = async () => {
    if (!instance) return
    // [Velt] Triggers comment creation flow on the selected text in the WebViewer
    const result = await addComment({ instance })
    if (!result) {
      console.warn(
        '[Apryse] Add comment failed — make sure you are logged in and have text selected',
      )
    }
  }

  return (
    <div
      className="relative size-full overflow-hidden"
      style={{ backgroundColor: 'var(--app-bg)' }}
      data-name="Apryse / Editor"
    >
      <div ref={scrollContainerRef} className="absolute inset-0">
        <div className="apryse-webviewer size-full" ref={viewerRef} />
      </div>

      {instance && <AddCommentToolbar onAddComment={addApryseVeltComment} />}
    </div>
  )
}
