"use client";
import {
  VeltPresence,
  VeltSidebarButton,
  VeltNotificationsTool,
  VeltCommentTool,
} from "@veltdev/react";
import { useCommentsSidebar } from "./CommentsSidebarContext";

function VeltTools() {
  const { toggleCommentsSidebar } = useCommentsSidebar();

  return (
    <>
      {/* [Velt] Show online users */}
      <VeltPresence />
      {/* [Velt] Toggle comments sidebar - Using VeltSidebarButton with custom toggle */}
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
    </>
  );
}

export default VeltTools;
