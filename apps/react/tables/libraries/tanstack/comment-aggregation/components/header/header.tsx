"use client";

import { useVeltInitState, useVeltClient } from "@veltdev/react"; // [Velt]
import VeltTools from "@/components/velt/VeltTools";
import { useEffect } from 'react';

export default function Header() {
  // [Velt] Check if Velt is initialized
  const veltInitialized = useVeltInitState();
  // [Velt] Get Velt client instance
  const { client } = useVeltClient();

  // [Velt] Enable dark mode
  useEffect(() => {
    if (client) {
      client.setDarkMode(true);
    }
  }, [client]);

  return (
    <div
      className="absolute top-0 right-0 z-50"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
        padding: "16px",
      }}
    >
      {veltInitialized && <VeltTools />}
    </div>
  );
}
