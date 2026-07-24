"use client";
import { useVeltClient, VeltCursor, VeltComments, VeltCommentsSidebar, VeltHuddle } from "@veltdev/react";
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

  return (
    <>
      <VeltInitializeDocument />
      {/* [Velt] Huddle root component (required for VeltHuddleTool) */}
      <VeltHuddle />
      <VeltComments
        popoverMode={true}
        textMode={false}
        commentPinHighlighter={false}
        dialogOnHover={false}
        popoverTriangleComponent={false}
      />
      <VeltCommentsSidebar groupConfig={groupConfig} />
      <VeltCursor />
      <VeltCustomization />
    </>
  );
}
