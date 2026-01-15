"use client";
import { useVeltClient, VeltComments, VeltCommentsSidebar, VeltPresence } from "@veltdev/react";
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
      {/* [Velt] Comments configuration - popoverMode for inline comment dialogs */}
      <VeltComments
        popoverTriangleComponent={false}
        popoverMode={true}
        shadowDom={false}
        textMode={false}
        commentPinHighlighter={false}
        dialogOnHover={false}
        groupMatchedComments={true}
      />
      <VeltCustomization />
    </>
  );
}

// Export VeltPresence and VeltCommentsSidebar for use in layout
export { VeltPresence, VeltCommentsSidebar };
