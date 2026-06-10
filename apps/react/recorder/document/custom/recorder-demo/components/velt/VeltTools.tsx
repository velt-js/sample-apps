"use client";
import {
  VeltPresence,
  VeltNotificationsTool,
  VeltRecorderTool,
} from "@veltdev/react";
import { ReactNode } from "react";

interface VeltToolsProps {
  children?: ReactNode;
}

function VeltTools({ children }: VeltToolsProps) {
  return (
    <>
      {/* [Velt] Show online users */}
      <VeltPresence />
      {/* [Velt] Recorder tool — type="all" lets the reviewer pick audio, video,
          or screen when starting a recording */}
      <VeltRecorderTool type="all" />
      {/* Slot for additional tools */}
      {children}
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
