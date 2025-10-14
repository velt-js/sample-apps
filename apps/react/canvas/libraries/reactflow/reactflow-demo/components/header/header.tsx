"use client";

import { useVeltInitState, useVeltClient } from "@veltdev/react";
import { Presence, NotificationsTool, CommentTool, SidebarButton } from '../velt/VeltTools';
import { useEffect } from 'react';

export default function Header() {
  const veltInitialized = useVeltInitState();
  const { client } = useVeltClient();

  useEffect(() => {
    if (client) {
      client.setDarkMode(true);
    }
  }, [client]);

  return (
    <div className="absolute top-2 right-6 flex items-center gap-[6px] z-50">
      {veltInitialized && (
        <>
          {/* [Velt] Presence */}
          <Presence />

          {/* [Velt] SidebarButton (Comment Panel) */}
          <SidebarButton />

          {/* [Velt] NotificationsTool */}
          <NotificationsTool />

          {/* [Velt] Single CommentTool - Click to add popover comments on any element */}
          <CommentTool />
        </>
      )}
    </div>
  );
}

