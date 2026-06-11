"use client";
import {
  VeltPresence,
  VeltNotificationsTool,
  VeltCommentTool,
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
      {/* [Velt] Comment tool — activates comment mode; clicking a chart data
          point then pins a comment to that exact value */}
      <VeltCommentTool />
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
