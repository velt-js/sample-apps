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

  return (
    <>
      <VeltInitializeDocument />
      {/* [Velt] Freestyle and text comments - restricted to document canvas only */}
      <VeltComments
        shadowDom={false}
        textMode={false}
        allowedElementIds={['image-canvas']}
        areaComment={true}
        commentToNearestAllowedElement={true}
      />
      <VeltCommentsSidebar />
      <VeltCustomization />
    </>
  );
}
