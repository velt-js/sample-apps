"use client";
import { useVeltClient, VeltCursor, VeltComments, VeltCommentsSidebar } from "@veltdev/react";
import VeltInitializeDocument from "./VeltInitializeDocument";
import { VeltCustomization } from "./ui-customization/VeltCustomization";
import { useEffect } from "react";
import { useAppUser } from "@/app/userAuth/useAppUser";

export function VeltCollaboration() {
  const { user } = useAppUser();
  const { client } = useVeltClient();

  // [Velt] Sign out user when user logs out, getting user login state from host app
  useEffect(() => {
    if (!user && client) {
      client.signOutUser();
    }
  }, [user, client]);

  const groupConfig = {
    enable: false
  };

  return (
    <>
      <VeltInitializeDocument />
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
