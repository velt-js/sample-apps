"use client"

import { useState } from "react"

interface IframePairProps {
  url?: string
  secondUrl?: string
  height?: string
  displayMode?: 'single' | 'dual'
}

export function IframePair({
  url,
  secondUrl,
  height = "982px",
  displayMode = 'dual'
}: IframePairProps) {
  const [isLoading1, setIsLoading1] = useState(true)
  const [isLoading2, setIsLoading2] = useState(true)
  const [error1, setError1] = useState(false)
  const [error2, setError2] = useState(false)

  // Safety check: don't render if URL is not provided
  if (!url) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-muted-foreground">Preparing demo...</div>
      </div>
    )
  }

  const finalSecondUrl = secondUrl || url

  const handleIframeLoad = (iframeNum: number) => {
    if (iframeNum === 1) {
      setIsLoading1(false)
      setError1(false)
    } else {
      setIsLoading2(false)
      setError2(false)
    }
  }

  const handleIframeError = (iframeNum: number) => {
    if (iframeNum === 1) {
      setIsLoading1(false)
      setError1(true)
    } else {
      setIsLoading2(false)
      setError2(true)
    }
  }

  // Single iframe mode
  if (displayMode === 'single') {
    return (
      <div className="h-full relative">
        <div className="rounded-lg border border-border bg-card overflow-hidden h-full">
          {isLoading1 && !error1 && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <div className="text-muted-foreground">Loading demo...</div>
            </div>
          )}
          {error1 && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <div className="text-destructive">Failed to load demo</div>
            </div>
          )}
          <iframe
            src={url}
            className="w-full h-full"
            style={{ maxHeight: height }}
            title="Demo"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            onLoad={() => handleIframeLoad(1)}
            onError={() => handleIframeError(1)}
          />
        </div>
      </div>
    )
  }

  // Dual iframe mode (default)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
      <div className="rounded-lg border border-border bg-card overflow-hidden relative">
        {isLoading1 && !error1 && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="text-muted-foreground text-sm">Loading demo 1...</div>
          </div>
        )}
        {error1 && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="text-destructive text-sm">Failed to load demo 1</div>
          </div>
        )}
        <iframe
          src={url}
          className="w-full h-full"
          style={{ maxHeight: height }}
          title="Demo 1"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          onLoad={() => handleIframeLoad(1)}
          onError={() => handleIframeError(1)}
        />
      </div>
      <div className="rounded-lg border border-border bg-card overflow-hidden relative">
        {isLoading2 && !error2 && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="text-muted-foreground text-sm">Loading demo 2...</div>
          </div>
        )}
        {error2 && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="text-destructive text-sm">Failed to load demo 2</div>
          </div>
        )}
        <iframe
          src={finalSecondUrl}
          className="w-full h-full"
          style={{ maxHeight: height }}
          title="Demo 2"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          onLoad={() => handleIframeLoad(2)}
          onError={() => handleIframeError(2)}
        />
      </div>
    </div>
  )
}

