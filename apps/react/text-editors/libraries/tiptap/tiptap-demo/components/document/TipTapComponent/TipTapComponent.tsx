'use client'

import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import React, { useEffect, useState, useRef } from 'react'
import { InlineH1, InlineH2, InlineH3 } from './extensions'
import { TiptapVeltComments, addComment, renderComments } from '@veltdev/tiptap-velt-comments'
import { useCommentAnnotations, useLiveState, useVeltInitState } from '@veltdev/react'
import { EditorToolbar } from './ui/EditorToolbar'
import { EditorContentArea } from './ui/EditorContentArea'
import { TipTapComponentProps } from './types'
import { initialContent } from './constants'
import { useCurrentDocument } from '@/app/document/useCurrentDocument'

export default function TipTapComponent({ scrollContainerRef }: TipTapComponentProps) {
  // Get current document ID to scope all storage per document
  const { documentId } = useCurrentDocument()

  const [, setForceUpdate] = useState({})
  const [hasSelection, setHasSelection] = useState(false)

  // Track if we're rendering comments to prevent saving during renderComments
  const isRenderingComments = useRef(false)

  // Track last synced content to prevent infinite loops
  const lastSyncedContent = useRef<string>('')

  // Track if user is actively typing to prevent content sync from interrupting
  const isUserTyping = useRef(false)
  const typingTimeout = useRef<NodeJS.Timeout | null>(null)

  // Wait for Velt to initialize before rendering editor
  const veltInitialized = useVeltInitState()

  // Load initial content - will be updated when documentId is available
  const [localContent, setLocalContent] = useState<string>(initialContent)

  // Track if this is the first load to prevent Velt from overwriting localStorage
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  // Scope storage keys per document so each document has its own content
  const STORAGE_KEY = `tiptap-editor-content-${documentId}`
  const LIVE_STATE_KEY = `tiptap-editor-content-${documentId}`

  // Use Velt Live State for real-time sync (optional, fallback to localStorage)
  // IMPORTANT: Key is scoped per document so each document has separate live state
  const [editorContent, setEditorContent] = useLiveState<string>(
    LIVE_STATE_KEY,
    localContent,
    { syncDuration: 500 } // Debounce syncing for 500ms
  )

  // Load content when document ID becomes available or changes
  useEffect(() => {
    if (documentId && documentId !== 'loading') {
      console.log('[TipTap] Document changed to:', documentId)
      const storageKey = `tiptap-editor-content-${documentId}`
      let saved = localStorage.getItem(storageKey)

      // CRITICAL: Strip out velt-comment-text tags if they exist in saved content
      // These tags are added by renderComments() but shouldn't be persisted
      if (saved && saved.includes('<velt-comment-text')) {
        console.warn('[TipTap] Cleaning up velt-comment-text tags from saved content')
        saved = saved.replace(/<velt-comment-text[^>]*>/g, '').replace(/<\/velt-comment-text>/g, '')
        // Save the cleaned version back to localStorage
        localStorage.setItem(storageKey, saved)
      }

      const content = saved || initialContent
      console.log('[TipTap] Loading content for document:', documentId, saved ? 'Found saved' : 'Using initial')

      setLocalContent(content)
      setIsFirstLoad(true)
    }
  }, [documentId])

  // After first render, mark as not first load
  useEffect(() => {
    if (isFirstLoad) {
      const timer = setTimeout(() => {
        setIsFirstLoad(false)
        console.log('[TipTap] First load complete, enabling Velt sync')
      }, 2000) // Wait 2 seconds for Velt to settle
      return () => clearTimeout(timer)
    }
  }, [isFirstLoad])

  // Prevent scroll jumping on initial load - keep scroll at top
  useEffect(() => {
    const scrollContainer = scrollContainerRef?.current
    if (scrollContainer && veltInitialized) {
      // Reset scroll to top on initial load
      scrollContainer.scrollTop = 0

      // Also prevent any scroll jumps during first few seconds after load
      const preventScrollJump = () => {
        if (scrollContainer.scrollTop > 100) {
          console.log('[TipTap] Preventing unexpected scroll jump, resetting to top')
          scrollContainer.scrollTop = 0
        }
      }

      // Check periodically during first 3 seconds
      const intervals = [100, 300, 500, 1000, 1500, 2000, 3000].map(delay =>
        setTimeout(preventScrollJump, delay)
      )

      return () => intervals.forEach(clearTimeout)
    }
  }, [veltInitialized, scrollContainerRef])

  // Debug logging
  useEffect(() => {
    console.log('[TipTap] Velt initialized:', veltInitialized)
    console.log('[TipTap] Editor content loaded:', editorContent ? 'Yes' : 'No', editorContent?.substring(0, 100))
  }, [veltInitialized, editorContent])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // Disable default heading nodes
      }),
      TextAlign.configure({
        types: ['paragraph'],
      }),
      Underline,
      InlineH1,
      InlineH2,
      InlineH3,
      TiptapVeltComments.configure({
        persistVeltMarks: true, // CRITICAL: Persist Velt marks in HTML to prevent content loss
      }),
    ],
    content: localContent,
    immediatelyRender: false,
    onCreate: ({ editor }) => {
      console.log('[TipTap] ===== EDITOR CREATED =====')
      console.log('[TipTap] Initial content HTML:', editor.getHTML())
      console.log('[TipTap] Initial content length:', editor.getHTML().length)
      console.log('[TipTap] ========================')
    },
    onUpdate: ({ editor }) => {
      // CRITICAL: Don't save when renderComments is modifying the editor
      // renderComments adds <velt-comment-text> tags which TipTap can't parse on refresh
      if (isRenderingComments.current) {
        console.log('[TipTap] Skipping save - renderComments is active')
        return
      }

      // Mark that user is typing to prevent sync from interrupting
      isUserTyping.current = true

      // Clear existing timeout and set new one
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current)
      }

      // After 1 second of no typing, mark as not typing
      typingTimeout.current = setTimeout(() => {
        isUserTyping.current = false
      }, 1000)

      // Get HTML and strip out velt-comment-text tags before saving
      let html = editor.getHTML()

      // Check if HTML contains velt-comment-text tags (shouldn't happen, but be safe)
      if (html.includes('<velt-comment-text')) {
        console.warn('[TipTap] WARNING: HTML contains velt-comment-text tags, stripping them out')
        // Strip out velt-comment-text wrappers but keep the content inside
        html = html.replace(/<velt-comment-text[^>]*>/g, '').replace(/<\/velt-comment-text>/g, '')
      }

      console.log('[TipTap] ===== SAVING CONTENT =====')
      console.log('[TipTap] Document ID:', documentId)
      console.log('[TipTap] Storage Key:', STORAGE_KEY)
      console.log('[TipTap] HTML length:', html.length)
      console.log('[TipTap] HTML preview:', html.substring(0, 200))
      console.log('[TipTap] Contains velt tags:', html.includes('<velt-comment'))
      console.log('[TipTap] ========================')

      // Primary storage: localStorage (immediate, reliable)
      // CRITICAL: Never save velt-comment-text tags to localStorage
      localStorage.setItem(STORAGE_KEY, html)
      setLocalContent(html)

      // Secondary storage: Velt (for real-time sync across users/tabs)
      setEditorContent(html)

      // Remember this content to prevent sync loop when it comes back from Velt
      lastSyncedContent.current = html

      // Don't force re-render during typing - let React handle it naturally
      // setForceUpdate({})
    },
    onSelectionUpdate: ({ editor }) => {
      // Track if text is selected
      const { from, to } = editor.state.selection
      setHasSelection(from !== to)
      // Don't force re-render - let React handle it naturally
    },
  })

  // Update editor when localContent changes (e.g., document switch)
  useEffect(() => {
    // Don't update content while user is typing
    if (isUserTyping.current) {
      return
    }

    if (editor && localContent && documentId && documentId !== 'loading') {
      const currentContent = editor.getHTML()

      // Normalize both strings for comparison (remove whitespace differences)
      const normalizedCurrent = currentContent.replace(/\s+/g, ' ').trim()
      const normalizedNew = localContent.replace(/\s+/g, ' ').trim()

      if (normalizedCurrent !== normalizedNew) {
        console.log('[TipTap] Updating editor with new content for document:', documentId)

        // Save current scroll position and cursor position
        const scrollContainer = scrollContainerRef?.current
        const scrollTop = scrollContainer?.scrollTop || 0
        const { from, to } = editor.state.selection

        // Update content without emitting update event (prevents save loop)
        editor.commands.setContent(localContent, false)

        // Try to restore cursor position if it's still valid
        requestAnimationFrame(() => {
          try {
            const docSize = editor.state.doc.content.size
            if (from <= docSize && to <= docSize) {
              editor.commands.setTextSelection({ from, to })
            }
          } catch (e) {
            // Cursor position is no longer valid, that's ok
          }

          // Restore scroll position
          if (scrollContainer) {
            scrollContainer.scrollTop = scrollTop
          }
        })
      }
    }
  }, [editor, localContent, documentId, scrollContainerRef])

  // Update editor content when Velt Live State changes (from other users/tabs in real-time)
  useEffect(() => {
    // CRITICAL: Don't sync while user is typing - this prevents cursor jumping
    if (isUserTyping.current) {
      console.log('[TipTap] Ignoring Velt sync - user is actively typing')
      return
    }

    // Only sync from Velt if:
    // 1. Not first load (wait for initial setup)
    // 2. Editor exists and has content
    // 3. Velt content is different from current content
    if (!isFirstLoad && editor && editorContent && editorContent !== editor.getHTML()) {
      const currentHTML = editor.getHTML()

      // Check if this is the same content we just synced (prevent loop)
      if (lastSyncedContent.current === editorContent) {
        console.log('[TipTap] Ignoring Velt sync - this is content we just sent')
        return
      }

      // Strip out velt-comment-text wrappers for comparison (they're added by renderComments)
      const stripVeltTags = (html: string) => {
        return html
          .replace(/<velt-comment-text[^>]*>/g, '')
          .replace(/<\/velt-comment-text>/g, '')
          .replace(/\s+/g, ' ')
          .trim()
      }

      const strippedCurrent = stripVeltTags(currentHTML)
      const strippedVelt = stripVeltTags(editorContent)

      // If content is the same after stripping Velt tags, ignore
      if (strippedCurrent === strippedVelt) {
        console.log('[TipTap] Ignoring Velt sync - content is same after stripping velt tags')
        return
      }

      // Check if this is a meaningful update
      const currentLength = strippedCurrent.length
      const veltLength = strippedVelt.length

      // Only sync if content is significantly different and newer
      if (veltLength >= currentLength * 0.95) {
        console.log('[TipTap] Syncing content from Velt (real-time update):', editorContent.substring(0, 100))

        // Save scroll position and cursor position
        const scrollContainer = scrollContainerRef?.current
        const scrollTop = scrollContainer?.scrollTop || 0
        const { from, to } = editor.state.selection

        // CRITICAL: Strip velt-comment-text tags before persisting
        let cleanContent = editorContent
        if (cleanContent.includes('<velt-comment-text')) {
          console.warn('[TipTap] Stripping velt tags from synced content before saving')
          cleanContent = cleanContent.replace(/<velt-comment-text[^>]*>/g, '').replace(/<\/velt-comment-text>/g, '')
        }

        // Update local storage and editor
        localStorage.setItem(STORAGE_KEY, cleanContent)
        setLocalContent(cleanContent)
        editor.commands.setContent(cleanContent, false)

        // Remember this content to prevent loop
        lastSyncedContent.current = cleanContent

        // Restore scroll and cursor position
        requestAnimationFrame(() => {
          try {
            // Try to restore cursor position if it's still valid
            const docSize = editor.state.doc.content.size
            if (from <= docSize && to <= docSize) {
              editor.commands.setTextSelection({ from, to })
            }
          } catch (e) {
            // Cursor position is no longer valid, that's ok
          }

          // Restore scroll position
          if (scrollContainer) {
            scrollContainer.scrollTop = scrollTop
          }
        })
      } else {
        console.log('[TipTap] Ignoring Velt sync - appears to be stale:', veltLength, 'vs', currentLength)
      }
    }
  }, [editorContent, editor, isFirstLoad, STORAGE_KEY, scrollContainerRef])

  // Get comment annotations from Velt
  const commentAnnotations = useCommentAnnotations()

  // Render comments in the editor when annotations change
  useEffect(() => {
    if (editor && commentAnnotations?.length) {
      // CRITICAL: Only render comments after editor has content loaded
      // This prevents renderComments from running on an empty editor
      const currentHTML = editor.getHTML()
      if (!currentHTML || currentHTML === '<p></p>') {
        console.log('[TipTap] Skipping renderComments - editor has no content yet')
        return
      }

      console.log('[TipTap] ===== RENDERING COMMENTS =====')
      console.log('[TipTap] Comment annotations:', commentAnnotations)
      console.log('[TipTap] HTML BEFORE renderComments:', currentHTML.substring(0, 200))

      // Save scroll position before rendering comments
      const scrollContainer = scrollContainerRef?.current
      const scrollTop = scrollContainer?.scrollTop || 0

      try {
        // Set flag to prevent onUpdate from saving during renderComments
        isRenderingComments.current = true

        renderComments({ editor, commentAnnotations })

        const afterHTML = editor.getHTML()
        console.log('[TipTap] HTML AFTER renderComments:', afterHTML.substring(0, 200))

        // Safety check: if renderComments deleted content, restore it
        if (afterHTML.length < currentHTML.length * 0.5) {
          console.error('[TipTap] WARNING: renderComments deleted significant content! Restoring...')
          editor.commands.setContent(currentHTML, false)
        }
      } catch (error) {
        console.error('[TipTap] Error in renderComments:', error)
      } finally {
        // Always clear the flag
        isRenderingComments.current = false
      }

      // Restore scroll position after renderComments completes
      requestAnimationFrame(() => {
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollTop
        }
      })

      // Also restore after a longer delay in case layout shifts occur
      setTimeout(() => {
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollTop
        }
      }, 100)

      console.log('[TipTap] ===========================')
    }
  }, [editor, commentAnnotations, scrollContainerRef])

  // Handler to add a comment
  const addTiptapVeltComment = () => {
    if (editor) {
      // Save scroll position before adding comment
      const scrollContainer = scrollContainerRef?.current
      const scrollTop = scrollContainer?.scrollTop || 0

      addComment({ editor })

      // Restore scroll position after a brief delay to let Velt dialog render
      setTimeout(() => {
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollTop
        }
      }, 0)

      // Also restore after a longer delay in case Velt takes time to render
      setTimeout(() => {
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollTop
        }
      }, 100)
    }
  }

  // Wait for Velt to initialize before rendering the editor
  // This ensures that useLiveState can fetch persisted data from the server
  if (!veltInitialized) {
    return (
      <div className="bg-black relative size-full overflow-hidden flex items-center justify-center">
        <div className="text-white opacity-50 text-sm">Loading...</div>
      </div>
    )
  }

  if (!editor) {
    return null
  }

  return (
    <div className="bg-black relative size-full overflow-hidden" data-name="Tiptap / Expanded Toolbar">
      {/* Document Content - Scrollable */}
      <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-auto pb-20">
        <div className="flex justify-start pt-[51px] pl-[280px]">
          <div className="w-[850px]">
            {/* Document Background */}
            <div className="bg-[rgb(17,17,17)] border border-[rgb(20,20,20)] border-solid rounded-[16px] p-[42px_56px_64px_56px] min-h-[880px]">
              {/* Editor Content Container */}
              <EditorContentArea
                editor={editor}
                hasSelection={hasSelection}
                addTiptapVeltComment={addTiptapVeltComment}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Toolbar */}
      <EditorToolbar editor={editor} />
    </div>
  )
}
