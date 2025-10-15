"use client";
import {
  VeltPresence,
  VeltSidebarButton,
  VeltNotificationsTool,
  VeltCommentTool,
  VeltHuddleTool
} from "@veltdev/react";

// Individual, importable wrappers
export function Presence() {
  return <VeltPresence />;
}

export function SidebarButton() {
  return <VeltSidebarButton />;
}

export function NotificationsTool() {
  return (
    <VeltNotificationsTool
      settings={true}
      shadowDom={false}
      tabConfig={{
        forYou: { name: "For You", enable: true },
        documents: { name: "Payrolls", enable: true },
        all: { name: "All", enable: true },
      }}
    />
  );
}

export function CommentTool() {
  return <VeltCommentTool />;
}

export function HuddleTool() {
  return <VeltHuddleTool type='all' />;
}

// Aggregator that renders all tools together
function VeltTools() {
  return (
    <>
      <SidebarButton />
      <NotificationsTool />
      <Presence />
      <CommentTool />
      <HuddleTool />
    </>
  );
}

export default VeltTools;
export { VeltTools };

