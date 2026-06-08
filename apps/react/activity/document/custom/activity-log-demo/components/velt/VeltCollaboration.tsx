"use client";
import { useVeltClient, VeltComments } from "@veltdev/react";
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
      {/* [Velt] Freestyle pin comments (via VeltCommentTool) + text-selection
          comments, scoped to the document body. Selecting text or clicking with
          the comment tool active pops up the comment composer toolbar. */}
      <VeltComments
        shadowDom={false}
        textMode={true}
        priority={true}
        allowedElementQuerySelectors={['[data-name="document"]']}
      />

      <VeltCustomization />
    </>
  );
}
