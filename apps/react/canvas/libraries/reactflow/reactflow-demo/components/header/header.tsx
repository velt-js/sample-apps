"use client";

import { useVeltInitState } from "@veltdev/react";
import { Presence, NotificationsTool, CommentTool, SidebarButton } from '../velt/VeltTools';

export default function Header() {
  const veltInitialized = useVeltInitState();

  return (
    <div className="absolute top-2 right-6 flex items-center gap-1 bg-[#1a1a1a] rounded-full px-2 py-2 shadow-2xl border border-[#2a2a2a] z-50">
      {veltInitialized && (
        <>
          {/* [Velt] SidebarButton (Comment Panel) */}
          <div className="px-2">
            <SidebarButton />
          </div>

          <div className="w-px h-6 bg-[#2a2a2a]" />

          {/* [Velt] NotificationsTool */}
          <div className="px-2">
            <NotificationsTool />
          </div>

          <div className="w-px h-6 bg-[#2a2a2a]" />

          {/* [Velt] Single CommentTool - Click to add popover comments on any element */}
          <div className="px-2">
            <CommentTool />
          </div>

          <div className="w-px h-6 bg-[#2a2a2a]" />

          {/* [Velt] Presence */}
          <div className="px-2">
            <Presence />
          </div>
        </>
      )}
    </div>
  );
}

