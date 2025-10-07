"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <button
        onClick={() => setTheme("dark")}
        className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
          theme === "dark" ? "bg-primary/20" : "hover:bg-primary/10"
        }`}
        aria-label="Dark theme"
      >
        <Moon className="h-3 w-3 text-sidebar-foreground" />
      </button>
      <button
        onClick={() => setTheme("light")}
        className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
          theme === "light" ? "bg-primary/20" : "hover:bg-primary/10"
        }`}
        aria-label="Light theme"
      >
        <Sun className="h-3 w-3 text-sidebar-foreground" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
          theme === "system" ? "bg-primary/20" : "hover:bg-primary/10"
        }`}
        aria-label="System theme"
      >
        <Monitor className="h-3 w-3 text-sidebar-foreground" />
      </button>
    </>
  )
}
