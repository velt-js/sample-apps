"use client"

import { useTheme } from "@/lib/theme"
import { IconSun, IconMoon, IconMenu2, IconSearch, IconBell } from "@tabler/icons-react"
import { useCallback } from "react"
import { Presence } from "@/components/velt/VeltTools" // [Velt]

export function Toolbar() {
  const { theme, toggleTheme } = useTheme()

  const handleThemeToggle = useCallback(() => {
    toggleTheme()
  }, [toggleTheme])

  return (
    <header className="h-14 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface))] flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded-md hover:bg-[rgb(var(--border))] transition-colors focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
          aria-label="Menu"
          tabIndex={0}
        >
          <IconMenu2 size={20} />
        </button>
        <h1 className="text-lg font-semibold">Document Editor</h1>
      </div>

      <div className="flex items-center gap-2">
        <Presence /> {/* [Velt] */}
        <button
          className="p-2 rounded-md hover:bg-[rgb(var(--border))] transition-colors focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
          aria-label="Search"
          tabIndex={0}
        >
          <IconSearch size={20} />
        </button>
        <button
          className="p-2 rounded-md hover:bg-[rgb(var(--border))] transition-colors focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
          aria-label="Notifications"
          tabIndex={0}
        >
          <IconBell size={20} />
        </button>
        <button
          onClick={handleThemeToggle}
          className="p-2 rounded-md hover:bg-[rgb(var(--border))] transition-colors focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          tabIndex={0}
        >
          {theme === "light" ? <IconMoon size={20} /> : <IconSun size={20} />}
        </button>
      </div>
    </header>
  )
}
