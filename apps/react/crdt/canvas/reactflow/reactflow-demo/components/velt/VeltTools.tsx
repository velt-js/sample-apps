"use client";
import {
  VeltPresence,
  VeltSidebarButton,
  VeltNotificationsTool,
  VeltHuddleTool
} from "@veltdev/react";

function VeltTools() {
  return (
    <>
      {/* [Velt] Show online users */}
      <VeltPresence />
      {/* [Velt] Toggle comments sidebar */}
      <VeltSidebarButton />
      {/* [Velt] Notifications panel */}
      <VeltNotificationsTool
        settings={true}
        shadowDom={false}
        tabConfig={{
          forYou: { name: "For You", enable: true },
          documents: { name: "Payrolls", enable: true },
          all: { name: "All", enable: true },
        }}
      />
      {/* [Velt] Start huddle/video calls with other users */}
      <VeltHuddleTool type='all' />
    </>
  );
}

export default VeltTools;

