"use client";

import VeltTools from "@/components/velt/VeltTools";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function Header() {
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
      <VeltTools />
    </div>
  );
}
