'use client'

import { Plate, PlateContent, PlateContainer } from '@platejs/core/react'
import { useCollaboration } from '@veltdev/plate-crdt-react'
import { BoldPlugin, ItalicPlugin, UnderlinePlugin, StrikethroughPlugin, HeadingPlugin } from '@platejs/basic-nodes/react'
import { VeltCommentsPlugin, addComment, renderComments } from '@veltdev/plate-comments-react'
import { useCommentAnnotations } from '@veltdev/react' // [Velt] Hook that listens to comment annotations and provides real-time updates when comments are added/removed
import { useEffect, useCallback, useState, useRef } from 'react'
import { PlateComponentProps } from './types'
import { initialContent } from './constants'
import { useCurrentDocument } from '@/app/document/useCurrentDocument'
import { BubbleMenuToolbar } from './ui/BubbleMenuToolbar'

export default function PlateComponent({ scrollContainerRef }: PlateComponentProps) {
  const { documentId } = useCurrentDocument()

  // [Velt] Initialize CRDT collaboration - returns fully configured Plate editor with cursor tracking
  const { editor, isLoading, isSynced, status } = useCollaboration({
    editorId: documentId || 'default-editor',
    initialContent: initialContent,
    plugins: [BoldPlugin, ItalicPlugin, UnderlinePlugin, StrikethroughPlugin, HeadingPlugin, VeltCommentsPlugin], // [Velt] Registers PlateJS plugins including Velt comments plugin that enables comment markers and selection tracking
    onError: (err: Error) => console.error('[Velt CRDT] Collaboration error:', err),
  })

  const commentAnnotations = useCommentAnnotations() // [Velt] Subscribes to comment data changes and returns array of all active comment annotations

  useEffect(() => {
    if (editor && commentAnnotations?.length) {
      renderComments({ editor, commentAnnotations }) // [Velt] Renders comment highlights and markers in the editor based on annotation positions
    }
  }, [editor, commentAnnotations])

  const addPlateVeltComment = useCallback(() => {
    if (editor) {
      addComment({ editor }) // [Velt] Triggers comment creation flow on selected text in the editor
    }
  }, [editor])

  // Floating toolbar state
  const [toolbarVisible, setToolbarVisible] = useState(false)
  const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 })
  const toolbarRef = useRef<HTMLDivElement>(null)
  const [, forceUpdate] = useState(0)

  const updateToolbar = useCallback(() => {
    const domSel = window.getSelection()
    if (!domSel || domSel.rangeCount === 0 || domSel.isCollapsed) {
      setToolbarVisible(false)
      return
    }

    // Only show toolbar if selection is within our editor
    const range = domSel.getRangeAt(0)
    const editorEl = document.querySelector('.plate-editor-content [data-slate-editor]')
    if (!editorEl || !editorEl.contains(range.commonAncestorContainer)) {
      setToolbarVisible(false)
      return
    }

    const rect = range.getBoundingClientRect()
    if (rect.width === 0) {
      setToolbarVisible(false)
      return
    }

    setToolbarPos({
      top: rect.top - 52,
      left: rect.left + rect.width / 2,
    })
    setToolbarVisible(true)
    forceUpdate(n => n + 1) // trigger re-render for active mark state
  }, [])

  useEffect(() => {
    document.addEventListener('selectionchange', updateToolbar)
    return () => document.removeEventListener('selectionchange', updateToolbar)
  }, [updateToolbar])

  const statusDotColor =
    status === 'connected' ? (isSynced ? '#22c55e' : '#eab308') :
    status === 'connecting' ? '#eab308' : '#ef4444'

  const statusLabel =
    status === 'connected' ? (isSynced ? 'Synced' : 'Syncing…') :
    status === 'connecting' ? 'Connecting…' : 'Disconnected'

  if (isLoading || !editor) return null

  return (
    <div className="relative size-full overflow-hidden" style={{ backgroundColor: 'var(--app-bg)' }} data-name="PlateJS / Floating Toolbar">
      <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-auto pb-20">
        <div className="flex justify-center pt-[51px] px-4">
          <div className="w-full max-w-[850px]">
            {/* [Velt] Real-time connection and sync status from useCollaboration */}
            <div className="flex items-center gap-1.5 mb-2 px-1">
              <span
                className="inline-block size-2 rounded-full shrink-0"
                style={{ backgroundColor: statusDotColor }}
              />
              <span className="text-xs" style={{ color: 'var(--app-text-tertiary)' }}>
                {statusLabel}
              </span>
            </div>
            <div className="border border-solid rounded-[16px] p-[42px_56px_64px_56px] min-h-[880px]" style={{ backgroundColor: 'var(--app-surface)', borderColor: 'var(--app-surface-border)' }}>
              <div className="w-full max-w-[738px]">
                <Plate editor={editor}>
                  <PlateContainer style={{ position: 'relative' }}> {/* PlateContainer with position:relative is required for cursor overlay */}
                    <PlateContent
                      className="plate-editor-content prose prose-invert max-w-none"
                    />
                  </PlateContainer>
                </Plate>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating toolbar - positioned above selection using fixed positioning */}
      {toolbarVisible && editor && (
        <div
          ref={toolbarRef}
          style={{
            position: 'fixed',
            top: toolbarPos.top,
            left: toolbarPos.left,
            transform: 'translateX(-50%)',
            zIndex: 50,
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <BubbleMenuToolbar editor={editor} onAddComment={addPlateVeltComment} />
        </div>
      )}
    </div>
  )
}
