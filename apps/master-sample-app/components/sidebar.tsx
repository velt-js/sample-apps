"use client"

import { Search, ChevronRight, Plus, Minus, Menu } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  currentSampleId?: string
  onSampleSelect?: (sampleId: string) => void
}

export function Sidebar({ isOpen, onToggle, currentSampleId, onSampleSelect }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    cursors: true,
    comments: true,
  })
  const [selectedItem, setSelectedItem] = useState<string>("playground")
  const [activePill, setActivePill] = useState<"app-type" | "feature">("feature")

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <>
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border transition-all duration-150 ease-in-out z-50",
          isOpen ? "w-[200px]" : "w-0 overflow-hidden",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-4 border-b border-sidebar-border">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-sidebar-primary">
              <span className="text-xs font-bold text-sidebar-primary-foreground">V</span>
            </div>
            <span className="text-sm font-mono text-sidebar-foreground">
              Velt <span className="text-muted-foreground">[EXAMPLES]</span>
            </span>
          </div>

          {/* Search */}
          <div className="px-3 py-3">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-md bg-sidebar-accent px-8 py-1.5 text-xs font-mono text-sidebar-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-sidebar-ring"
              />
            </div>
          </div>

          <div className="px-3 pb-3">
            <div className="flex items-center gap-1 rounded-lg bg-secondary p-1">
              <button
                onClick={() => setActivePill("app-type")}
                className={cn(
                  "flex-1 rounded-md px-2 py-1.5 text-[11px] font-bold font-mono uppercase tracking-wide transition-colors",
                  activePill === "app-type" ? "bg-[#ffc31c] text-black" : "text-muted-foreground hover:text-foreground",
                )}
              >
                APP TYPE
              </button>
              <button
                onClick={() => setActivePill("feature")}
                className={cn(
                  "flex-1 rounded-md px-2 py-1.5 text-[11px] font-bold font-mono uppercase tracking-wide transition-colors",
                  activePill === "feature" ? "bg-[#ffc31c] text-black" : "text-muted-foreground hover:text-foreground",
                )}
              >
                FEATURE
              </button>
            </div>
          </div>

          {/* Navigation Tree */}
          <nav className="flex-1 overflow-y-auto px-3">
            {activePill === "feature" ? (
              <>
                {/* Cursors Section */}
                <div className="mb-1">
                  <button
                    onClick={() => toggleSection("cursors")}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent"
                  >
                    <span>Cursors</span>
                    <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.cursors && "rotate-90")} />
                  </button>
                  {expandedSections.cursors && (
                    <div className="mt-2 space-y-1">
                      <button
                        onClick={() => {
                          setSelectedItem("playground")
                          onSampleSelect?.("cursors-playground")
                        }}
                        className={cn(
                          "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                          selectedItem === "playground" ? "bg-secondary" : "hover:bg-secondary/50",
                        )}
                      >
                        Playground
                      </button>
                    </div>
                  )}
                </div>

                {/* Comments Section */}
                <div className="mb-1">
                  <button
                    onClick={() => toggleSection("comments")}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent"
                  >
                    <span>Comments</span>
                    <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.comments && "rotate-90")} />
                  </button>
                  {expandedSections.comments && (
                    <div className="mt-2 space-y-1">
                      <div className="text-sm font-mono font-semibold text-muted-foreground px-3 py-1.5 uppercase tracking-wider">
                        TABLE
                      </div>
                      <button
                        onClick={() => {
                          setSelectedItem("custom")
                          onSampleSelect?.("tiptap-crdt")
                        }}
                        className={cn(
                          "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                          selectedItem === "custom" ? "bg-secondary" : "hover:bg-secondary/50",
                        )}
                      >
                        Custom
                      </button>
                      <button
                        onClick={() => setSelectedItem("ag-grid")}
                        className={cn(
                          "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-muted-foreground transition-colors",
                          selectedItem === "ag-grid" ? "bg-secondary" : "hover:bg-secondary/50",
                        )}
                      >
                        AG Grid
                      </button>
                      <button
                        onClick={() => setSelectedItem("text-plus")}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-mono text-muted-foreground hover:bg-secondary/50 transition-colors"
                      >
                        <span>TEXT</span>
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setSelectedItem("text-minus")}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-mono text-muted-foreground hover:bg-secondary/50 transition-colors"
                      >
                        <span>TEXT</span>
                        <Minus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setSelectedItem("blocknote")}
                        className={cn(
                          "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-muted-foreground transition-colors",
                          selectedItem === "blocknote" ? "bg-secondary" : "hover:bg-secondary/50",
                        )}
                      >
                        BlockNote
                      </button>
                    </div>
                  )}
                </div>

                {/* CRDT Section */}
                <div className="mb-1">
                  <button
                    onClick={() => toggleSection("crdt")}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent"
                  >
                    <span>CRDT</span>
                    <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.crdt && "rotate-90")} />
                  </button>
                </div>

                {/* Recording Sections */}
                <div className="mb-1">
                  <button
                    onClick={() => toggleSection("recording1")}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent"
                  >
                    <span>Recording</span>
                    <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.recording1 && "rotate-90")} />
                  </button>
                </div>
                <div className="mb-1">
                  <button
                    onClick={() => toggleSection("recording2")}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent"
                  >
                    <span>Recording</span>
                    <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.recording2 && "rotate-90")} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-1">
                  <button
                    onClick={() => setSelectedItem("canvas")}
                    className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors bg-sidebar-accent"
                  >
                    Canvas
                  </button>
                </div>
                <div className="mb-1">
                  <button
                    onClick={() => setSelectedItem("video-editor")}
                    className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground hover:bg-secondary/50 transition-colors"
                  >
                    Video Editor
                  </button>
                </div>
                <div className="mb-1">
                  <button
                    onClick={() => setSelectedItem("workflow-builder")}
                    className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground hover:bg-secondary/50 transition-colors"
                  >
                    Workflow Builder
                  </button>
                </div>
              </>
            )}
          </nav>

          <div className="border-t border-sidebar-border px-3 py-3">
            <div className="flex items-center justify-center gap-0.5 bg-secondary rounded-full px-2 py-1.5 w-fit mx-auto">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </aside>

      {/* Toggle Button (visible when sidebar is closed) */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed left-4 top-4 z-50 flex h-8 w-8 items-center justify-center rounded-md bg-sidebar hover:bg-sidebar-accent transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="h-4 w-4 text-sidebar-foreground" />
        </button>
      )}
    </>
  )
}
