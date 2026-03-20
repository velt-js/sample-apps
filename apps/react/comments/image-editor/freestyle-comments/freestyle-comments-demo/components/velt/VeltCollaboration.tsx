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

  // [Velt] Enable dark mode for all Velt components
  useEffect(() => {
    if (client) {
      client.setDarkMode(true);
    }
  }, [client]);

  // [Velt] Configure custom annotation dropdown for tagging comments
  useEffect(() => {
    if (client) {
      const commentElement = client.getCommentElement();
      commentElement.createCustomListDataOnAnnotation({
        type: 'multi',
        placeholder: 'Select tags',
        data: [
          { id: 'design', label: 'Design' },
          { id: 'content', label: 'Content' },
          { id: 'bug', label: 'Bug' },
          { id: 'enhancement', label: 'Enhancement' },
        ]
      });
    }
  }, [client]);

  const groupConfig = {
    enable: false
  };

  return (
    <>
      <VeltInitializeDocument />
      {/* [Velt] Freestyle and text comments - restricted to document canvas only */}
      <VeltComments
        shadowDom={false}
        textMode={true}
        priority={false}
        status={true}
        darkMode={true}
      />
      <VeltCommentsSidebar groupConfig={groupConfig} darkMode={true} />
      <VeltCustomization />
    </>
  );
}
