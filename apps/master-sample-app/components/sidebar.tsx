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
    'react-comments-text-editors-slatejs-slatejs-comments-demo': 'slatejs-comments-demo',
    'react-comments-text-editors-lexical-lexical-comments-demo': 'lexical-comments-demo',
    'react-comments-dashboard-custom-dashboard-demo': 'dashboard-demo',
    'react-comments-dashboard-inline-comments-dashboard-inline-comments-demo': 'dashboard-inline-comments-demo',
    'react-comments-website-builder-freestyle-comments-freestyle-comments-demo': 'freestyle-comments-demo',
    'react-self-hosting-dashboard-mongo-db-dashboard-mongo-db-demo': 'dashboard-mongo-db-demo',
    'react-self-hosting-dashboard-postgres-dashboard-postgres-demo': 'dashboard-postgres-demo',
    'react-self-hosting-forms-page-mode-demo': 'page-mode-demo',
    'react-crdt-text-editors-tiptap-tiptap-crdt-demo': 'tiptap-crdt-demo',
    'react-crdt-text-editors-codemirror-codemirror-crdt-demo': 'codemirror-crdt-demo',
    'react-crdt-text-editors-blocknote-blocknote-demo': 'blocknote-crdt-demo',
    'react-crdt-text-editors-core-core-react-text-crdt-demo': 'core-react-text-crdt-demo',
    'react-crdt-text-editors-core-core-react-array-crdt-demo': 'core-react-array-crdt-demo',
    'react-crdt-text-editors-core-core-react-map-crdt-demo': 'core-react-map-crdt-demo',
    'react-crdt-text-editors-core-core-react-xml-crdt-demo': 'core-react-xml-crdt-demo',
    'javascript-crdt-text-editors-blocknote-blocknote-crdt-demo': 'js-blocknote-crdt-demo',
    'javascript-crdt-text-editors-tiptap-tiptap-crdt-demo': 'js-tiptap-crdt-demo',
  }
  return mapping[sampleId] || 'playground'
}

