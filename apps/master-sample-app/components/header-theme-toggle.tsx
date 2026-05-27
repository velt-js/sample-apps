"use client"

import { Sun, Moon, Monitor } from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function HeaderThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex items-center gap-[2px] bg-black/6 dark:bg-[#1e1e1e] rounded-[8px] p-[2px]">
      <button
        onClick={() => setTheme("light")}
        className={cn(
          "flex h-[28px] w-[32px] items-center justify-center rounded-[6px] transition-colors",
          theme === "light" ? "bg-black/10 dark:bg-white/10 text-black dark:text-white" : "text-black/40 dark:text-white/40 hover:text-black/70 dark:hover:text-white/70"
        )}
        title="Light"
      >
        <Sun className="h-[14px] w-[14px]" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={cn(
          "flex h-[28px] w-[32px] items-center justify-center rounded-[6px] transition-colors",
          theme === "dark" ? "bg-black/10 dark:bg-white/10 text-black dark:text-white" : "text-black/40 dark:text-white/40 hover:text-black/70 dark:hover:text-white/70"
        )}
        title="Dark"
      >
        <Moon className="h-[14px] w-[14px]" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={cn(
          "flex h-[28px] w-[32px] items-center justify-center rounded-[6px] transition-colors",
          theme === "system" ? "bg-black/10 dark:bg-white/10 text-black dark:text-white" : "text-black/40 dark:text-white/40 hover:text-black/70 dark:hover:text-white/70"
        )}
        title="System"
      >
        <Monitor className="h-[14px] w-[14px]" />
      </button>
    </div>
  )
}
