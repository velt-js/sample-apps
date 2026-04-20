"use client";

import VeltInitializeDocument from "@/components/velt/VeltInitializeDocument";
import { useVeltAuthProvider } from "@/components/velt/VeltInitializeUser";
import { VeltCustomization } from "@/components/velt/ui-customization/VeltCustomization";
import { VeltComments, VeltProvider } from "@veltdev/react";
import InlineSection from "./inline-section";

const NEXT_PUBLIC_VELT_API_KEY = process.env.NEXT_PUBLIC_VELT_API_KEY || "6xTcUFtlYAlCdh11zrKB";

export default function InlineCommentsPage() {
    const { authProvider } = useVeltAuthProvider();

    return (
        <VeltProvider apiKey={NEXT_PUBLIC_VELT_API_KEY} authProvider={authProvider}>
            
            <VeltInitializeDocument />
            <VeltCustomization />
            <VeltComments 
                popoverTriangleComponent={false}
                popoverMode={true}
                shadowDom={false}
                textMode={false}
                commentPinHighlighter={false}
                dialogOnHover={false}
                autoCompleteScrollConfig={{
                    itemSize: 32,
                }}
                assignToType='checkbox' 
                deleteOnBackspace={false}
                deleteReplyConfirmation={true}
                commentPlaceholder="Write a comment..."
                replyPlaceholder="Write a reply..."
                editCommentPlaceholder="Edit comment..."
                editReplyPlaceholder="Edit reply..."
            />
            <InlineSection />
        </VeltProvider>
    );
}
