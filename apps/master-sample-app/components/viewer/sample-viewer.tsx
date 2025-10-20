"use client"

import { useState, useMemo } from "react"
import { Sample } from "@/types/sample"
import { TopBar } from "./top-bar"
import { IframePair } from "./iframe-pair"
import { CodeDisplay } from "./code-display"

interface SampleViewerProps {
  sample: Sample
  sidebarOpen: boolean
  onSidebarToggle: () => void
  documentId: string
}

export function SampleViewer({ sample, sidebarOpen, onSidebarToggle, documentId }: SampleViewerProps) {
  const [mode, setMode] = useState<"code" | "demo">("demo")

  // Dynamically append documentId to iframe URLs
  const iframeUrl = useMemo(() => {
    if (!documentId || !sample.metadata.iframeUrl) return sample.metadata.iframeUrl
    const url = new URL(sample.metadata.iframeUrl)
    url.searchParams.set('documentId', documentId)
    url.searchParams.set('iframeId', '1')
    return url.toString()
  }, [sample.metadata.iframeUrl, documentId])

  const iframeUrl2 = useMemo(() => {
    if (!documentId || !sample.metadata.iframeUrl2) return sample.metadata.iframeUrl2
    const url = new URL(sample.metadata.iframeUrl2)
    url.searchParams.set('documentId', documentId)
    url.searchParams.set('iframeId', '2')
    return url.toString()
  }, [sample.metadata.iframeUrl2, documentId])

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
                routePath={sample.metadata.routePath}
                documentId={documentId}
              />

      {/* Content Area */}
      <main className="flex-1 overflow-hidden p-4">
        {mode === "demo" ? (
          <IframePair 
            url={iframeUrl}
            secondUrl={iframeUrl2}
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
              url={iframeUrl}
              secondUrl={iframeUrl2}
              height="100%"
              displayMode={sample.metadata.displayMode || 'dual'}
            />
          </div>
        )}
      </main>
    </div>
  )
}

