"use client";

import { useVeltInitState, VeltPresence, VeltSidebarButton, VeltNotificationsTool } from "@veltdev/react";

export default function Header() {
  // [Velt] Check if Velt is initialized
  const veltInitialized = useVeltInitState();

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
          // [Velt] Show online users
          <VeltPresence />
          // [Velt] Toggle comments sidebar
          <VeltSidebarButton />
          // [Velt] Notifications panel
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
