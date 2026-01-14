"use client";
import {
  VeltPresence,
  VeltCommentTool,
  VeltSidebarButton,
  VeltNotificationsTool,
} from "@veltdev/react";

/**
 * VeltTools - Top-right toolbar containing all Velt collaboration controls
 *
 * Component order (LEFT to RIGHT):
 * 1. Presence - Shows online users
 * 2. Freestyle Comments - VeltCommentTool for pin comments
 * 3. Text Comments - Enabled via textMode on VeltComments (auto-appears on text selection)
 * 4. Sidebar - Toggle comments sidebar
 * 5. Notifications - Notification panel
 * 6. Custom Annotation Dropdown - Configured in VeltCollaboration (appears in comment dialog)
 */
function VeltTools() {
  return (
    <>
      {/* 1. [Velt] Show online users - Presence */}
      <VeltPresence />

      {/* 2. [Velt] Freestyle Comments - Click to pin comments anywhere */}
      <VeltCommentTool />

      {/* 3. Text Comments - Enabled via textMode={true} on VeltComments */}
      {/* Auto-appears when user selects text, no separate toolbar button needed */}

      {/* 4. [Velt] Toggle comments sidebar */}
      <VeltSidebarButton />

      {/* 5. [Velt] Notifications panel */}
      <VeltNotificationsTool
        settings={true}
        shadowDom={false}
        tabConfig={{
          forYou: { name: "For You", enable: true },
          documents: { name: "Documents", enable: true },
          all: { name: "All", enable: true },
        }}
      />

      {/* 6. Custom Annotation Dropdown - Configured in VeltCollaboration */}
      {/* Appears within the comment dialog, not as a toolbar button */}
    </>
  );
}

export default VeltTools;
