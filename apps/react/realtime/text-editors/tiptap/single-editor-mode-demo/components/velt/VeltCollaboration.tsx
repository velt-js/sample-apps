"use client";
import { useVeltClient, VeltComments, VeltCommentsSidebar, VeltHuddle } from "@veltdev/react";
import VeltInitializeDocument from "./VeltInitializeDocument";
import VeltSingleEditorMode from "./VeltSingleEditorMode";
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
      {/* [Velt] Enable Single Editor Mode (one editor, everyone else read-only) */}
      <VeltSingleEditorMode />
      {/* [Velt] Huddle root component (required for VeltHuddleTool) */}
      <VeltHuddle />
      <VeltComments
        shadowDom={false}
        textMode={false}
      />
      <VeltCommentsSidebar groupConfig={groupConfig} />
      <VeltCustomization />
    </>
  );
}
