"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { IframePair } from "@/components/iframe-pair"
import { CodeView } from "@/components/code-view"

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mode, setMode] = useState<"code" | "demo">("demo")

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div
        className="flex flex-1 flex-col transition-all duration-150 ease-in-out"
        style={{
          marginLeft: sidebarOpen ? "200px" : "0",
        }}
      >
        {/* Top Bar */}
        <TopBar
          mode={mode}
          onModeChange={setMode}
          sidebarOpen={sidebarOpen}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-hidden p-4">
          {mode === "demo" ? (
            <IframePair height="calc(100vh - 120px)" />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
              {/* Left: Code View */}
              <CodeView />

              {/* Right: Two stacked sections */}
              <div className="flex flex-col gap-4 h-full">
                {/* Top: IframePair */}
                <div className="flex-1 min-h-0">
                  <IframePair height="100%" />
                </div>

                {/* Bottom: Placeholder */}
                <div className="h-32 rounded-lg border border-border bg-card flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Document.tsx</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
