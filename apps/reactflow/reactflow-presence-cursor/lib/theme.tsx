"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const savedTheme = localStorage.getItem("theme") as Theme
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
        setTheme(savedTheme)
      } else if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark")
      }
    } catch (error) {
      console.warn("Failed to load theme from localStorage:", error)
      setTheme("light")
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem("theme", theme)
        document.documentElement.classList.toggle("dark", theme === "dark")
      } catch (error) {
        console.warn("Failed to save theme to localStorage:", error)
      }
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      </div>
    )
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
