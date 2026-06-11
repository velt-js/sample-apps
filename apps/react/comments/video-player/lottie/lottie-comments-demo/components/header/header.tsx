"use client";

// [Velt] Live list of comment annotations on the current document
import { useCommentAnnotations } from "@veltdev/react";
import VeltTools from "@/components/velt/VeltTools";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface HeaderProps {
  toggleComments: () => void;
}

export default function Header({ toggleComments }: HeaderProps) {
  // [Velt] Subscribes to comment annotation changes for the badge count
  const annotations = useCommentAnnotations();

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

      {/* Toggle the Comments drawer; badge shows the live comment count */}
      <button
        onClick={toggleComments}
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
        <span>Comments</span>
        <span style={{ fontSize: "11px", color: "var(--app-text-tertiary)" }}>
          {annotations?.length ?? 0}
        </span>
      </button>

      <VeltTools />
    </div>
  );
}
