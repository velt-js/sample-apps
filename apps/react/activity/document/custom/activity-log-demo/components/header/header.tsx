"use client";

import { VeltSidebarButton, useAllActivities } from "@veltdev/react";
import VeltTools from "@/components/velt/VeltTools";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface HeaderProps {
  toggleCommentsSidebar: () => void;
  toggleActivityLog: () => void;
}

export default function Header({ toggleCommentsSidebar, toggleActivityLog }: HeaderProps) {
  // [Velt] Live activity subscription. Returns null while loading — handle it
  // explicitly before reading .length so first paint never throws.
  const activities = useAllActivities();
  const eventCount = activities === null ? null : activities.length;

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
      <ThemeToggle />

      {/* [Velt] Toggle the Activity Log drawer; badge shows live event count */}
      <button
        onClick={toggleActivityLog}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 12px",
          borderRadius: "8px",
          border: "1px solid var(--app-border)",
          background: "var(--app-surface)",
          color: "var(--app-text-primary)",
          fontSize: "13px",
          cursor: "pointer",
        }}
      >
        <span>Activity</span>
        <span style={{ fontSize: "11px", color: "var(--app-text-tertiary)" }}>
          {eventCount === null ? "…" : `${eventCount} events`}
        </span>
      </button>

      <VeltTools>
        {/* [Velt] Toggle comments sidebar */}
        <div onClick={toggleCommentsSidebar}>
          <VeltSidebarButton />
        </div>
      </VeltTools>
    </div>
  );
}
