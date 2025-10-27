"use client";

import { useVeltInitState, useVeltClient } from "@veltdev/react";
import VeltTools from "@/components/velt/VeltTools";
import { useEffect } from 'react';

export default function Header() {
  const veltInitialized = useVeltInitState();
  const { client } = useVeltClient();

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
