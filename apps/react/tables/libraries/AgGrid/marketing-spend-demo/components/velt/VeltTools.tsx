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
      <VeltPresence />
      <VeltSidebarButton />
      <VeltCommentTool />
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
