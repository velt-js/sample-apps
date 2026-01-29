"use client";
import { useVeltClient, VeltWireframe } from "@veltdev/react";
import VeltCommentBubbleWf from "./VeltCommentBubbleWf";
import VeltCommentToolWf from "./VeltCommentToolWf";
import VeltSidebarButtonWf from "./VeltSidebarButtonWf";
import "./styles.css";
import { useEffect } from "react";
import VeltReactionToolWf from "./VeltReactionToolWf";
import VeltCommentDialogWf from "./VeltCommentDialogWf";
import VeltCommentsSidebarWf from "./VeltCommentsSidebarWf";

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
    <VeltWireframe>
      <VeltCommentBubbleWf />
      <VeltCommentToolWf />
      <VeltSidebarButtonWf />
      <VeltCommentDialogWf />
      <VeltReactionToolWf />
      <VeltCommentsSidebarWf />
    </VeltWireframe>
  );
}
