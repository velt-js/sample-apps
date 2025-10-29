"use client";

import { useVeltInitState, useVeltClient, VeltPresence, VeltSidebarButton, VeltNotificationsTool } from "@veltdev/react"; // [Velt]
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
      {veltInitialized && (
        <>
          <VeltPresence />
          <VeltSidebarButton />
          <VeltNotificationsTool
            settings={true}
            shadowDom={false}
            tabConfig={{
              forYou: { name: "For You", enable: true },
              documents: { name: "Documents", enable: true },
              all: { name: "All", enable: true },
            }}
          />
        </>
      )}
    </div>
  );
}
