"use client";
import { useVeltClient, VeltComments } from "@veltdev/react";
import VeltInitializeDocument from "./VeltInitializeDocument";
import { VeltCustomization } from "./ui-customization/VeltCustomization";
import { useEffect } from "react";
import { useAppUser } from "@/app/userAuth/AppUserContext";

export function VeltCollaboration() {
  const { isUserLoggedIn } = useAppUser();
  const { client } = useVeltClient();

  useEffect(() => {
    if (isUserLoggedIn === false && client) {
      client.signOutUser();
    }
  }, [isUserLoggedIn, client]);

  return (
    <>
      <VeltInitializeDocument />
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
