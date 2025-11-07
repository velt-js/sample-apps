'use client'

import React, { useMemo, useState, useCallback, useEffect, useRef } from 'react'
import { createEditor, Descendant, Editor, Transforms, Element as SlateElement, BaseEditor } from 'slate'
import { Slate, Editable, withReact, ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react'
import { withHistory, HistoryEditor } from 'slate-history'
import { useCommentAnnotations } from '@veltdev/react' // [Velt] Hook that listens to comment annotations and provides real-time updates when comments are added/removed
import { withVeltComments, addComment, renderComments, SlateVeltComment } from '@veltdev/slate-velt-comments' // [Velt] SlateJS plugin and utilities for integrating Velt comments into the editor
import type { VeltCommentsElement } from '@veltdev/slate-velt-comments'
import { BubbleMenuToolbar } from './ui/BubbleMenuToolbar'
import { SlateJSComponentProps } from './types'
import { initialContent } from './constants'

type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

const Element = ({ attributes, children, element }: RenderElementProps) => {
  if (element.type === 'veltComment') {
    return <SlateVeltComment {...{ attributes, children, element: element as VeltCommentsElement }} />
  }

  return <p {...attributes}>{children}</p>
}

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  let processedChildren = children

  if (leaf.bold) {
    processedChildren = <strong>{processedChildren}</strong>
  }

  if (leaf.italic) {
    processedChildren = <em>{processedChildren}</em>
  }

  if (leaf.underline) {
    processedChildren = <u>{processedChildren}</u>
  }

  if (leaf.strikethrough) {
    processedChildren = <s>{processedChildren}</s>
  }

  if (leaf.heading === 'h1') {
    processedChildren = (
      <span className="text-[40px] font-bold leading-[1.2] text-white" data-heading="h1">
        {processedChildren}
      </span>
    )
  } else if (leaf.heading === 'h2') {
    processedChildren = (
      <span className="text-[32px] font-bold leading-[1.2] mt-8 text-white" data-heading="h2">
        {processedChildren}
      </span>
    )
  } else if (leaf.heading === 'h3') {
    processedChildren = (
      <span className="text-[24px] font-bold leading-[1.2] mt-6 text-white" data-heading="h3">
        {processedChildren}
      </span>
    )
  }

  return <span {...attributes}>{processedChildren}</span>
}

export default function SlateJSComponent({ scrollContainerRef }: SlateJSComponentProps) {
  const [value, setValue] = useState<Descendant[]>(initialContent)
  const [showBubbleMenu, setShowBubbleMenu] = useState(false)
  const [bubbleMenuPosition, setBubbleMenuPosition] = useState({ top: 0, left: 0 })
  const bubbleMenuRef = useRef<HTMLDivElement>(null)

  const editor = useMemo(() => {
    const baseEditor = createEditor()
    return withVeltComments(withReact(withHistory(baseEditor)), { // [Velt] Wraps SlateJS editor with Velt comments plugin to enable comment tracking
      HistoryEditor: HistoryEditor,
    }) as CustomEditor
  }, [])

  const commentAnnotations = useCommentAnnotations() // [Velt] Subscribes to comment data changes and returns array of all active comment annotations

  useEffect(() => {
    if (editor && commentAnnotations?.length) {
      renderComments({ editor, commentAnnotations }) // [Velt] Renders comment highlights and markers in the editor based on annotation positions
    }
  }, [editor, commentAnnotations])

  const handleAddComment = useCallback(() => {
    if (editor) {
      addComment({ editor }) // [Velt] Triggers comment creation flow on selected text in the editor
    }
  }, [editor])

  const updateBubbleMenu = useCallback(() => {
    const { selection } = editor

    if (!selection || Editor.string(editor, selection) === '') {
      setShowBubbleMenu(false)
      return
    }

    const domSelection = window.getSelection()
    if (!domSelection || domSelection.rangeCount === 0) {
      setShowBubbleMenu(false)
      return
    }

    const domRange = domSelection.getRangeAt(0)
    const rect = domRange.getBoundingClientRect()

    const menuHeight = bubbleMenuRef.current?.offsetHeight || 50
    const menuWidth = bubbleMenuRef.current?.offsetWidth || 300

    setBubbleMenuPosition({
      top: rect.top + window.scrollY - menuHeight - 10,
      left: rect.left + window.scrollX + rect.width / 2 - menuWidth / 2,
    })

    setShowBubbleMenu(true)
  }, [editor])

  const handleChange = useCallback(
    (newValue: Descendant[]) => {
      setValue(newValue)
      updateBubbleMenu()
    },
    [updateBubbleMenu]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!event.ctrlKey && !event.metaKey) {
        return
      }

      switch (event.key) {
        case 'b': {
          event.preventDefault()
          Editor.addMark(editor, 'bold', true)
          break
        }
        case 'i': {
          event.preventDefault()
          Editor.addMark(editor, 'italic', true)
          break
        }
        case 'u': {
          event.preventDefault()
          Editor.addMark(editor, 'underline', true)
          break
        }
      }
    },
    [editor]
  )

  return (
    <div className="bg-black relative size-full overflow-hidden" data-name="SlateJS / Expanded Toolbar">
      <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-auto pb-20">
        <div className="flex justify-center pt-[51px] px-4">
          <div className="w-full max-w-[850px]">
            <div className="bg-[rgb(17,17,17)] border border-[rgb(20,20,20)] border-solid rounded-[16px] p-[42px_56px_64px_56px] min-h-[880px]">
              <div className="w-full max-w-[738px]">
                <Slate editor={editor} initialValue={value} onChange={handleChange}>
                  <Editable
                    className="slatejs-editor-content prose prose-invert max-w-none outline-none text-white"
                    renderElement={Element}
                    renderLeaf={Leaf}
                    onKeyDown={handleKeyDown}
                    placeholder="Start typing..."
                  />
                  {showBubbleMenu && (
                    <div
                      ref={bubbleMenuRef}
                      className="fixed z-50"
                      style={{
                        top: `${bubbleMenuPosition.top}px`,
                        left: `${bubbleMenuPosition.left}px`,
                      }}
                    >
                      <BubbleMenuToolbar onAddComment={handleAddComment} />
                    </div>
                  )}
                </Slate>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
