"use client"

import { Search, ChevronRight, Menu } from "lucide-react"
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
    react: true,
    canvas: true,
    libraries: true,
    tables: true,
    tablesLibraries: true,
    aggrid: true,
    tanstack: true,
    reactflow: true,
    textEditors: true,
    textEditorLibraries: true,
    tiptap: true,
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

                {/* React Section with nested hierarchy */}
                <div className="mb-1">
                  <button
                    onClick={() => toggleSection("react")}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent"
                  >
                    <span>React</span>
                    <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.react && "rotate-90")} />
                  </button>
                  {expandedSections.react && (
                    <div className="mt-2 ml-2 space-y-1">
                      {/* Canvas Section */}
                      <button
                        onClick={() => toggleSection("canvas")}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/50"
                      >
                        <span>Canvas</span>
                        <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.canvas && "rotate-90")} />
                      </button>
                      {expandedSections.canvas && (
                        <div className="mt-2 ml-2 space-y-1">
                          {/* Libraries Section */}
                          <button
                            onClick={() => toggleSection("libraries")}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/30"
                          >
                            <span>Libraries</span>
                            <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.libraries && "rotate-90")} />
                          </button>
                          {expandedSections.libraries && (
                            <div className="mt-2 ml-2 space-y-1">
                              {/* ReactFlow Section */}
                              <button
                                onClick={() => toggleSection("reactflow")}
                                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/20"
                              >
                                <span>ReactFlow</span>
                                <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.reactflow && "rotate-90")} />
                              </button>
                              {expandedSections.reactflow && (
                                <div className="mt-2 ml-2 space-y-1">
                                  <button
                                    onClick={() => {
                                      setSelectedItem("reactflow-demo")
                                      onSampleSelect?.("react-canvas-libraries-reactflow-reactflow-demo")
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

                      {/* Tables Section */}
                      <button
                        onClick={() => toggleSection("tables")}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/50"
                      >
                        <span>Tables</span>
                        <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.tables && "rotate-90")} />
                      </button>
                      {expandedSections.tables && (
                        <div className="mt-2 ml-2 space-y-1">
                          {/* Tables Libraries Section */}
                          <button
                            onClick={() => toggleSection("tablesLibraries")}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/30"
                          >
                            <span>Libraries</span>
                            <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.tablesLibraries && "rotate-90")} />
                          </button>
                          {expandedSections.tablesLibraries && (
                            <div className="mt-2 ml-2 space-y-1">
                              {/* AgGrid Section */}
                              <button
                                onClick={() => toggleSection("aggrid")}
                                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/20"
                              >
                                <span>AG Grid</span>
                                <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.aggrid && "rotate-90")} />
                              </button>
                              {expandedSections.aggrid && (
                                <div className="mt-2 ml-2 space-y-1">
                                  <button
                                    onClick={() => {
                                      setSelectedItem("multiple-tools")
                                      onSampleSelect?.("react-tables-libraries-aggrid-multiple-tools")
                                    }}
                                    className={cn(
                                      "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                      selectedItem === "multiple-tools" ? "bg-secondary" : "hover:bg-secondary/50",
                                    )}
                                  >
                                    multiple-tools
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedItem("single-tool")
                                      onSampleSelect?.("react-tables-libraries-aggrid-single-tool")
                                    }}
                                    className={cn(
                                      "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                      selectedItem === "single-tool" ? "bg-secondary" : "hover:bg-secondary/50",
                                    )}
                                  >
                                    single-tool
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedItem("comment-aggregation")
                                      onSampleSelect?.("react-tables-libraries-aggrid-comment-aggregation")
                                    }}
                                    className={cn(
                                      "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                      selectedItem === "comment-aggregation" ? "bg-secondary" : "hover:bg-secondary/50",
                                    )}
                                  >
                                    comment-aggregation
                                  </button>
                                </div>
                              )}

                              {/* TanStack Section */}
                              <button
                                onClick={() => toggleSection("tanstack")}
                                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/20"
                              >
                                <span>TanStack</span>
                                <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.tanstack && "rotate-90")} />
                              </button>
                              {expandedSections.tanstack && (
                                <div className="mt-2 ml-2 space-y-1">
                                  <button
                                    onClick={() => {
                                      setSelectedItem("tanstack-multiple-tools")
                                      onSampleSelect?.("react-tables-libraries-tanstack-multiple-tools")
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
                                      onSampleSelect?.("react-tables-libraries-tanstack-single-tool")
                                    }}
                                    className={cn(
                                      "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                      selectedItem === "tanstack-single-tool" ? "bg-secondary" : "hover:bg-secondary/50",
                                    )}
                                  >
                                    single-tool
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedItem("tanstack-comment-aggregation")
                                      onSampleSelect?.("react-tables-libraries-tanstack-comment-aggregation")
                                    }}
                                    className={cn(
                                      "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                      selectedItem === "tanstack-comment-aggregation" ? "bg-secondary" : "hover:bg-secondary/50",
                                    )}
                                  >
                                    comment-aggregation
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
              
              {/* Text Editors Section - Hidden for now */}
              {/* <button
                onClick={() => toggleSection("textEditors")}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/50"
              >
                <span>Text Editors</span>
                <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.textEditors && "rotate-90")} />
              </button>
              {expandedSections.textEditors && (
                <div className="mt-2 ml-2 space-y-1">
                  <button
                    onClick={() => toggleSection("textEditorLibraries")}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/30"
                  >
                    <span>Libraries</span>
                    <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.textEditorLibraries && "rotate-90")} />
                  </button>
                  {expandedSections.textEditorLibraries && (
                    <div className="mt-2 ml-2 space-y-1">
                      <button
                        onClick={() => toggleSection("tiptap")}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/20"
                      >
                        <span>TipTap</span>
                        <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.tiptap && "rotate-90")} />
                      </button>
                      {expandedSections.tiptap && (
                        <div className="mt-2 ml-2 space-y-1">
                          <button
                            onClick={() => {
                              setSelectedItem("tiptap-demo")
                              onSampleSelect?.("react-text-editors-libraries-tiptap-tiptap-demo")
                            }}
                            className={cn(
                              "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                              selectedItem === "tiptap-demo" ? "bg-secondary" : "hover:bg-secondary/50",
                            )}
                          >
                            tiptap-demo
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )} */}
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
