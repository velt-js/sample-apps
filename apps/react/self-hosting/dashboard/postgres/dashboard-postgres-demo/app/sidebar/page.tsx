"use client";

import { VeltProvider, VeltComments, VeltCommentsSidebar, useSetDocuments, useCurrentUser, useVeltEventCallback } from "@veltdev/react";
import { useVeltAuthProvider } from "@/components/velt/VeltInitializeUser";
import { VeltCustomization } from "@/components/velt/ui-customization/VeltCustomization";
import { commentDataProvider, userDataProvider, attachmentDataProvider, reactionDataProvider } from "@/components/velt/VeltDataProviders";
import { useEffect } from "react";
import Link from "next/link";

const NEXT_PUBLIC_VELT_API_KEY = "6xTcUFtlYAlCdh11zrKB";
const SELF_HOSTING_ENABLED = true;

function SidebarDocumentInit() {
    const { setDocuments } = useSetDocuments();
    const veltUser = useCurrentUser();

    useEffect(() => {
        if (!veltUser) return;
        setDocuments([
            { id: "sidebar-page", metadata: { documentName: "Sidebar Page" } },
        ]);
    }, [veltUser, setDocuments]);

    return null;
}

function SidebarContent() {
    const veltButtonClickEventData = useVeltEventCallback('veltButtonClick');

    useEffect(() => {
        if (veltButtonClickEventData?.buttonContext?.clickedButtonId === 'close-sidebar-button') {
            console.log('close-sidebar-button clicked');
        }
    }, [veltButtonClickEventData]);
    
    return (
        <div className="flex flex-col h-screen">
            <div className="sticky top-0 z-50 flex items-center gap-2 p-2 px-4 border-b bg-background">
                <Link
                    href="/"
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back to Dashboard
                </Link>
            </div>
            <div className="flex flex-1 overflow-hidden">
                <div className="border-l bg-background overflow-auto px-32">
                    <VeltCommentsSidebar
                        embedMode={true}
                        shadowDom={false}
                        pageMode={true}
                        sortOrder="asc"
                        sortBy="createdAt"
                        focusedThreadMode={true}
                        openAnnotationInFocusMode={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default function SidebarPage() {
    const { authProvider } = useVeltAuthProvider();

    return (
        <VeltProvider
            apiKey={NEXT_PUBLIC_VELT_API_KEY}
            authProvider={authProvider}
            dataProviders={SELF_HOSTING_ENABLED ? {
                comment: commentDataProvider,
                user: userDataProvider,
                attachment: attachmentDataProvider,
                reaction: reactionDataProvider,
            } : undefined}
        >
            <SidebarDocumentInit />
            <VeltComments
                popoverTriangleComponent={false}
                popoverMode={true}
                shadowDom={false}
                textMode={false}
                commentPinHighlighter={false}
                dialogOnHover={false}
                groupMatchedComments={true}
            />
            <VeltCustomization />
            <SidebarContent />
        </VeltProvider>
    );
}
