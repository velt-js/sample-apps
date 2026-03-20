"use client"

import { useState, useMemo, useEffect } from "react"
import { Sample } from "@/types/sample"
import { IframePair } from "./iframe-pair"
import { FileExplorer, CodeEditor } from "./code-display"
import { SampleCodeFile } from "@/types/sample"

interface SampleViewerProps {
  sample: Sample
  documentId: string
  mode: "code" | "demo"
  theme?: string
}

export function SampleViewer({ sample, documentId, mode, theme }: SampleViewerProps) {
  const [selectedFile, setSelectedFile] = useState<SampleCodeFile | null>(
    sample.codeFiles.length > 0 ? sample.codeFiles[0] : null
  )

  // Reset selected file when sample changes
  useEffect(() => {
    setSelectedFile(sample.codeFiles.length > 0 ? sample.codeFiles[0] : null)
  }, [sample.metadata.id])

  // Dynamically append documentId to iframe URLs
  const iframeUrl = useMemo(() => {
    // IMPORTANT: Never return a URL without documentId - this prevents race conditions
    // where the iframe loads before the documentId is set
    if (!documentId || !sample.metadata.iframeUrl) return undefined
    const url = new URL(sample.metadata.iframeUrl)
    url.searchParams.set('documentId', documentId)
    if (theme) url.searchParams.set('theme', theme)
    return url.toString()
  }, [sample.metadata.iframeUrl, documentId, theme])

  const iframeUrl2 = useMemo(() => {
    if (!documentId || !sample.metadata.iframeUrl2) return undefined
    const url = new URL(sample.metadata.iframeUrl2)
    url.searchParams.set('documentId', documentId)
    if (theme) url.searchParams.set('theme', theme)
    return url.toString()
  }, [sample.metadata.iframeUrl2, documentId, theme])

  // Don't render iframes until documentId is ready AND URLs are computed
  const isReady = !!documentId && !!iframeUrl

  // IMPORTANT: Key should NOT include documentId to prevent remounts
  // Only remount when sample changes, not when documentId changes
  const iframeKey = sample.metadata.id

  if (!isReady) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-muted-foreground">Loading demo...</div>
      </div>
    )
  }

  // Demo mode: full-width iframes side-by-side
  if (mode === "demo") {
    return (
      <main className="flex-1 overflow-hidden p-4">
        <IframePair
          url={iframeUrl}
          secondUrl={iframeUrl2}
          height="calc(100vh - 80px)"
          displayMode={sample.metadata.displayMode || 'dual'}
          theme={theme}
          key={iframeKey}
        />
      </main>
    )
  }

  // Code mode: 3-column layout (File explorer | Code editor | Preview iframes stacked)
  return (
    <main className="flex-1 overflow-hidden flex">
      {/* Left: File Explorer */}
      <div className="w-48 border-r border-border shrink-0 overflow-hidden">
        <FileExplorer
          codeFiles={sample.codeFiles}
          selectedFile={selectedFile}
          onFileSelect={setSelectedFile}
        />
      </div>

      {/* Middle: Code Editor */}
      <div className="flex-1 min-w-0 border-r border-border overflow-hidden">
        <CodeEditor selectedFile={selectedFile} />
      </div>

      {/* Right: Preview iframes stacked vertically */}
      <div className="flex-1 min-w-0 overflow-hidden p-2">
        <IframePair
          url={iframeUrl}
          secondUrl={iframeUrl2}
          height="100%"
          displayMode={sample.metadata.displayMode || 'dual'}
          direction="vertical"
          theme={theme}
          key={`${iframeKey}-code`}
        />
      </div>
    </main>
  )
}
