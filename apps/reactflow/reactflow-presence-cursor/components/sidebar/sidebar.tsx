"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  IconSquare,
  IconCircle,
  IconDiamond,
  IconArrowRight,
  IconPlus,
  IconTrash,
  IconCopy,
  IconStack2,
  IconSettings,
  IconMenu2,
} from "@tabler/icons-react"
import { useState } from "react"

const nodeTypes = [
  { id: "rectangle", icon: IconSquare, label: "Rectangle" },
  { id: "circle", icon: IconCircle, label: "Circle" },
  { id: "diamond", icon: IconDiamond, label: "Diamond" },
]

const tools = [
  { id: "select", icon: IconArrowRight, label: "Select" },
  { id: "add", icon: IconPlus, label: "Add Node" },
  { id: "delete", icon: IconTrash, label: "Delete" },
  { id: "copy", icon: IconCopy, label: "Copy" },
]

interface SidebarProps {
  activeTool?: string
  onToolChange?: (tool: string) => void
}

export function Sidebar({ activeTool = "select", onToolChange }: SidebarProps) {
  const [activeNodeType, setActiveNodeType] = useState<string | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleToolClick = (toolId: string) => {
    // One-shot tools trigger an action and revert to select
    if (toolId === "add" && (window as any).flowAddNode) {
      ;(window as any).flowAddNode()
      onToolChange?.("select")
      return
    }

    // Execute tool-specific actions
    if (toolId === "delete" && (window as any).flowDeleteSelected) {
      ;(window as any).flowDeleteSelected()
      onToolChange?.("select")
      return
    }
    if (toolId === "copy" && (window as any).flowCopySelected) {
      ;(window as any).flowCopySelected()
      onToolChange?.("select")
      return
    }

    // Default: set mode (e.g., select)
    onToolChange?.(toolId)
  }

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <div
      className={`${isCollapsed ? "w-16" : "w-64"} h-full bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out`}
    >
      {/* Collapse toggle - mobile only */}
      <div className="lg:hidden p-2 border-b border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="w-full justify-start gap-2"
        >
          <IconMenu2 className="h-4 w-4" />
          {!isCollapsed && <span>Menu</span>}
        </Button>
      </div>

      {/* Tools Section */}
      <div className="p-4 border-b border-sidebar-border">
        <h3 className={`text-sm font-medium text-sidebar-foreground mb-3 ${isCollapsed ? "sr-only" : ""}`}>Tools</h3>
        <div className={`grid ${isCollapsed ? "grid-cols-1" : "grid-cols-2"} gap-2`}>
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Button
                key={tool.id}
                variant={activeTool === tool.id ? "default" : "ghost"}
                size="sm"
                onClick={() => handleToolClick(tool.id)}
                aria-label={tool.label}
                aria-pressed={activeTool === tool.id}
                className={`flex ${isCollapsed ? "justify-center" : "flex-col"} items-center gap-1 h-auto py-3 transition-all duration-150 ease-in-out focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2`}
              >
                <Icon className="h-4 w-4" />
                {!isCollapsed && <span className="text-xs">{tool.label}</span>}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Node Types Section */}
      <div className="p-4 border-b border-sidebar-border">
        <h3 className={`text-sm font-medium text-sidebar-foreground mb-3 ${isCollapsed ? "sr-only" : ""}`}>
          Node Types
        </h3>
        <div className="space-y-2">
          {nodeTypes.map((nodeType) => {
            const Icon = nodeType.icon
            return (
              <div
                key={nodeType.id}
                draggable
                onDragStart={(event) => onDragStart(event, nodeType.id)}
                onClick={() => {
                  setActiveNodeType(nodeType.id)
                  try {
                    if (typeof window !== "undefined") {
                      ;(window as any).flowSelectedNodeType = nodeType.id
                      window.dispatchEvent(new Event("flow:nodetype-changed"))
                    }
                  } catch {}
                }}
                className={`
                  flex items-center ${isCollapsed ? "justify-center" : "gap-3"} p-3 rounded-md cursor-grab active:cursor-grabbing
                  transition-all duration-150 ease-in-out
                  hover:bg-sidebar-accent focus:bg-sidebar-accent focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2
                  ${activeNodeType === nodeType.id ? "bg-sidebar-accent" : ""}
                `}
                tabIndex={0}
                role="button"
                aria-label={`Drag to add ${nodeType.label} node`}
                aria-pressed={activeNodeType === nodeType.id}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setActiveNodeType(nodeType.id)
                  }
                }}
              >
                <Icon className="h-5 w-5 text-sidebar-foreground flex-shrink-0" />
                {!isCollapsed && <span className="text-sm text-sidebar-foreground">{nodeType.label}</span>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Layers Section */}
      <div className="p-4 border-b border-sidebar-border flex-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-sm font-medium text-sidebar-foreground ${isCollapsed ? "sr-only" : ""}`}>Layers</h3>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Layer settings"
            className="h-6 w-6 p-0 hover:bg-sidebar-accent focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2"
          >
            <IconStack2 className="h-3 w-3" />
          </Button>
        </div>
        {!isCollapsed && (
          <div className="space-y-1" role="list" aria-label="Layer list">
            <div
              className="flex items-center gap-2 p-2 rounded text-sm text-sidebar-foreground hover:bg-sidebar-accent cursor-pointer focus:bg-sidebar-accent focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2"
              role="listitem"
              tabIndex={0}
              aria-label="Main Flow layer"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full" aria-hidden="true" />
              <span>Main Flow</span>
            </div>
            <div
              className="flex items-center gap-2 p-2 rounded text-sm text-sidebar-foreground hover:bg-sidebar-accent cursor-pointer focus:bg-sidebar-accent focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2"
              role="listitem"
              tabIndex={0}
              aria-label="Annotations layer"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true" />
              <span>Annotations</span>
            </div>
          </div>
        )}
      </div>

      {/* Settings */}
      <div className="p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            console.log("[v0] Settings clicked - could open settings modal")
          }}
          className={`w-full ${isCollapsed ? "justify-center" : "justify-start gap-2"} text-sidebar-foreground hover:bg-sidebar-accent focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2`}
          aria-label="Open settings"
        >
          <IconSettings className="h-4 w-4" />
          {!isCollapsed && "Settings"}
        </Button>
      </div>
    </div>
  )
}
