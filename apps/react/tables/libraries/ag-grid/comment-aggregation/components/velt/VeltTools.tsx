"use client";
import {
  VeltPresence,
  VeltSidebarButton,
  VeltNotificationsTool,
} from "@veltdev/react"; // [Velt]

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
          documents: { name: "Documents", enable: true },
          all: { name: "All", enable: true },
        }}
      />
    </>
  );
}

export default VeltTools;
