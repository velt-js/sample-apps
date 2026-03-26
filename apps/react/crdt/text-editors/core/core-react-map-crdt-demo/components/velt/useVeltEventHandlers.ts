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
  const commentUtils = useCommentUtils()
  const commentToolClickedCallback: CommentToolClickEvent = useCommentEventCallback('commentToolClick')
  const commentBubbleClickedCallback: CommentBubbleClickedEvent = useCommentEventCallback('commentBubbleClicked')
  const sidebarButtonClickedCallback: SidebarButtonClickEvent = useCommentEventCallback('sidebarButtonClick')
  const veltButtonClickEventData: VeltButtonClickEvent = useVeltEventCallback('veltButtonClick')

  useEffect(() => {
    if (veltButtonClickEventData) {
      if (veltButtonClickEventData?.buttonContext?.clickedButtonId === 'remove-page-mode-composer-button') {
        commentUtils?.clearPageModeComposerContext()
      }
    }
  }, [veltButtonClickEventData, commentUtils])

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

  useEffect(() => {
    if (sidebarButtonClickedCallback) {
      toggleGlobalSidebar()
      commentUtils?.clearPageModeComposerContext()
      setActiveCommentToolId(null)
    }
  }, [sidebarButtonClickedCallback, commentUtils, setActiveCommentToolId, toggleGlobalSidebar])

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
