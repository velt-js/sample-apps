"use client";
import { useVeltClient, VeltWireframe } from "@veltdev/react";
import VeltCommentBubbleWf from "./VeltCommentBubbleWf";
import VeltCommentToolWf from "./VeltCommentToolWf";
import VeltSidebarButtonWf from "./VeltSidebarButtonWf";
import { GlobalVeltStyles } from "./styled";
import { useEffect } from "react";
import VeltReactionToolWf from "./VeltReactionToolWf";
import VeltCommentDialogWf from "./VeltCommentDialogWf";
import VeltCommentsSidebarWf from "./VeltCommentsSidebarWf";
import VeltAutocompleteOptionWf from "./VeltAutocompleteOptionWf";
import VeltReactionPinWf from "./VeltReactionPinWf";
import VeltCommentComposerWf from "./VeltCommentComposerWf";
import VeltConfirmDialogWf from "./VeltConfirmDialogWf";
import VeltCommentDialogAssigneeBannerWf from "./VeltCommentDialogAssigneeBannerWf";

export function VeltCustomization() {
  // [Velt] Get Velt client instance
  const { client } = useVeltClient();

  // [Velt] Use light mode to match Privado design
  useEffect(() => {
    if (client) {
      client.setDarkMode(false);
    }
  }, [client]);

  return (
    <>
      <GlobalVeltStyles />
      <VeltWireframe>
        <VeltCommentBubbleWf />
        <VeltCommentToolWf />
        <VeltSidebarButtonWf />
        <VeltCommentDialogWf />
        <VeltReactionToolWf />
        <VeltCommentsSidebarWf />
        <VeltAutocompleteOptionWf />
        <VeltReactionPinWf />
        <VeltCommentComposerWf />
        <VeltConfirmDialogWf />
        <VeltCommentDialogAssigneeBannerWf />
      </VeltWireframe>
    </>
  );
}
