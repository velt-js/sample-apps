"use client";
import { VeltPresence, VeltSidebarButton, VeltNotificationsTool } from "@veltdev/react";

// Individual, importable wrappers
export function Presence() {
  return <VeltPresence />;
}

export function SidebarButton() {
  return <VeltSidebarButton />;
}

export function NotificationsTool() {
  return (
    <VeltNotificationsTool
      settings={true}
      shadowDom={false}
      tabConfig={{
        forYou: { name: "For You", enable: true },
        documents: { name: "Payrolls", enable: true },
        all: { name: "All", enable: true },
      }}
    />
  );
}

// Aggregator that renders all tools together
function VeltTools() {
  return (
    <>
      <SidebarButton />
      <NotificationsTool />
      <Presence />
    </>
  );
}

export default VeltTools;
export { VeltTools };
