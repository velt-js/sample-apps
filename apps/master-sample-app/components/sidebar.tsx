"use client"

import { Search, ChevronRight, Menu } from "lucide-react"
import { useState, useEffect } from "react"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  currentSampleId?: string
  onSampleSelect?: (sampleId: string) => void
}

// Map full sample IDs to sidebar item names
const sampleIdToItemName = (sampleId: string): string => {
  const mapping: Record<string, string> = {
    'cursors-playground': 'playground',
    'react-crdt-canvas-reactflow-reactflow-demo': 'reactflow-demo',
    'react-comments-tables-aggrid-multiple-tools': 'aggrid-multiple-tools',
    'react-comments-tables-aggrid-single-tool': 'aggrid-single-tool',
    'react-comments-tables-aggrid-comment-aggregation': 'aggrid-comment-aggregation',
    'react-comments-tables-tanstack-comment-aggregation': 'tanstack-comment-aggregation',
    'react-comments-tables-tanstack-multiple-tools': 'tanstack-multiple-tools',
    'react-comments-tables-tanstack-single-tool': 'tanstack-single-tool',
    'react-comments-text-editors-tiptap-tiptap-comments-demo': 'tiptap-comments-demo',
  }
  return mapping[sampleId] || 'playground'
}

export function Sidebar({ isOpen, onToggle, currentSampleId, onSampleSelect }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    cursors: true,
    comments: true,
    commentsTables: true,
    agGrid: true,
    tanstack: true,
    commentsTextEditors: true,
    tiptap: true,
    crdt: true,
    crdtCanvas: true,
    reactflow: true,
  })
  const [selectedItem, setSelectedItem] = useState<string>(() => {
    // Initialize with current sample ID if available
    return currentSampleId ? sampleIdToItemName(currentSampleId) : 'playground'
  })
  const [activePill, setActivePill] = useState<"app-type" | "feature">("feature")

  // Sync selectedItem with currentSampleId when it changes
  useEffect(() => {
    if (currentSampleId) {
      setSelectedItem(sampleIdToItemName(currentSampleId))
    }
  }, [currentSampleId])

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

          {/* Search - Hidden for now, keeping for future use */}
          <div className="px-3 py-3 hidden">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-md bg-sidebar-accent px-8 py-1.5 text-xs font-mono text-sidebar-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-sidebar-ring"
              />
            </div>
          </div>

          {/* Feature tab - showing only FEATURE, APP TYPE hidden */}
          <div className="px-3 pb-3">
            <div className="flex items-center gap-1 rounded-lg bg-secondary p-1">
              <button
                onClick={() => setActivePill("feature")}
                className={cn(
                  "w-full rounded-md px-2 py-1.5 text-[11px] font-bold font-mono uppercase tracking-wide transition-colors bg-[#ffc31c] text-black"
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
                    <div className="mt-2 ml-2 space-y-1">
                      {/* Tables Section */}
                      <button
                        onClick={() => toggleSection("commentsTables")}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/50"
                      >
                        <span>Tables</span>
                        <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.commentsTables && "rotate-90")} />
                      </button>
                      {expandedSections.commentsTables && (
                        <div className="mt-2 ml-2 space-y-1">
                          {/* AG Grid Section */}
                          <button
                            onClick={() => toggleSection("agGrid")}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/30"
                          >
                            <span>AG Grid</span>
                            <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.agGrid && "rotate-90")} />
                          </button>
                          {expandedSections.agGrid && (
                            <div className="mt-2 ml-2 space-y-1">
                              <button
                                onClick={() => {
                                  setSelectedItem("aggrid-comment-aggregation")
                                  onSampleSelect?.("react-comments-tables-aggrid-comment-aggregation")
                                }}
                                className={cn(
                                  "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                  selectedItem === "aggrid-comment-aggregation" ? "bg-secondary" : "hover:bg-secondary/50",
                                )}
                              >
                                comment-aggregation
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedItem("aggrid-multiple-tools")
                                  onSampleSelect?.("react-comments-tables-aggrid-multiple-tools")
                                }}
                                className={cn(
                                  "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                  selectedItem === "aggrid-multiple-tools" ? "bg-secondary" : "hover:bg-secondary/50",
                                )}
                              >
                                multiple-tools
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedItem("aggrid-single-tool")
                                  onSampleSelect?.("react-comments-tables-aggrid-single-tool")
                                }}
                                className={cn(
                                  "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                  selectedItem === "aggrid-single-tool" ? "bg-secondary" : "hover:bg-secondary/50",
                                )}
                              >
                                single-tool
                              </button>
                            </div>
                          )}

                          {/* TanStack Section */}
                          <button
                            onClick={() => toggleSection("tanstack")}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/30"
                          >
                            <span>TanStack</span>
                            <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.tanstack && "rotate-90")} />
                          </button>
                          {expandedSections.tanstack && (
                            <div className="mt-2 ml-2 space-y-1">
                              <button
                                onClick={() => {
                                  setSelectedItem("tanstack-comment-aggregation")
                                  onSampleSelect?.("react-comments-tables-tanstack-comment-aggregation")
                                }}
                                className={cn(
                                  "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                  selectedItem === "tanstack-comment-aggregation" ? "bg-secondary" : "hover:bg-secondary/50",
                                )}
                              >
                                comment-aggregation
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedItem("tanstack-multiple-tools")
                                  onSampleSelect?.("react-comments-tables-tanstack-multiple-tools")
                                }}
                                className={cn(
                                  "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                  selectedItem === "tanstack-multiple-tools" ? "bg-secondary" : "hover:bg-secondary/50",
                                )}
                              >
                                multiple-tools
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedItem("tanstack-single-tool")
                                  onSampleSelect?.("react-comments-tables-tanstack-single-tool")
                                }}
                                className={cn(
                                  "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                  selectedItem === "tanstack-single-tool" ? "bg-secondary" : "hover:bg-secondary/50",
                                )}
                              >
                                single-tool
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Text Editors Section */}
                      <button
                        onClick={() => toggleSection("commentsTextEditors")}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/50"
                      >
                        <span>Text Editors</span>
                        <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.commentsTextEditors && "rotate-90")} />
                      </button>
                      {expandedSections.commentsTextEditors && (
                        <div className="mt-2 ml-2 space-y-1">
                          {/* Tiptap Section */}
                          <button
                            onClick={() => toggleSection("tiptap")}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/30"
                          >
                            <span>Tiptap</span>
                            <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.tiptap && "rotate-90")} />
                          </button>
                          {expandedSections.tiptap && (
                            <div className="mt-2 ml-2 space-y-1">
                              <button
                                onClick={() => {
                                  setSelectedItem("tiptap-comments-demo")
                                  onSampleSelect?.("react-comments-text-editors-tiptap-tiptap-comments-demo")
                                }}
                                className={cn(
                                  "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                  selectedItem === "tiptap-comments-demo" ? "bg-secondary" : "hover:bg-secondary/50",
                                )}
                              >
                                tiptap-comments-demo
                              </button>
                            </div>
                          )}
                        </div>
                      )}
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
                  {expandedSections.crdt && (
                    <div className="mt-2 ml-2 space-y-1">
                      {/* Canvas Section */}
                      <button
                        onClick={() => toggleSection("crdtCanvas")}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/50"
                      >
                        <span>Canvas</span>
                        <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.crdtCanvas && "rotate-90")} />
                      </button>
                      {expandedSections.crdtCanvas && (
                        <div className="mt-2 ml-2 space-y-1">
                          {/* ReactFlow Section */}
                          <button
                            onClick={() => toggleSection("reactflow")}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/30"
                          >
                            <span>ReactFlow</span>
                            <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.reactflow && "rotate-90")} />
                          </button>
                          {expandedSections.reactflow && (
                            <div className="mt-2 ml-2 space-y-1">
                              <button
                                onClick={() => {
                                  setSelectedItem("reactflow-demo")
                                  onSampleSelect?.("react-crdt-canvas-reactflow-reactflow-demo")
                                }}
                                className={cn(
                                  "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                  selectedItem === "reactflow-demo" ? "bg-secondary" : "hover:bg-secondary/50",
                                )}
                              >
                                reactflow-demo
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
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
