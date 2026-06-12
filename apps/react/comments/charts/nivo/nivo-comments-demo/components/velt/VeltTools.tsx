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
      {/* [Velt] Comment tool: activating comment mode highlights every
          data-point comment icon on the charts (comment-mode-on class);
          hovering a chart reveals them too */}
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
