"use client";
import { useUnreadNotificationsCount, useVeltClient, VeltComments, VeltCommentsSidebar } from "@veltdev/react";
import VeltInitializeDocument from "./VeltInitializeDocument";
import { VeltCustomization } from "./ui-customization/VeltCustomization";
import { useEffect } from "react";
import { useAppUser } from "@/app/userAuth/AppUserContext";

export function VeltCollaboration() {
    const { isUserLoggedIn } = useAppUser();
    // [Velt] Get Velt client instance
    const { client } = useVeltClient();

    // [Velt] Sign out user when user logs out, getting user login state from host app
    useEffect(() => {
        if (isUserLoggedIn === false && client) {
            client.signOutUser();
        }
    }, [isUserLoggedIn, client]);

    const groupConfig = {
        enable: false
    };

    const unreadCount = useUnreadNotificationsCount();

    useEffect(() => {
        if(client) {
            client.setUiState({
                notificationsPanel: {
                    unreadCount: unreadCount
                }
            })
        }
    }, [unreadCount, client])


    return (
        <>
            <VeltInitializeDocument />
            <VeltComments
                popoverTriangleComponent={false}
                popoverMode={true}
                shadowDom={false}
                textMode={false}
                commentPinHighlighter={false}
                dialogOnHover={false}
                groupMatchedComments={true}
                // readOnly={true}
            />
            <VeltCommentsSidebar
                context={{ jobId: `job-page-mode`, jobStatus: 'page comment', commentType: 'action' }}
                shadowDom={false}
                groupConfig={groupConfig}
                pageMode={true}
                sortData="asc"
                focusedThreadMode={true}
                // readOnly={true}
            />

            <VeltCustomization />
        </>
    );
}
