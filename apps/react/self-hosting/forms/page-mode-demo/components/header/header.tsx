'use client'

import VeltTools from '@/components/velt/VeltTools'
import { useCommentUtils, useCommentEventCallback, useVeltEventCallback, VeltSidebarButton, useVeltClient } from '@veltdev/react';
import { GetCommentAnnotationsResponse } from '@veltdev/types';
import { useEffect } from 'react';

interface HeaderProps {
    toggleGlobalSidebar: () => void
    openGlobalSidebar: () => void
    isGlobalSidebarOpen: boolean
    setActiveCommentToolId: (annotationId: string | null) => void
}

export default function Header({
    toggleGlobalSidebar,
    openGlobalSidebar,
    isGlobalSidebarOpen,
    setActiveCommentToolId
}: HeaderProps) {

    const commentToolClickedCallback = useCommentEventCallback('commentToolClick');
    const commentUtils = useCommentUtils();
    const veltButtonClickEventData = useVeltEventCallback('veltButtonClick');
    const sidebarButtonClickedCallback = useCommentEventCallback('sidebarButtonClick');
    const commentBubbleClickedCallback = useCommentEventCallback('commentBubbleClicked');
    const { client } = useVeltClient();

    useEffect(() => {
        if (veltButtonClickEventData) {
            if (veltButtonClickEventData?.buttonContext?.clickedButtonId === 'remove-page-mode-composer-button') {
                commentUtils?.clearPageModeComposerContext();
            }
        }
    }, [veltButtonClickEventData, commentUtils]);

    useEffect(() => {
        if (commentToolClickedCallback) {
            openGlobalSidebar();
            if (commentUtils) {
                commentUtils?.setContextInPageModeComposer(commentToolClickedCallback?.context);
                commentUtils?.focusPageModeComposer();
            }
            setActiveCommentToolId(commentToolClickedCallback?.context?.questionId);
        }
    }, [commentToolClickedCallback, commentUtils, client, setActiveCommentToolId]);

    useEffect(() => {
        if (sidebarButtonClickedCallback) {
            toggleGlobalSidebar();
            commentUtils?.clearPageModeComposerContext();
            setActiveCommentToolId(null);
        }
    }, [sidebarButtonClickedCallback, commentUtils, client, setActiveCommentToolId]);

    useEffect(() => {
        if (commentBubbleClickedCallback && commentUtils) {
            openGlobalSidebar();
            setTimeout(() => {
                commentUtils.selectCommentByAnnotationId(commentBubbleClickedCallback.annotationId);
            }, 0);
            setActiveCommentToolId(commentBubbleClickedCallback.commentAnnotation?.context?.questionId);
        }
    }, [commentBubbleClickedCallback, commentUtils, client, setActiveCommentToolId]);

    return (
        <div className="flex items-center gap-[12px]">
            {/* [Velt] Show online users/collaborators */}
            <VeltTools />
            {/* Custom button to toggle embedded comments sidebar */}

            <div className={`privado-comment-sidebar-button ${isGlobalSidebarOpen ? 'privado-comment-sidebar-button--active' : ''}`}>
                <VeltSidebarButton></VeltSidebarButton>
                <div className='privado-comment-sidebar-button-divider'></div>
                <div className='privado-comment-sidebar-button-right-icon'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_29_10775)">
                            <path d="M13.5 5.5C13.1886 5.50124 12.8802 5.56129 12.591 5.677L10.323 3.409C10.4387 3.11985 10.4988 2.81144 10.5 2.5C10.5 1.83696 10.2366 1.20107 9.76777 0.732233C9.29893 0.263392 8.66304 0 8 0C7.33696 0 6.70107 0.263392 6.23223 0.732233C5.76339 1.20107 5.5 1.83696 5.5 2.5C5.50124 2.81144 5.56129 3.11985 5.677 3.409L3.409 5.677C3.11985 5.56129 2.81144 5.50124 2.5 5.5C1.83696 5.5 1.20107 5.76339 0.732233 6.23223C0.263392 6.70107 0 7.33696 0 8C0 8.66304 0.263392 9.29893 0.732233 9.76777C1.20107 10.2366 1.83696 10.5 2.5 10.5C2.81144 10.4988 3.11985 10.4387 3.409 10.323L5.677 12.591C5.56129 12.8802 5.50124 13.1886 5.5 13.5C5.5 14.163 5.76339 14.7989 6.23223 15.2678C6.70107 15.7366 7.33696 16 8 16C8.66304 16 9.29893 15.7366 9.76777 15.2678C10.2366 14.7989 10.5 14.163 10.5 13.5C10.4988 13.1886 10.4387 12.8802 10.323 12.591L12.591 10.323C12.8802 10.4387 13.1886 10.4988 13.5 10.5C14.163 10.5 14.7989 10.2366 15.2678 9.76777C15.7366 9.29893 16 8.66304 16 8C16 7.33696 15.7366 6.70107 15.2678 6.23223C14.7989 5.76339 14.163 5.5 13.5 5.5ZM8 11C7.68856 11.0012 7.38015 11.0613 7.091 11.177L4.823 8.909C5.05896 8.32597 5.05896 7.67403 4.823 7.091L7.091 4.823C7.67403 5.05896 8.32597 5.05896 8.909 4.823L11.177 7.091C10.941 7.67403 10.941 8.32597 11.177 8.909L8.909 11.177C8.61985 11.0613 8.31144 11.0012 8 11Z" fill="#5C6C8A" />
                        </g>
                        <defs>
                            <clipPath id="clip0_29_10775">
                                <rect width="16" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>
    )
}
