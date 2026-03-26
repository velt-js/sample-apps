'use client'

import { useEffect } from 'react'
import { useCommentUtils, useCommentEventCallback, useVeltEventCallback } from '@veltdev/react'
import { CommentBubbleClickedEvent, CommentToolClickEvent, SidebarButtonClickEvent, VeltButtonClickEvent } from '@veltdev/types'

interface UseVeltEventHandlersProps {
  toggleGlobalSidebar: () => void
  openGlobalSidebar: () => void
  setActiveCommentToolId: (id: string | null) => void
}

export function useVeltEventHandlers({
  toggleGlobalSidebar,
  openGlobalSidebar,
  setActiveCommentToolId
}: UseVeltEventHandlersProps) {
  // [Velt] Get comment utilities for programmatic comment operations
  const commentUtils = useCommentUtils()
  // [Velt] Subscribe to comment event callbacks
  const commentToolClickedCallback: CommentToolClickEvent = useCommentEventCallback('commentToolClick')
  const commentBubbleClickedCallback: CommentBubbleClickedEvent = useCommentEventCallback('commentBubbleClicked')
  const sidebarButtonClickedCallback: SidebarButtonClickEvent = useCommentEventCallback('sidebarButtonClick')
  // [Velt] Subscribe to global Velt button click events
  const veltButtonClickEventData: VeltButtonClickEvent = useVeltEventCallback('veltButtonClick')

  // [Velt] Handle custom button click to clear page-mode composer
  useEffect(() => {
    if (veltButtonClickEventData) {
      if (veltButtonClickEventData?.buttonContext?.clickedButtonId === 'remove-page-mode-composer-button') {
        commentUtils?.clearPageModeComposerContext()
      }
    }
  }, [veltButtonClickEventData, commentUtils])

  // [Velt] Handle comment tool click: open sidebar and set page-mode composer context
  useEffect(() => {
    if (commentToolClickedCallback) {
      openGlobalSidebar()
      if (commentUtils) {
        commentUtils.setContextInPageModeComposer({
          context: commentToolClickedCallback?.context,
          targetElementId: commentToolClickedCallback?.targetElementId,
        })
        commentUtils.focusPageModeComposer()
      }
      setActiveCommentToolId(commentToolClickedCallback?.context?.entryKey)
    }
  }, [commentToolClickedCallback, commentUtils, setActiveCommentToolId, openGlobalSidebar])

  // [Velt] Handle sidebar button click: toggle sidebar and clear composer
  useEffect(() => {
    if (sidebarButtonClickedCallback) {
      toggleGlobalSidebar()
      commentUtils?.clearPageModeComposerContext()
      setActiveCommentToolId(null)
    }
  }, [sidebarButtonClickedCallback, commentUtils, setActiveCommentToolId, toggleGlobalSidebar])

  // [Velt] Handle comment bubble click: open sidebar and select the clicked annotation
  useEffect(() => {
    if (commentBubbleClickedCallback && commentUtils) {
      openGlobalSidebar()
      setTimeout(() => {
        commentUtils.selectCommentByAnnotationId(commentBubbleClickedCallback.annotationId)
      }, 0)
      setActiveCommentToolId(commentBubbleClickedCallback.commentAnnotation?.context?.entryKey)
    }
  }, [commentBubbleClickedCallback, commentUtils, setActiveCommentToolId, openGlobalSidebar])
}
