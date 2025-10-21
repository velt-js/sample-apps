'use client'

import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import React, { useEffect, useState, useRef } from 'react'
import { InlineH1, InlineH2, InlineH3 } from './extensions'
// [Velt] TipTap comments integration
import { TiptapVeltComments, addComment, renderComments } from '@veltdev/tiptap-velt-comments'
import { useCommentAnnotations, useLiveState, useVeltInitState } from '@veltdev/react'
import { EditorToolbar } from './ui/EditorToolbar'
import { EditorContentArea } from './ui/EditorContentArea'
import { TipTapComponentProps } from './types'
import { initialContent } from './constants'
import { useCurrentDocument } from '@/app/document/useCurrentDocument'

export default function TipTapComponent({ scrollContainerRef }: TipTapComponentProps) {
  const { documentId } = useCurrentDocument()
  const [, setForceUpdate] = useState({})
  const [hasSelection, setHasSelection] = useState(false)

  const isRenderingComments = useRef(false)
  const lastSyncedContent = useRef<string>('')
  const isUserTyping = useRef(false)
  const typingTimeout = useRef<NodeJS.Timeout | null>(null)

  // [Velt] Wait for initialization
  const veltInitialized = useVeltInitState()

  const [localContent, setLocalContent] = useState<string>(initialContent)
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  const STORAGE_KEY = `tiptap-editor-content-${documentId}`
  const LIVE_STATE_KEY = `tiptap-editor-content-${documentId}`

  // [Velt] Real-time sync across users/tabs
  const [editorContent, setEditorContent] = useLiveState<string>(
    LIVE_STATE_KEY,
    localContent,
    { syncDuration: 500 }
  )

  useEffect(() => {
    if (documentId && documentId !== 'loading') {
      const storageKey = `tiptap-editor-content-${documentId}`
      let saved = localStorage.getItem(storageKey)

      // Clean up any velt-comment-text tags from saved content
      if (saved && saved.includes('<velt-comment-text')) {
        saved = saved.replace(/<velt-comment-text[^>]*>/g, '').replace(/<\/velt-comment-text>/g, '')
        localStorage.setItem(storageKey, saved)
      }

      const content = saved || initialContent
      setLocalContent(content)
      setIsFirstLoad(true)
    }
  }, [documentId])

  useEffect(() => {
    if (isFirstLoad) {
      const timer = setTimeout(() => setIsFirstLoad(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isFirstLoad])

  // Prevent scroll jump on initial load
  useEffect(() => {
    const scrollContainer = scrollContainerRef?.current
    if (scrollContainer && veltInitialized) {
      scrollContainer.scrollTop = 0

      const preventScrollJump = () => {
        if (scrollContainer.scrollTop > 100) {
          scrollContainer.scrollTop = 0
        }
      }

      const intervals = [100, 300, 500, 1000, 1500, 2000, 3000].map(delay =>
        setTimeout(preventScrollJump, delay)
      )

      return () => intervals.forEach(clearTimeout)
    }
  }, [veltInitialized, scrollContainerRef])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      TextAlign.configure({
        types: ['paragraph'],
      }),
      Underline,
      InlineH1,
      InlineH2,
      InlineH3,
      // [Velt] Comments extension with persistence
      TiptapVeltComments.configure({
        persistVeltMarks: true,
      }),
    ],
    content: localContent,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (isRenderingComments.current) return

      // Track typing to prevent cursor jumping during sync
      isUserTyping.current = true
      if (typingTimeout.current) clearTimeout(typingTimeout.current)
      typingTimeout.current = setTimeout(() => {
        isUserTyping.current = false
      }, 1000)

      let html = editor.getHTML()

      // Strip out velt-comment-text tags if present
      if (html.includes('<velt-comment-text')) {
        html = html.replace(/<velt-comment-text[^>]*>/g, '').replace(/<\/velt-comment-text>/g, '')
      }

      localStorage.setItem(STORAGE_KEY, html)
      setLocalContent(html)
      setEditorContent(html)
      lastSyncedContent.current = html
    },
    onSelectionUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection
      setHasSelection(from !== to)
    },
  })

  useEffect(() => {
    if (isUserTyping.current) return

    if (editor && localContent && documentId && documentId !== 'loading') {
      const currentContent = editor.getHTML()
      const normalizedCurrent = currentContent.replace(/\s+/g, ' ').trim()
      const normalizedNew = localContent.replace(/\s+/g, ' ').trim()

      if (normalizedCurrent !== normalizedNew) {
        const scrollContainer = scrollContainerRef?.current
        const scrollTop = scrollContainer?.scrollTop || 0
        const { from, to } = editor.state.selection

        editor.commands.setContent(localContent, false)

        requestAnimationFrame(() => {
          try {
            const docSize = editor.state.doc.content.size
            if (from <= docSize && to <= docSize) {
              editor.commands.setTextSelection({ from, to })
            }
          } catch (e) {}

          if (scrollContainer) {
            scrollContainer.scrollTop = scrollTop
          }
        })
      }
    }
  }, [editor, localContent, documentId, scrollContainerRef])

  // [Velt] Sync from Velt Live State (collaborative editing)
  useEffect(() => {
    if (isUserTyping.current) return
    if (!isFirstLoad && editor && editorContent && editorContent !== editor.getHTML()) {
      const currentHTML = editor.getHTML()
      if (lastSyncedContent.current === editorContent) return

      const stripVeltTags = (html: string) => {
        return html
          .replace(/<velt-comment-text[^>]*>/g, '')
          .replace(/<\/velt-comment-text>/g, '')
          .replace(/\s+/g, ' ')
          .trim()
      }

      const strippedCurrent = stripVeltTags(currentHTML)
      const strippedVelt = stripVeltTags(editorContent)

      if (strippedCurrent === strippedVelt) return

      const currentLength = strippedCurrent.length
      const veltLength = strippedVelt.length

      if (veltLength >= currentLength * 0.95) {
        const scrollContainer = scrollContainerRef?.current
        const scrollTop = scrollContainer?.scrollTop || 0
        const { from, to } = editor.state.selection

        let cleanContent = editorContent
        if (cleanContent.includes('<velt-comment-text')) {
          cleanContent = cleanContent.replace(/<velt-comment-text[^>]*>/g, '').replace(/<\/velt-comment-text>/g, '')
        }

        localStorage.setItem(STORAGE_KEY, cleanContent)
        setLocalContent(cleanContent)
        editor.commands.setContent(cleanContent, false)
        lastSyncedContent.current = cleanContent

        requestAnimationFrame(() => {
          try {
            const docSize = editor.state.doc.content.size
            if (from <= docSize && to <= docSize) {
              editor.commands.setTextSelection({ from, to })
            }
          } catch (e) {}

          if (scrollContainer) {
            scrollContainer.scrollTop = scrollTop
          }
        })
      }
    }
  }, [editorContent, editor, isFirstLoad, STORAGE_KEY, scrollContainerRef])

  // [Velt] Get comment annotations
  const commentAnnotations = useCommentAnnotations()

  // [Velt] Render comments in editor
  useEffect(() => {
    if (editor && commentAnnotations?.length) {
      const currentHTML = editor.getHTML()
      if (!currentHTML || currentHTML === '<p></p>') return

      const scrollContainer = scrollContainerRef?.current
      const scrollTop = scrollContainer?.scrollTop || 0

      try {
        isRenderingComments.current = true
        renderComments({ editor, commentAnnotations })

        const afterHTML = editor.getHTML()
        if (afterHTML.length < currentHTML.length * 0.5) {
          editor.commands.setContent(currentHTML, false)
        }
      } catch (error) {
        console.error('[TipTap] Error in renderComments:', error)
      } finally {
        isRenderingComments.current = false
      }

      requestAnimationFrame(() => {
        if (scrollContainer) scrollContainer.scrollTop = scrollTop
      })

      setTimeout(() => {
        if (scrollContainer) scrollContainer.scrollTop = scrollTop
      }, 100)
    }
  }, [editor, commentAnnotations, scrollContainerRef])

  const addTiptapVeltComment = () => {
    if (editor) {
      const scrollContainer = scrollContainerRef?.current
      const scrollTop = scrollContainer?.scrollTop || 0

      addComment({ editor })

      setTimeout(() => {
        if (scrollContainer) scrollContainer.scrollTop = scrollTop
      }, 0)

      setTimeout(() => {
        if (scrollContainer) scrollContainer.scrollTop = scrollTop
      }, 100)
    }
  }

  if (!veltInitialized) {
    return (
      <div className="bg-black relative size-full overflow-hidden flex items-center justify-center">
        <div className="text-white opacity-50 text-sm">Loading...</div>
      </div>
    )
  }

  if (!editor) return null

  return (
    <div className="bg-black relative size-full overflow-hidden" data-name="Tiptap / Expanded Toolbar">
      <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-auto pb-20">
        <div className="flex justify-center pt-[51px] px-4">
          <div className="w-full max-w-[850px]">
            <div className="bg-[rgb(17,17,17)] border border-[rgb(20,20,20)] border-solid rounded-[16px] p-[42px_56px_64px_56px] min-h-[880px]">
              <EditorContentArea
                editor={editor}
                hasSelection={hasSelection}
                addTiptapVeltComment={addTiptapVeltComment}
              />
            </div>
          </div>
        </div>
      </div>

      <EditorToolbar editor={editor} />
    </div>
  )
}
