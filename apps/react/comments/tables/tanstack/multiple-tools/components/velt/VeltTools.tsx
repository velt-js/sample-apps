"use client";
import {
  VeltPresence,
  VeltSidebarButton,
  VeltNotificationsTool,
  VeltCommentTool,
} from "@veltdev/react";

function VeltTools() {
  return (
    <>
      {/* [Velt] Show online users */}
      <VeltPresence />
      {/* [Velt] Toggle comments sidebar */}
      <VeltSidebarButton />
      {/* [Velt] Add comment tool */}
      <VeltCommentTool />
      {/* [Velt] Notifications panel */}
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
  );
}

export default VeltTools;