export function Sidebar({ isOpen, onToggle, currentSampleId, onSampleSelect }: SidebarProps) {
  // Default expanded sections - only reactflow-demo path is expanded
  const defaultExpandedSections = {
    cursors: false,
    comments: false,
    commentsTables: false,
    agGrid: false,
    tanstack: false,
    commentsTextEditors: false,
    tiptap: false,
    slatejs: false,
    lexical: false,
    commentsDashboard: false,
    commentsWebsiteBuilder: false,
    commentsFreestyleComments: false,
    selfHosting: false,
    selfHostingDashboard: false,
    selfHostingMongoDB: false,
    selfHostingPostgres: false,
    selfHostingForms: false,
    crdt: true,
    crdtCanvas: true,
    reactflow: true,
    crdtTextEditors: false,
    crdtTiptap: false,
    crdtCodemirror: false,
    crdtBlocknote: false,
    crdtCore: false,
    javascript: false,
    jsCrdt: false,
    jsCrdtTextEditors: false,
    jsCrdtBlocknote: false,
    jsCrdtTiptap: false,
  }

  // Initialize expandedSections from localStorage or use defaults
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return defaultExpandedSections
    
    try {
      const saved = localStorage.getItem('sidebar-expanded-sections')
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (error) {
      console.error('Error loading sidebar state:', error)
    }
    return defaultExpandedSections
  })

  const [selectedItem, setSelectedItem] = useState<string>(() => {
    // Initialize with current sample ID if available
    return currentSampleId ? sampleIdToItemName(currentSampleId) : 'reactflow-demo'
  })
  const [activePill, setActivePill] = useState<"app-type" | "feature">("feature")

  // Sync selectedItem with currentSampleId when it changes
  useEffect(() => {
    if (currentSampleId) {
      setSelectedItem(sampleIdToItemName(currentSampleId))
    }
  }, [currentSampleId])

  // Save expandedSections to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem('sidebar-expanded-sections', JSON.stringify(expandedSections))
    } catch (error) {
      console.error('Error saving sidebar state:', error)
    }
  }, [expandedSections])

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
                {/* cursors Section */}
                <div className="mb-1">
                  <button
                    onClick={() => toggleSection("cursors")}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent"
                  >
                    <span>cursors</span>
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
                        playground
                      </button>
                    </div>
                  )}
                </div>

                {/* comments Section */}
                <div className="mb-1">
                  <button
                    onClick={() => toggleSection("comments")}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent"
                  >
                    <span>comments</span>
                    <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.comments && "rotate-90")} />
                  </button>
                  {expandedSections.comments && (
                    <div className="mt-2 ml-2 space-y-1">
                      {/* tables Section */}
                      <button
                        onClick={() => toggleSection("commentsTables")}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/50"
                      >
                        <span>tables</span>
                        <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.commentsTables && "rotate-90")} />
                      </button>
                      {expandedSections.commentsTables && (
                        <div className="mt-2 ml-2 space-y-1">
                          {/* ag-grid Section */}
                          <button
                            onClick={() => toggleSection("agGrid")}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/30"
                          >
                            <span>ag-grid</span>
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

                          {/* tanstack Section */}
                          <button
                            onClick={() => toggleSection("tanstack")}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/30"
                          >
                            <span>tanstack</span>
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

                      {/* text-editors Section */}
                      <button
                        onClick={() => toggleSection("commentsTextEditors")}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/50"
                      >
                        <span>text-editors</span>
                        <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.commentsTextEditors && "rotate-90")} />
                      </button>
                      {expandedSections.commentsTextEditors && (
                        <div className="mt-2 ml-2 space-y-1">
                          {/* tiptap Section */}
                          <button
                            onClick={() => toggleSection("tiptap")}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/30"
                          >
                            <span>tiptap</span>
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

                          {/* slatejs Section */}
                          <button
                            onClick={() => toggleSection("slatejs")}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/30"
                          >
                            <span>slatejs</span>
                            <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.slatejs && "rotate-90")} />
                          </button>
                          {expandedSections.slatejs && (
                            <div className="mt-2 ml-2 space-y-1">
                              <button
                                onClick={() => {
                                  setSelectedItem("slatejs-comments-demo")
                                  onSampleSelect?.("react-comments-text-editors-slatejs-slatejs-comments-demo")
                                }}
                                className={cn(
                                  "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                  selectedItem === "slatejs-comments-demo" ? "bg-secondary" : "hover:bg-secondary/50",
                                )}
                              >
                                slatejs-comments-demo
                              </button>
                            </div>
                          )}

                          {/* lexical Section */}
                          <button
                            onClick={() => toggleSection("lexical")}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/30"
                          >
                            <span>lexical</span>
                            <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.lexical && "rotate-90")} />
                          </button>
                          {expandedSections.lexical && (
                            <div className="mt-2 ml-2 space-y-1">
                              <button
                                onClick={() => {
                                  setSelectedItem("lexical-comments-demo")
                                  onSampleSelect?.("react-comments-text-editors-lexical-lexical-comments-demo")
                                }}
                                className={cn(
                                  "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                  selectedItem === "lexical-comments-demo" ? "bg-secondary" : "hover:bg-secondary/50",
                                )}
                              >
                                lexical-comments-demo
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* dashboard Section */}
                      <button
                        onClick={() => toggleSection("commentsDashboard")}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/50"
                      >
                        <span>dashboard</span>
                        <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.commentsDashboard && "rotate-90")} />
                      </button>
                      {expandedSections.commentsDashboard && (
                        <div className="mt-2 ml-2 space-y-1">
                          <button
                            onClick={() => {
                              setSelectedItem("dashboard-demo")
                              onSampleSelect?.("react-comments-dashboard-custom-dashboard-demo")
                            }}
                            className={cn(
                              "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                              selectedItem === "dashboard-demo" ? "bg-secondary" : "hover:bg-secondary/50",
                            )}
                          >
                            dashboard-demo
                          </button>
                          <button
                            onClick={() => {
                              setSelectedItem("dashboard-inline-comments-demo")
                              onSampleSelect?.("react-comments-dashboard-inline-comments-dashboard-inline-comments-demo")
                            }}
                            className={cn(
                              "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                              selectedItem === "dashboard-inline-comments-demo" ? "bg-secondary" : "hover:bg-secondary/50",
                            )}
                          >
                            inline-comments-demo
                          </button>
                        </div>
                      )}

                      {/* website-builder Section */}
                      <button
                        onClick={() => toggleSection("commentsWebsiteBuilder")}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/50"
                      >
                        <span>website-builder</span>
                        <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.commentsWebsiteBuilder && "rotate-90")} />
                      </button>
                      {expandedSections.commentsWebsiteBuilder && (
                        <div className="mt-2 ml-2 space-y-1">
                          {/* freestyle-comments Section */}
                          <button
                            onClick={() => toggleSection("commentsFreestyleComments")}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/30"
                          >
                            <span>freestyle-comments</span>
                            <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.commentsFreestyleComments && "rotate-90")} />
                          </button>
                          {expandedSections.commentsFreestyleComments && (
                            <div className="mt-2 ml-2 space-y-1">
                              <button
                                onClick={() => {
                                  setSelectedItem("freestyle-comments-demo")
                                  onSampleSelect?.("react-comments-website-builder-freestyle-comments-freestyle-comments-demo")
                                }}
                                className={cn(
                                  "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                  selectedItem === "freestyle-comments-demo" ? "bg-secondary" : "hover:bg-secondary/50",
                                )}
                              >
                                freestyle-comments-demo
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* self-hosting Section */}
                <div className="mb-1">
                  <button
                    onClick={() => toggleSection("selfHosting")}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent"
                  >
                    <span>self-hosting</span>
                    <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.selfHosting && "rotate-90")} />
                  </button>
                  {expandedSections.selfHosting && (
                    <div className="mt-2 ml-2 space-y-1">
                      {/* dashboard Section */}
                      <button
                        onClick={() => toggleSection("selfHostingDashboard")}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/50"
                      >
                        <span>dashboard</span>
                        <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.selfHostingDashboard && "rotate-90")} />
                      </button>
                      {expandedSections.selfHostingDashboard && (
                        <div className="mt-2 ml-2 space-y-1">
                          {/* mongo-db Section */}
                          <button
                            onClick={() => toggleSection("selfHostingMongoDB")}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/30"
                          >
                            <span>mongo-db</span>
                            <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.selfHostingMongoDB && "rotate-90")} />
                          </button>
                          {expandedSections.selfHostingMongoDB && (
                            <div className="mt-2 ml-2 space-y-1">
                              <button
                                onClick={() => {
                                  setSelectedItem("dashboard-mongo-db-demo")
                                  onSampleSelect?.("react-self-hosting-dashboard-mongo-db-dashboard-mongo-db-demo")
                                }}
                                className={cn(
                                  "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                  selectedItem === "dashboard-mongo-db-demo" ? "bg-secondary" : "hover:bg-secondary/50",
                                )}
                              >
                                dashboard-mongo-db-demo
                              </button>
                            </div>
                          )}

                          {/* postgres Section */}
                          <button
                            onClick={() => toggleSection("selfHostingPostgres")}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/30"
                          >
                            <span>postgres</span>
                            <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.selfHostingPostgres && "rotate-90")} />
                          </button>
                          {expandedSections.selfHostingPostgres && (
                            <div className="mt-2 ml-2 space-y-1">
                              <button
                                onClick={() => {
                                  setSelectedItem("dashboard-postgres-demo")
                                  onSampleSelect?.("react-self-hosting-dashboard-postgres-dashboard-postgres-demo")
                                }}
                                className={cn(
                                  "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                  selectedItem === "dashboard-postgres-demo" ? "bg-secondary" : "hover:bg-secondary/50",
                                )}
                              >
                                dashboard-postgres-demo
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* forms Section */}
                      <button
                        onClick={() => toggleSection("selfHostingForms")}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/50"
                      >
                        <span>forms</span>
                        <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.selfHostingForms && "rotate-90")} />
                      </button>
                      {expandedSections.selfHostingForms && (
                        <div className="mt-2 ml-2 space-y-1">
                          <button
                            onClick={() => {
                              setSelectedItem("page-mode-demo")
                              onSampleSelect?.("react-self-hosting-forms-page-mode-demo")
                            }}
                            className={cn(
                              "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                              selectedItem === "page-mode-demo" ? "bg-secondary" : "hover:bg-secondary/50",
                            )}
                          >
                            page-mode-demo
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* crdt Section */}
                <div className="mb-1">
                  <button
                    onClick={() => toggleSection("crdt")}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent"
                  >
                    <span>crdt</span>
                    <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.crdt && "rotate-90")} />
                  </button>
                  {expandedSections.crdt && (
                    <div className="mt-2 ml-2 space-y-1">
                      {/* canvas Section */}
                      <button
                        onClick={() => toggleSection("crdtCanvas")}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/50"
                      >
                        <span>canvas</span>
                        <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.crdtCanvas && "rotate-90")} />
                      </button>
                      {expandedSections.crdtCanvas && (
                        <div className="mt-2 ml-2 space-y-1">
                          {/* reactflow Section */}
                          <button
                            onClick={() => toggleSection("reactflow")}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/30"
                          >
                            <span>reactflow</span>
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

                      {/* text-editors Section */}
                      <button
                        onClick={() => toggleSection("crdtTextEditors")}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/50"
                      >
                        <span>text-editors</span>
                        <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.crdtTextEditors && "rotate-90")} />
                      </button>
                      {expandedSections.crdtTextEditors && (
                        <div className="mt-2 ml-2 space-y-1">
                          {/* tiptap Section */}
                          <button
                            onClick={() => toggleSection("crdtTiptap")}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/30"
                          >
                            <span>tiptap</span>
                            <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.crdtTiptap && "rotate-90")} />
                          </button>
                          {expandedSections.crdtTiptap && (
                            <div className="mt-2 ml-2 space-y-1">
                              <button
                                onClick={() => {
                                  setSelectedItem("tiptap-crdt-demo")
                                  onSampleSelect?.("react-crdt-text-editors-tiptap-tiptap-crdt-demo")
                                }}
                                className={cn(
                                  "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                  selectedItem === "tiptap-crdt-demo" ? "bg-secondary" : "hover:bg-secondary/50",
                                )}
                              >
                                tiptap-crdt-demo
                              </button>
                            </div>
                          )}

                          {/* codemirror Section */}
                          <button
                            onClick={() => toggleSection("crdtCodemirror")}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/30"
                          >
                            <span>codemirror</span>
                            <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.crdtCodemirror && "rotate-90")} />
                          </button>
                          {expandedSections.crdtCodemirror && (
                            <div className="mt-2 ml-2 space-y-1">
                              <button
                                onClick={() => {
                                  setSelectedItem("codemirror-crdt-demo")
                                  onSampleSelect?.("react-crdt-text-editors-codemirror-codemirror-crdt-demo")
                                }}
                                className={cn(
                                  "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                  selectedItem === "codemirror-crdt-demo" ? "bg-secondary" : "hover:bg-secondary/50",
                                )}
                              >
                                codemirror-crdt-demo
                              </button>
                            </div>
                          )}

                          {/* blocknote Section */}
                          <button
                            onClick={() => toggleSection("crdtBlocknote")}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/30"
                          >
                            <span>blocknote</span>
                            <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.crdtBlocknote && "rotate-90")} />
                          </button>
                          {expandedSections.crdtBlocknote && (
                            <div className="mt-2 ml-2 space-y-1">
                              <button
                                onClick={() => {
                                  setSelectedItem("blocknote-crdt-demo")
                                  onSampleSelect?.("react-crdt-text-editors-blocknote-blocknote-demo")
                                }}
                                className={cn(
                                  "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                  selectedItem === "blocknote-crdt-demo" ? "bg-secondary" : "hover:bg-secondary/50",
                                )}
                              >
                                blocknote-crdt-demo
                              </button>
                            </div>
                          )}

                          {/* core Section */}
                          <button
                            onClick={() => toggleSection("crdtCore")}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/30"
                          >
                            <span>core</span>
                            <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.crdtCore && "rotate-90")} />
                          </button>
                          {expandedSections.crdtCore && (
                            <div className="mt-2 ml-2 space-y-1">
                              <button
                                onClick={() => {
                                  setSelectedItem("core-react-text-crdt-demo")
                                  onSampleSelect?.("react-crdt-text-editors-core-core-react-text-crdt-demo")
                                }}
                                className={cn(
                                  "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                  selectedItem === "core-react-text-crdt-demo" ? "bg-secondary" : "hover:bg-secondary/50",
                                )}
                              >
                                core-react-text-crdt-demo
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedItem("core-react-array-crdt-demo")
                                  onSampleSelect?.("react-crdt-text-editors-core-core-react-array-crdt-demo")
                                }}
                                className={cn(
                                  "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                  selectedItem === "core-react-array-crdt-demo" ? "bg-secondary" : "hover:bg-secondary/50",
                                )}
                              >
                                core-react-array-crdt-demo
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedItem("core-react-map-crdt-demo")
                                  onSampleSelect?.("react-crdt-text-editors-core-core-react-map-crdt-demo")
                                }}
                                className={cn(
                                  "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                  selectedItem === "core-react-map-crdt-demo" ? "bg-secondary" : "hover:bg-secondary/50",
                                )}
                              >
                                core-react-map-crdt-demo
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedItem("core-react-xml-crdt-demo")
                                  onSampleSelect?.("react-crdt-text-editors-core-core-react-xml-crdt-demo")
                                }}
                                className={cn(
                                  "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                  selectedItem === "core-react-xml-crdt-demo" ? "bg-secondary" : "hover:bg-secondary/50",
                                )}
                              >
                                core-react-xml-crdt-demo
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* javascript Section */}
                <div className="mb-1">
                  <button
                    onClick={() => toggleSection("javascript")}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent"
                  >
                    <span>javascript</span>
                    <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.javascript && "rotate-90")} />
                  </button>
                  {expandedSections.javascript && (
                    <div className="mt-2 ml-2 space-y-1">
                      {/* crdt Section */}
                      <button
                        onClick={() => toggleSection("jsCrdt")}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/50"
                      >
                        <span>crdt</span>
                        <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.jsCrdt && "rotate-90")} />
                      </button>
                      {expandedSections.jsCrdt && (
                        <div className="mt-2 ml-2 space-y-1">
                          {/* text-editors Section */}
                          <button
                            onClick={() => toggleSection("jsCrdtTextEditors")}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/30"
                          >
                            <span>text-editors</span>
                            <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.jsCrdtTextEditors && "rotate-90")} />
                          </button>
                          {expandedSections.jsCrdtTextEditors && (
                            <div className="mt-2 ml-2 space-y-1">
                              {/* blocknote Section */}
                              <button
                                onClick={() => toggleSection("jsCrdtBlocknote")}
                                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/20"
                              >
                                <span>blocknote</span>
                                <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.jsCrdtBlocknote && "rotate-90")} />
                              </button>
                              {expandedSections.jsCrdtBlocknote && (
                                <div className="mt-2 ml-2 space-y-1">
                                  <button
                                    onClick={() => {
                                      setSelectedItem("js-blocknote-crdt-demo")
                                      onSampleSelect?.("javascript-crdt-text-editors-blocknote-blocknote-crdt-demo")
                                    }}
                                    className={cn(
                                      "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                      selectedItem === "js-blocknote-crdt-demo" ? "bg-secondary" : "hover:bg-secondary/50",
                                    )}
                                  >
                                    blocknote-crdt-demo
                                  </button>
                                </div>
                              )}

                              {/* codemirror Section */}
                              <button
                                onClick={() => toggleSection("jsCrdtCodemirror")}
                                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/20"
                              >
                                <span>codemirror</span>
                                <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.jsCrdtCodemirror && "rotate-90")} />
                              </button>
                              {expandedSections.jsCrdtCodemirror && (
                                <div className="mt-2 ml-2 space-y-1">
                                  <button
                                    onClick={() => {
                                      setSelectedItem("js-codemirror-crdt-demo")
                                      onSampleSelect?.("javascript-crdt-text-editors-codemirror-codemirror-crdt-demo")
                                    }}
                                    className={cn(
                                      "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                      selectedItem === "js-codemirror-crdt-demo" ? "bg-secondary" : "hover:bg-secondary/50",
                                    )}
                                  >
                                    codemirror-crdt-demo
                                  </button>
                                </div>
                              )}

                              {/* tiptap Section */}
                              <button
                                onClick={() => toggleSection("jsCrdtTiptap")}
                                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-mono text-sidebar-foreground bg-sidebar-accent/20"
                              >
                                <span>tiptap</span>
                                <ChevronRight className={cn("h-4 w-4 transition-transform", expandedSections.jsCrdtTiptap && "rotate-90")} />
                              </button>
                              {expandedSections.jsCrdtTiptap && (
                                <div className="mt-2 ml-2 space-y-1">
                                  <button
                                    onClick={() => {
                                      setSelectedItem("js-tiptap-crdt-demo")
                                      onSampleSelect?.("javascript-crdt-text-editors-tiptap-tiptap-crdt-demo")
                                    }}
                                    className={cn(
                                      "w-full rounded-lg px-3 py-2.5 text-left text-sm font-mono text-sidebar-foreground transition-colors",
                                      selectedItem === "js-tiptap-crdt-demo" ? "bg-secondary" : "hover:bg-secondary/50",
                                    )}
                                  >
                                    tiptap-crdt-demo
                                  </button>
                                </div>
                              )}
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