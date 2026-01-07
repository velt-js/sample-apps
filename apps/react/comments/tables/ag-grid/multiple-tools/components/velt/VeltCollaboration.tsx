"use client";
import { useVeltClient, VeltComments, VeltCommentsSidebar } from "@veltdev/react";
import VeltInitializeDocument from "./VeltInitializeDocument";
import { VeltCustomization } from "./ui-customization/VeltCustomization";
import { useEffect, useRef } from "react";
import { useAppUser } from "@/app/userAuth/AppUserContext";

export function VeltCollaboration() {
  const { isUserLoggedIn } = useAppUser();
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
        popoverMode={true}
        shadowDom={false}
        textMode={false}
        commentPinHighlighter={false}
        dialogOnHover={false}
      />
      <VeltCommentsSidebar groupConfig={groupConfig} />
      <VeltCustomization />
    </>
  );
}
