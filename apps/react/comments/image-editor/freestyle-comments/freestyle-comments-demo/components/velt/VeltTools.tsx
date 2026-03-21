"use client";
import {
  VeltPresence,
  VeltCommentTool,
  VeltSidebarButton,
  VeltNotificationsTool,
} from "@veltdev/react";

function VeltTools() {
  return (
    <>
      {/* [Velt] Show online users */}
      <VeltPresence />
      {/* [Velt] Freestyle comments - click to pin comments anywhere */}
      <VeltCommentTool />
      {/* [Velt] Toggle comments sidebar */}
      <VeltSidebarButton />
      {/* [Velt] Notifications panel */}
      <VeltNotificationsTool
        settings={true}
        shadowDom={false}
        darkMode={true}
        tabConfig={{
          forYou: { name: "For You", enable: true },
          documents: { name: "Images", enable: true },
          all: { name: "All", enable: true },
        }}
      />
    </>
  );
}

export default VeltTools;
