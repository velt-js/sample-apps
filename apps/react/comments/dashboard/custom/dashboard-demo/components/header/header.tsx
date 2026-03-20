"use client";

import { VeltSidebarButton } from "@veltdev/react";
import VeltTools from "@/components/velt/VeltTools";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface HeaderProps {
  toggleCommentsSidebar: () => void;
}

export default function Header({ toggleCommentsSidebar }: HeaderProps) {
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
      <VeltTools>
        {/* [Velt] Toggle comments sidebar */}
        <div onClick={toggleCommentsSidebar}>
          <VeltSidebarButton />
        </div>
      </VeltTools>
    </div>
  );
}
