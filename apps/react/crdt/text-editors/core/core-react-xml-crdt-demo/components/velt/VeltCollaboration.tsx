"use client";
import { useVeltClient, VeltComments, VeltHuddle } from "@veltdev/react";
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
      {/* [Velt] Huddle root component (required for VeltHuddleTool) */}
      <VeltHuddle />
      <VeltComments
        shadowDom={false}
        textMode={false}
        popoverMode={true}
        popoverTriangleComponent={false}
        commentPinHighlighter={false}
        dialogOnHover={false}
      />
      <VeltCustomization />
    </>
  );
}
