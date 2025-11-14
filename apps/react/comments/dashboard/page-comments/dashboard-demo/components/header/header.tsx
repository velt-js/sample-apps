"use client";

import {
  VeltPresence,
  VeltSidebarButton,
  VeltCommentTool,
  VeltNotificationsTool,
} from "@veltdev/react";

interface HeaderProps {
  toggleCommentsSidebar: () => void;
}

export default function Header({ toggleCommentsSidebar }: HeaderProps) {
  return (
    <div
      className="absolute top-0 right-0 z-50"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
        padding: "16px",
      }}
    >
      {/* [Velt] Show online users */}
      <VeltPresence />
      {/* [Velt] Toggle comments sidebar */}
      <div onClick={toggleCommentsSidebar}>
        <VeltSidebarButton />
      </div>
      {/* [Velt] Add comment tool - click to target any panel with data-velt-target-comment-element-id */}
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
    </div>
  );
}
