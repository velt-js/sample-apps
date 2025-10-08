"use client"

import { useState } from "react"
import { Sample } from "@/types/sample"
import { TopBar } from "./top-bar"
import { IframePair } from "./iframe-pair"
import { CodeDisplay } from "./code-display"

interface SampleViewerProps {
  sample: Sample
  sidebarOpen: boolean
  onSidebarToggle: () => void
}

export function SampleViewer({ sample, sidebarOpen, onSidebarToggle }: SampleViewerProps) {
  const [mode, setMode] = useState<"code" | "demo">("demo")

  return (
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
        onSidebarToggle={onSidebarToggle}
        title={sample.metadata.title}
        githubUrl={sample.metadata.githubUrl}
      />

      {/* Content Area */}
      <main className="flex-1 overflow-hidden p-4">
        {mode === "demo" ? (
          <IframePair 
            url={sample.metadata.iframeUrl}
            secondUrl={sample.metadata.iframeUrl2}
            height="calc(100vh - 120px)"
            displayMode={sample.metadata.displayMode || 'dual'}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            {/* Left: Code View */}
            <CodeDisplay 
              codeFiles={sample.codeFiles}
              githubRepoPath={sample.metadata.githubRepoPath}
            />

            {/* Right: IframePair */}
            <IframePair 
              url={sample.metadata.iframeUrl}
              secondUrl={sample.metadata.iframeUrl2}
              height="100%"
              displayMode={sample.metadata.displayMode || 'dual'}
            />
          </div>
        )}
      </main>
    </div>
  )
}

