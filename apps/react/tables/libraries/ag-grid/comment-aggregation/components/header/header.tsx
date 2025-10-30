"use client";

import { useVeltInitState } from "@veltdev/react";
import VeltTools from "@/components/velt/VeltTools";

export default function Header() {
  const veltInitialized = useVeltInitState();

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
      {veltInitialized && <VeltTools />}
    </div>
  );
}
