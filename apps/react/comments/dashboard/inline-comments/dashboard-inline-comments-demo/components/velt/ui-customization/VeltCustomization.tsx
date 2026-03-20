"use client";
import { useVeltClient, VeltWireframe } from '@veltdev/react';
import VeltCommentBubbleWf from "./VeltCommentBubbleWf";
import VeltCommentToolWf from "./VeltCommentToolWf";
import VeltCommentsSidebarHeaderWf from "./VeltCommentsSidebarHeaderWf";
import VeltNotificationsToolWf from "./VeltNotificationsToolWf";
import VeltSidebarButtonWf from "./VeltSidebarButtonWf";
import "./styles.css";
import { useEffect } from "react";
import { useTheme } from "@/components/theme/ThemeContext";

export function VeltCustomization() {
  const { client } = useVeltClient();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (client) {
      client.setDarkMode(resolvedTheme === 'dark');
    }
  }, [client, resolvedTheme]);

  return (
    <VeltWireframe>
      <VeltSidebarButtonWf />
      <VeltCommentToolWf />
      <VeltCommentBubbleWf />
      <VeltNotificationsToolWf />
      <VeltCommentsSidebarHeaderWf />
    </VeltWireframe>
  );
}
