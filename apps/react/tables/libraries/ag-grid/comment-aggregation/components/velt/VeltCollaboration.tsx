"use client";
import { useVeltClient, VeltComments, VeltCommentsSidebar } from "@veltdev/react";
import VeltInitializeDocument from "./VeltInitializeDocument";
import { VeltCustomization } from "./ui-customization/VeltCustomization";
import { useEffect } from "react";
import { useAppUser } from "@/app/userAuth/AppUserContext";

export function VeltCollaboration() {
  const { isUserLoggedIn } = useAppUser();
  const { client } = useVeltClient();

  // [Velt] Sign out user when user logs out, getting user login state from host app
  useEffect(() => {
    if (isUserLoggedIn === false && client) {
      client.signOutUser();
    }
  }, [isUserLoggedIn, client]);
  return (
    <>
      <VeltInitializeDocument />
      <VeltComments
        popoverMode={true}
        textMode={false}
        commentPinHighlighter={false}
        dialogOnHover={false}
        popoverTriangleComponent={false}
        groupMultipleMatch={true}
        priority={true}
      />
      <VeltCommentsSidebar />
      <VeltCustomization />
    </>
  );
}
