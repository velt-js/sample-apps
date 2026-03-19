"use client";
import { useVeltClient, VeltWireframe } from "@veltdev/react";
import VeltCommentToolWf from "./VeltCommentToolWf";
import VeltNotificationsToolWf from "./VeltNotificationsToolWf";
import VeltSidebarButtonWf from "./VeltSidebarButtonWf";
import "./styles.css";
import { useEffect } from "react";
import { useTheme } from "@/components/theme/ThemeContext";

export function VeltCustomization() {
  // [Velt] Get Velt client instance
  const { client } = useVeltClient();
  const { resolvedTheme } = useTheme();

  // [Velt] Set dark mode reactively based on theme
  useEffect(() => {
    if (client) {
      client.setDarkMode(resolvedTheme === 'dark');
    }
  }, [client, resolvedTheme]);

  return (
    <VeltWireframe>
      <VeltCommentToolWf />
      <VeltNotificationsToolWf />
      <VeltSidebarButtonWf />
    </VeltWireframe>
  );
}
