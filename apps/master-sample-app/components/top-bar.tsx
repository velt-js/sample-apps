"use client"

import { ChevronLeft, Settings, Github } from "lucide-react"
import { cn } from "@/lib/utils"

interface TopBarProps {
  mode: "code" | "demo"
  onModeChange: (mode: "code" | "demo") => void
  sidebarOpen: boolean
  onSidebarToggle: () => void
}

export function TopBar({ mode, onModeChange, sidebarOpen, onSidebarToggle }: TopBarProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4">
      {/* Left: Toggle + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onSidebarToggle}
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent transition-colors"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <ChevronLeft className={cn("h-4 w-4 text-foreground transition-transform", !sidebarOpen && "rotate-180")} />
        </button>
        <h1 className="text-sm font-medium text-foreground">TIPTAP · CRDT DEMO</h1>
      </div>

      {/* Center: Mode Toggle */}
      <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
        <button
          onClick={() => onModeChange("code")}
          className={cn(
            "rounded-md px-4 py-1.5 text-xs font-semibold transition-colors",
            mode === "code" ? "bg-[#ffc31c] text-black" : "text-muted-foreground hover:text-foreground",
          )}
        >
          CODE
        </button>
        <button
          onClick={() => onModeChange("demo")}
          className={cn(
            "rounded-md px-4 py-1.5 text-xs font-semibold transition-colors",
            mode === "demo" ? "bg-[#ffc31c] text-black" : "text-muted-foreground hover:text-foreground",
          )}
        >
          DEMO
        </button>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-2">
        <button className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent transition-colors">
          <Settings className="h-4 w-4 text-foreground" />
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent transition-colors">
          <Github className="h-4 w-4 text-foreground" />
        </button>
      </div>
    </header>
  )
}
