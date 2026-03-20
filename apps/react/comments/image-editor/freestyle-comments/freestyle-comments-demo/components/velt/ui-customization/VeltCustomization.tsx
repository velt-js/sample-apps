"use client";
import { useVeltClient, VeltWireframe } from "@veltdev/react";
import VeltCommentBubbleWf from "./VeltCommentBubbleWf";
import VeltCommentToolWf from "./VeltCommentToolWf";
import VeltNotificationsToolWf from "./VeltNotificationsToolWf";
import VeltSidebarButtonWf from "./VeltSidebarButtonWf";
import "./styles.css";
import { useEffect } from "react";

export function VeltCustomization() {
  const { client } = useVeltClient();

  // Force dark mode for image editor (dark-only app)
  useEffect(() => {
    if (client) {
      client.setDarkMode(true);
    }
  }, [client]);

  return (
    <VeltWireframe>
      <VeltCommentBubbleWf />
      <VeltCommentToolWf />
      <VeltNotificationsToolWf />
      <VeltSidebarButtonWf />
    </VeltWireframe>
  );
}
