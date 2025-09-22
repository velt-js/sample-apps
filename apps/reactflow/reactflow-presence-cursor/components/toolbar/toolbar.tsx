"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme"
// [Velt] Presence
import { Presence } from "@/components/velt/VeltTools"
// [Velt] Login UI moved here
import { VeltLoginPill } from "@/components/velt/VeltInitializeUser"
import {
  IconSun,
  IconMoon,
  IconDeviceFloppy,
  IconDownload,
  IconShare,
  IconZoomIn,
  IconZoomOut,
  IconFocus2,
} from "@tabler/icons-react"

export function Toolbar() {
  const { theme, toggleTheme } = useTheme()

  const handleZoomIn = () => {
    if ((window as any).flowZoomIn) {
      ;(window as any).flowZoomIn()
    }
  }

  const handleZoomOut = () => {
    if ((window as any).flowZoomOut) {
      ;(window as any).flowZoomOut()
    }
  }

  const handleFitView = () => {
    if ((window as any).flowFitView) {
      ;(window as any).flowFitView()
    }
  }

  const handleSave = () => {
    if ((window as any).flowSave) {
      ;(window as any).flowSave()
    }
  }

  const handleExport = () => {
    if ((window as any).flowExport) {
      ;(window as any).flowExport()
    }
  }

  const handleShare = () => {
    if ((window as any).flowShare) {
      ;(window as any).flowShare()
    }
  }

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-background border-b border-border">
      {/* Left section - Logo/Title */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-foreground">Flowchart Studio</h1>
      </div>

      {/* Center section - Main actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleZoomIn}
          aria-label="Zoom in"
          className="transition-all duration-150 ease-in-out hover:bg-accent focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <IconZoomIn className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleZoomOut}
          aria-label="Zoom out"
          className="transition-all duration-150 ease-in-out hover:bg-accent focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <IconZoomOut className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleFitView}
          aria-label="Fit view"
          className="transition-all duration-150 ease-in-out hover:bg-accent focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <IconFocus2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Right section - File actions and theme toggle */}
      <div className="flex items-center gap-2">
        {/* [Velt] Login UI */}
        <VeltLoginPill />

        <Button
          variant="ghost"
          size="sm"
          onClick={handleSave}
          aria-label="Save flowchart"
          className="transition-all duration-150 ease-in-out hover:bg-accent focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <IconDeviceFloppy className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleExport}
          aria-label="Export flowchart"
          className="transition-all duration-150 ease-in-out hover:bg-accent focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <IconDownload className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleShare}
          aria-label="Share flowchart"
          className="transition-all duration-150 ease-in-out hover:bg-accent focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <IconShare className="h-4 w-4" />
        </Button>

        {/* [Velt] Presence */}
        <Presence /> {/* [Velt] */}

        <div className="w-px h-6 bg-border mx-2" />

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          className="transition-all duration-150 ease-in-out hover:bg-accent focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          {theme === "light" ? <IconMoon className="h-4 w-4" /> : <IconSun className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
