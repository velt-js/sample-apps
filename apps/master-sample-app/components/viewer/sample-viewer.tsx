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
  onReset?: () => void
}

export function SampleViewer({ sample, sidebarOpen, onSidebarToggle, documentId, onReset }: SampleViewerProps) {
  const [mode, setMode] = useState<"code" | "demo">("demo")

  // Dynamically append documentId to iframe URLs
  const iframeUrl = useMemo(() => {
    if (!documentId || !sample.metadata.iframeUrl) return sample.metadata.iframeUrl
    const url = new URL(sample.metadata.iframeUrl)
    url.searchParams.set('documentId', documentId)
    return url.toString()
  }, [sample.metadata.iframeUrl, documentId])

  const iframeUrl2 = useMemo(() => {
    if (!documentId || !sample.metadata.iframeUrl2) return sample.metadata.iframeUrl2
    const url = new URL(sample.metadata.iframeUrl2)
    url.searchParams.set('documentId', documentId)
    return url.toString()
  }, [sample.metadata.iframeUrl2, documentId])

  // Don't render iframes until documentId is ready
  const isReady = !!documentId

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
                onReset={onReset}
                iframeUrl={iframeUrl}
              />

      {/* Content Area */}
      <main className="flex-1 overflow-hidden p-4">
        {!isReady ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-muted-foreground">Loading demo...</div>
          </div>
        ) : mode === "demo" ? (
          <IframePair
            url={iframeUrl}
            secondUrl={iframeUrl2}
            height="calc(100vh - 88px)"
            displayMode={sample.metadata.displayMode || 'dual'}
            key={documentId}
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
              key={documentId}
            />
          </div>
        )}
      </main>
    </div>
  )
}

