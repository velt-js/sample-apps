"use client"

import { IconFile, IconFolder, IconSettings, IconUsers, IconHome } from "@tabler/icons-react"
import { useState, useCallback } from "react"

const navigationItems = [
  { icon: IconHome, label: "Home", id: "home" },
  { icon: IconFile, label: "Documents", id: "documents" },
  { icon: IconFolder, label: "Projects", id: "projects" },
  { icon: IconUsers, label: "Collaborators", id: "collaborators" },
  { icon: IconSettings, label: "Settings", id: "settings" },
]

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("documents")

  const handleItemClick = useCallback((id: string) => {
    setActiveItem(id)
  }, [])

  return (
    <aside className="w-64 border-r border-[rgb(var(--border))] bg-[rgb(var(--surface))] flex flex-col">
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id

            return (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] ${
                    isActive
                      ? "bg-[rgb(var(--primary))] text-white"
                      : "hover:bg-[rgb(var(--border))] text-[rgb(var(--text))]"
                  }`}
                  aria-label={item.label}
                  tabIndex={0}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-[rgb(var(--border))]">
        <div className="text-sm text-[rgb(var(--text-muted))]">Velt Extension Point</div>
      </div>
    </aside>
  )
}
