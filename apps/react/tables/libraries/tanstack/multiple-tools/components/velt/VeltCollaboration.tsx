"use client";
import { useVeltClient, VeltComments, VeltCommentsSidebar } from "@veltdev/react";
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

  // [Velt] Enable dark mode
  useEffect(() => {
    if (client) {
      client.setDarkMode(true);
    }
  }, [client]);

 
  const groupConfig = {
    enable: false
  };

  return (
    <>
      <VeltInitializeDocument />
      <VeltComments
        popoverTriangleComponent={true}
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
