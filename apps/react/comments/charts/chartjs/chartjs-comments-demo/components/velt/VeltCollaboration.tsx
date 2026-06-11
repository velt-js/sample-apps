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
      {/* [Velt] Comments root. Charts use manual comment containers
          (data-velt-manual-comment-container) so pin placement is scoped to
          the charts by construction. priority adds P0–P2, autoCategorize lets
          AI label comments, commentIndex numbers pins in creation order. */}
      <VeltComments
        priority={true}
        autoCategorize={true}
        commentIndex={true}
        textMode={false}
      />

      <VeltCustomization />
    </>
  );
}
