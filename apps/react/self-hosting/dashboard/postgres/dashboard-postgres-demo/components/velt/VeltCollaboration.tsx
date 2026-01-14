"use client";
import { useAppUser } from "@/app/userAuth/AppUserContext";
import { useVeltClient, VeltComments, VeltCommentsSidebar } from "@veltdev/react";
import { useEffect } from "react";
import VeltInitializeDocument from "./VeltInitializeDocument";
import { VeltCustomization } from "./ui-customization/VeltCustomization";
import { useSelectedJob } from "@/app/document/JobsContext";

export function VeltCollaboration() {
    const { isUserLoggedIn } = useAppUser();
    // [Velt] Get Velt client instance
    const { client } = useVeltClient();

    const selectedJob = useSelectedJob();

    // [Velt] Sign out user when user logs out, getting user login state from host app
    useEffect(() => {
        if (isUserLoggedIn === false && client) {
            client.signOutUser();
        }
    }, [isUserLoggedIn, client]);

    const groupConfig = {
        enable: false
    };

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
                autoCompleteScrollConfig={{
                    itemSize: 28,
                }}
            // readOnly={true} // Uncomment this to make the comments read-only for certain users
            />
            <VeltCommentsSidebar
                context={{ jobId: selectedJob?.id, jobName: selectedJob?.jobName, jobStatus: selectedJob?.status, commentType: 'jobLevel' }}
                shadowDom={false}
                groupConfig={groupConfig}
                pageMode={true}
                sortOrder="asc"
                sortBy="createdAt"
                focusedThreadMode={true}
                openAnnotationInFocusMode={true}
                defaultMinimalFilter="reset"
                forceClose={true}
            // readOnly={true}
            />

            <VeltCustomization />
        </>
    );
}
