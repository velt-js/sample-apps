"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { Sample } from "@/types/sample"
import { TopBar } from "./top-bar"
import { IframePair } from "./iframe-pair"
import { CodeDisplay } from "./code-display"

// Enable debug logging
const DEBUG = true

interface SampleViewerProps {
  sample: Sample
  sidebarOpen: boolean
  onSidebarToggle: () => void
  documentId: string
  onReset?: () => void
}

export function SampleViewer({ sample, sidebarOpen, onSidebarToggle, documentId, onReset }: SampleViewerProps) {
  const [mode, setMode] = useState<"code" | "demo">("demo")
  const renderCount = useRef(0)
  const prevDocumentId = useRef(documentId)
  const prevSampleId = useRef(sample.metadata.id)

  renderCount.current++

  // Debug: Track renders and prop changes
  useEffect(() => {
    if (DEBUG) {
      console.log(`[SampleViewer] Render #${renderCount.current}`, {
        sampleId: sample.metadata.id,
        documentId,
        documentIdChanged: prevDocumentId.current !== documentId,
        sampleIdChanged: prevSampleId.current !== sample.metadata.id,
      })
      prevDocumentId.current = documentId
      prevSampleId.current = sample.metadata.id
    }
  })

  // Dynamically append documentId to iframe URLs
  const iframeUrl = useMemo(() => {
    // IMPORTANT: Never return a URL without documentId - this prevents race conditions
    // where the iframe loads before the documentId is set
    if (!documentId || !sample.metadata.iframeUrl) return undefined
    const url = new URL(sample.metadata.iframeUrl)
    url.searchParams.set('documentId', documentId)
    const result = url.toString()

    if (DEBUG) {
      console.log('[SampleViewer] Built iframeUrl:', {
        base: sample.metadata.iframeUrl,
        documentId,
        result,
      })
    }

    return result
  }, [sample.metadata.iframeUrl, documentId])

  const iframeUrl2 = useMemo(() => {
    if (!documentId || !sample.metadata.iframeUrl2) return undefined
    const url = new URL(sample.metadata.iframeUrl2)
    url.searchParams.set('documentId', documentId)
    const result = url.toString()

    if (DEBUG) {
      console.log('[SampleViewer] Built iframeUrl2:', {
        base: sample.metadata.iframeUrl2,
        documentId,
        result,
      })
    }

    return result
  }, [sample.metadata.iframeUrl2, documentId])

  // Don't render iframes until documentId is ready AND URLs are computed
  const isReady = !!documentId && !!iframeUrl

  // Debug: Log when ready state changes
  useEffect(() => {
    if (DEBUG) {
      console.log('[SampleViewer] Ready state:', {
        isReady,
        hasDocumentId: !!documentId,
        hasIframeUrl: !!iframeUrl,
      })
    }
  }, [isReady, documentId, iframeUrl])

  // IMPORTANT: Key should NOT include documentId to prevent remounts
  // Only remount when sample changes, not when documentId changes
  const iframeKey = sample.metadata.id

  if (DEBUG) {
    console.log('[SampleViewer] IframePair key:', iframeKey, '(NOT including documentId)')
  }

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
            key={iframeKey}
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
              key={`${iframeKey}-code`}
            />
          </div>
        )}
      </main>
    </div>
  )
}
