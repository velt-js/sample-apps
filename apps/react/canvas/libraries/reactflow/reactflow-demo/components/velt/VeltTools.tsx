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
      <VeltPresence />
      <VeltSidebarButton />
      <VeltNotificationsTool
        settings={true}
        shadowDom={false}
        tabConfig={{
          forYou: { name: "For You", enable: true },
          documents: { name: "Payrolls", enable: true },
          all: { name: "All", enable: true },
        }}
      />
      <VeltHuddleTool type='all' />
    </>
  );
}

export default VeltTools;

