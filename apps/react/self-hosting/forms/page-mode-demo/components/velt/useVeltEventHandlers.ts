'use client'

import { useEffect } from 'react'
import { useCommentUtils, useCommentEventCallback, useVeltEventCallback } from '@veltdev/react'

interface UseVeltEventHandlersProps {
  toggleGlobalSidebar: () => void
  openGlobalSidebar: () => void
  setActiveCommentToolId: (id: string | null) => void
}

/**
 * Custom hook to handle Velt comment events
 * - Handles comment tool clicks (opens sidebar, sets context)
 * - Handles comment bubble clicks (opens sidebar, selects comment)
 * - Handles sidebar button clicks (toggles sidebar)
 * - Handles custom button clicks (clears page mode composer)
 */
export function useVeltEventHandlers({
  toggleGlobalSidebar,
  openGlobalSidebar,
  setActiveCommentToolId
}: UseVeltEventHandlersProps) {
  const commentUtils = useCommentUtils()
  const commentToolClickedCallback = useCommentEventCallback('commentToolClick')
  const commentBubbleClickedCallback = useCommentEventCallback('commentBubbleClicked')
  const sidebarButtonClickedCallback = useCommentEventCallback('sidebarButtonClick')
  const veltButtonClickEventData = useVeltEventCallback('veltButtonClick')

  // Handle custom button click (remove page mode composer)
  useEffect(() => {
    if (veltButtonClickEventData) {
      if (veltButtonClickEventData?.buttonContext?.clickedButtonId === 'remove-page-mode-composer-button') {
        commentUtils?.clearPageModeComposerContext()
      }
    }
  }, [veltButtonClickEventData, commentUtils])

  // Handle comment tool click (open sidebar and set context)
  useEffect(() => {
    if (commentToolClickedCallback) {
      openGlobalSidebar()
      if (commentUtils) {
        commentUtils?.setContextInPageModeComposer(commentToolClickedCallback?.context)
        commentUtils?.focusPageModeComposer()
      }
      setActiveCommentToolId(commentToolClickedCallback?.context?.questionId)
    }
  }, [commentToolClickedCallback, commentUtils, setActiveCommentToolId, openGlobalSidebar])

  // Handle sidebar button click (toggle sidebar and clear context)
  useEffect(() => {
    if (sidebarButtonClickedCallback) {
      toggleGlobalSidebar()
      commentUtils?.clearPageModeComposerContext()
      setActiveCommentToolId(null)
    }
  }, [sidebarButtonClickedCallback, commentUtils, setActiveCommentToolId, toggleGlobalSidebar])

  // Handle comment bubble click (open sidebar and select comment)
  useEffect(() => {
    if (commentBubbleClickedCallback && commentUtils) {
      openGlobalSidebar()
      setTimeout(() => {
        commentUtils.selectCommentByAnnotationId(commentBubbleClickedCallback.annotationId)
      }, 0)
      setActiveCommentToolId(commentBubbleClickedCallback.commentAnnotation?.context?.questionId)
    }
  }, [commentBubbleClickedCallback, commentUtils, setActiveCommentToolId, openGlobalSidebar])
}
