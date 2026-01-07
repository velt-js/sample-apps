"use client";
import { useVeltClient, useVeltInitState, VeltComments, VeltCommentsSidebar } from "@veltdev/react";
import VeltInitializeDocument from "./VeltInitializeDocument";
import { VeltCustomization } from "./ui-customization/VeltCustomization";
import { useEffect } from "react";
import { useAppUser } from "@/app/userAuth/AppUserContext";

export function VeltCollaboration() {
  const { isUserLoggedIn } = useAppUser();
  const { client } = useVeltClient();
  // [Velt] Check if Velt is fully initialized (user authenticated + document set)
  const veltInitialized = useVeltInitState();

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
      {veltInitialized && (
        <>
          <VeltComments
            popoverMode={true}
            shadowDom={false}
            textMode={false}
            commentPinHighlighter={false}
            dialogOnHover={false}
          />
          <VeltCommentsSidebar groupConfig={groupConfig} />
        </>
      )}
      <VeltCustomization />
    </>
  );
}
