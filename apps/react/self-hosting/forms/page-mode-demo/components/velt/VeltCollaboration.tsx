"use client";
import { useAppUser } from "@/app/userAuth/useAppUser";
import { useVeltClient, useVeltEventCallback, VeltComments, useCommentUtils } from "@veltdev/react";
import { useEffect } from "react";
import VeltInitializeDocument from "./VeltInitializeDocument";
import { VeltCustomization } from "./ui-customization/VeltCustomization";

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


  // @ts-ignore
  const commentUtils = useCommentUtils();

  useEffect(() => {
    if (commentUtils) {
      commentUtils.disableAttachmentDownload();
      commentUtils.on('attachmentDownloadClicked').subscribe((event: any) => {
        console.log('attachmentDownloadClicked: ', event);
      });
    }
  }, [commentUtils]);


  return (
    <>
      <VeltInitializeDocument />
      {/* [Velt] Comments configuration - popoverMode for inline comment dialogs */}
      <VeltComments
        popoverTriangleComponent={false}
        popoverMode={true}
        shadowDom={false}
        textMode={false}
        commentPinHighlighter={false}
        dialogOnHover={false}
        // groupMatchedComments={true}
        autoCompleteScrollConfig={{
            itemSize: 32,
        }}
        assignToType='checkbox'
      />
      <VeltCustomization />
    </>
  );
}
