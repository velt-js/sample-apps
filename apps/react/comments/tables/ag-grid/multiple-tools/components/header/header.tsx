"use client";

import { VeltPresence, VeltSidebarButton, VeltNotificationsTool } from "@veltdev/react";

export default function Header() {
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
    </div>
  );
}
