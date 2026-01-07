"use client";
import { useVeltClient, VeltComments, VeltCommentsSidebar } from "@veltdev/react";
import VeltInitializeDocument from "./VeltInitializeDocument";
import { VeltCustomization } from "./ui-customization/VeltCustomization";
import { useEffect, useRef } from "react";
import { useAppUser } from "@/app/userAuth/AppUserContext";

export function VeltCollaboration() {
  const { isUserLoggedIn } = useAppUser();
  // [Velt] Get Velt client instance
  const { client } = useVeltClient();
  const hasSignedOutOnMount = useRef(false);

  // [Velt] Sign out any previous user on mount to clear stale state
  useEffect(() => {
    if (!hasSignedOutOnMount.current && client) {
      hasSignedOutOnMount.current = true;
      client.signOutUser();
    }
  }, [client]);

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
      />
      <VeltCommentsSidebar shadowDom={false} groupConfig={groupConfig} pageMode={true} sortData="asc" />

      <VeltCustomization />
    </>
  );
}
