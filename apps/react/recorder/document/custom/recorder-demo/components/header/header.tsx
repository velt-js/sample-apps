"use client";

// [Velt] useRecordings gives a live count for the Recordings drawer badge
import { useRecordings } from "@veltdev/react";
import VeltTools from "@/components/velt/VeltTools";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface HeaderProps {
  toggleRecordings: () => void;
}

export default function Header({ toggleRecordings }: HeaderProps) {
  // [Velt] Live recordings subscription for the current document
  const recordings = useRecordings();
  const count = recordings?.length ?? 0;

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

      {/* Toggle the Recordings drawer; badge shows the live recording count */}
      <button
        onClick={toggleRecordings}
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
        <span>Recordings</span>
        <span style={{ fontSize: "11px", color: "var(--app-text-tertiary)" }}>
          {count}
        </span>
      </button>

      <VeltTools />
    </div>
  );
}
