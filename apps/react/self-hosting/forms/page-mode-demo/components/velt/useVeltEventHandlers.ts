'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCommentUtils, useCommentEventCallback, useVeltEventCallback, useContactSelected, useCommentAnnotationsCount } from '@veltdev/react'
import { CommentBubbleClickedEvent, CommentToolClickEvent, SidebarButtonClickEvent, VeltButtonClickEvent } from '@veltdev/types'

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
    const commentToolClickedCallback: CommentToolClickEvent = useCommentEventCallback('commentToolClick')
    const commentBubbleClickedCallback: CommentBubbleClickedEvent = useCommentEventCallback('commentBubbleClicked')
    const sidebarButtonClickedCallback: SidebarButtonClickEvent = useCommentEventCallback('sidebarButtonClick')
    const veltButtonClickEventData: VeltButtonClickEvent = useVeltEventCallback('veltButtonClick')
    const commentAnnotationsCount = useCommentAnnotationsCount();
    const selectedContact = useContactSelected();
    const searchParams = useSearchParams()
    const commentIdFromUrl = searchParams?.get('commentId') ?? null
    const handledCommentIdRef = useRef<string | null>(null)

    // Handle custom button click (remove page mode composer)
    useEffect(() => {
        if (veltButtonClickEventData) {
            if (veltButtonClickEventData?.buttonContext?.clickedButtonId === 'remove-page-mode-composer-button') {
                commentUtils?.clearPageModeComposerContext()
            }

            if (veltButtonClickEventData?.buttonContext?.clickedButtonId === 'navigate-to-question-button') {
                console.log('navigate-to-question-button clicked: ', veltButtonClickEventData)
            }
        }
    }, [veltButtonClickEventData, commentUtils])

    // Handle comment tool click (open sidebar and set context)
    useEffect(() => {
        if (commentToolClickedCallback) {
            openGlobalSidebar()
            if (commentUtils) {
                commentUtils?.setContextInPageModeComposer({ context: commentToolClickedCallback?.context, targetElementId: commentToolClickedCallback?.targetElementId })
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

    // Handle comment bubble click (open sidebar, select comment, sync URL)
    useEffect(() => {
        if (commentBubbleClickedCallback && commentUtils) {
            const { annotationId } = commentBubbleClickedCallback
            openGlobalSidebar()
            setTimeout(() => {
                commentUtils.selectCommentByAnnotationId(annotationId)
            }, 0)
            setActiveCommentToolId(commentBubbleClickedCallback.commentAnnotation?.context?.questionId)

            if (typeof window !== 'undefined' && annotationId) {
                const url = new URL(window.location.href)
                if (url.searchParams.get('commentId') !== annotationId) {
                    url.searchParams.set('commentId', annotationId)
                    window.history.replaceState(window.history.state, '', url.toString())
                }
                handledCommentIdRef.current = annotationId
            }
        }
    }, [commentBubbleClickedCallback, commentUtils, setActiveCommentToolId, openGlobalSidebar])

    useEffect(() => {
        if (!commentIdFromUrl || !commentUtils) return
        if (!commentAnnotationsCount?.data) return
        if (handledCommentIdRef.current === commentIdFromUrl) return

        handledCommentIdRef.current = commentIdFromUrl
        openGlobalSidebar()
        setTimeout(() => {
            commentUtils.selectCommentByAnnotationId(commentIdFromUrl)
        }, 0)
    }, [commentIdFromUrl, commentUtils, commentAnnotationsCount, openGlobalSidebar])

    useEffect(() => {
        console.log('selectedContact: ', selectedContact);
    }, [selectedContact]);

    const commentAnnotationEventCallbackData = useCommentEventCallback('addCommentAnnotation');
    useEffect(() => {
        if (commentAnnotationEventCallbackData) {
            // Handle comment action callback event response
            console.log('commentAnnotationEventCallbackData: ', commentAnnotationEventCallbackData);
        }
    }, [commentAnnotationEventCallbackData]);

    const commentEventCallbackData = useCommentEventCallback('addComment');
    useEffect(() => {
        if (commentEventCallbackData) {
            // Handle comment action callback event response
            console.log('commentEventCallbackData: ', commentEventCallbackData);
        }
    }, [commentEventCallbackData]);

    const deleteCommentAnnotationEventCallbackData = useCommentEventCallback('deleteCommentAnnotation');
    useEffect(() => {
    if (deleteCommentAnnotationEventCallbackData) {
        console.log('deleteCommentAnnotationEventCallbackData: ', deleteCommentAnnotationEventCallbackData);
    }
    }, [deleteCommentAnnotationEventCallbackData]);

    const deleteCommentEventCallbackData = useCommentEventCallback('deleteComment');
    useEffect(() => {
    if (deleteCommentEventCallbackData) {
        console.log('deleteCommentEventCallbackData: ', deleteCommentEventCallbackData);
    }
    }, [deleteCommentEventCallbackData]);

    // @ts-ignore
    const addCommentDraftEventCallbackData = useCommentEventCallback('addCommentDraft');
    useEffect(() => {
    if (addCommentDraftEventCallbackData) {
        console.log('addCommentDraftEventCallbackData: ', addCommentDraftEventCallbackData);
    }
    }, [addCommentDraftEventCallbackData]);

}
