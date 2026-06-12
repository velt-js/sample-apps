"use client";
import { useVeltClient, VeltWireframe } from "@veltdev/react";
import VeltCommentToolWf from "./VeltCommentToolWf";
import VeltNotificationsToolWf from "./VeltNotificationsToolWf";
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
      <VeltCommentToolWf />
      <VeltNotificationsToolWf />
    </VeltWireframe>
  );
}
