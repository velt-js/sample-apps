"use client";
import { useVeltClient, VeltWireframe } from "@veltdev/react";
import VeltNotificationsToolWf from "./VeltNotificationsToolWf";
import VeltSidebarButtonWf from "./VeltSidebarButtonWf";
import "./styles.css";
import { useEffect } from "react";

export function VeltCustomization() {
  // [Velt] Get Velt client instance
  const { client } = useVeltClient();

  // [Velt] Enable dark mode
  useEffect(() => {
    if (client) {
      client.setDarkMode(true);
    }
  }, [client]);

  return (
    <VeltWireframe>
      <VeltNotificationsToolWf />
      <VeltSidebarButtonWf />
    </VeltWireframe>
  );
}
