"use client";
import {
  VeltPresence,
  VeltSidebarButton,
} from "@veltdev/react";

function VeltTools() {
  return (
    <>
      {/* [Velt] Show online users */}
      <VeltPresence />
      {/* [Velt] Toggle comments sidebar */}
      <VeltSidebarButton commentCountType="unread"/>
    </>
  );
}

export default VeltTools;
