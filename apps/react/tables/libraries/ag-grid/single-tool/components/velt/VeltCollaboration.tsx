"use client";
import { useVeltClient, VeltComments, VeltCommentsSidebar } from "@veltdev/react"; // [Velt]
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
  return (
    <>
      <VeltInitializeDocument />
      {/* [Velt] Enable comments in popover mode */}
      <VeltComments
        popoverMode={true}
        textMode={false}
        commentPinHighlighter={false}
        dialogOnHover={false}
        popoverTriangleComponent={false}
      />
      {/* [Velt] Comments sidebar panel */}
      <VeltCommentsSidebar />
      <VeltCustomization />
    </>
  );
}
