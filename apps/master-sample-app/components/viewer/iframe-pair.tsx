"use client"

import { useState, useRef, useEffect } from "react"

interface IframePairProps {
  url?: string
  secondUrl?: string
  height?: string
  displayMode?: 'single' | 'dual'
  direction?: 'horizontal' | 'vertical'
  theme?: string
}

export function IframePair({
  url,
  secondUrl,
  height = "982px",
  displayMode = 'dual',
  direction = 'horizontal',
  theme
}: IframePairProps) {
  const [error1, setError1] = useState(false)
  const [error2, setError2] = useState(false)

  const iframe1Ref = useRef<HTMLIFrameElement>(null)
  const iframe2Ref = useRef<HTMLIFrameElement>(null)

  // Send theme to iframes via postMessage when theme changes
  useEffect(() => {
    if (!theme) return
    const msg = { type: 'theme-change', theme }
    iframe1Ref.current?.contentWindow?.postMessage(msg, '*')
    iframe2Ref.current?.contentWindow?.postMessage(msg, '*')
  }, [theme])

  // Safety check: don't render if URL is not provided
  if (!url) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-muted-foreground">Preparing demo...</div>
      </div>
    )
  }

  const finalSecondUrl = secondUrl || url

  const handleIframeError = (iframeNum: number) => {
    if (iframeNum === 1) {
      setError1(true)
    } else {
      setError2(true)
    }
  }

  // Single iframe mode
  if (displayMode === 'single') {
    return (
      <div className="h-full relative">
        <div className="rounded-lg border border-border bg-card overflow-hidden h-full">
          {error1 && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <div className="text-destructive">Failed to load demo</div>
            </div>
          )}
          <iframe
            ref={iframe1Ref}
            src={url}
            className="w-full h-full"
            style={{ maxHeight: height }}
            title="Demo"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            onError={() => handleIframeError(1)}
          />
        </div>
      </div>
    )
  }

  // Dual iframe mode
  const isVertical = direction === 'vertical'

  return (
    <div className={isVertical
      ? "flex flex-col gap-4 h-full"
      : "grid grid-cols-1 lg:grid-cols-2 gap-4 h-full"
    }>
      <div className="rounded-lg border border-border bg-card overflow-hidden relative flex-1">
        {error1 && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="text-destructive text-sm">Failed to load demo 1</div>
          </div>
        )}
        <iframe
          ref={iframe1Ref}
          src={url}
          className="w-full h-full"
          style={{ maxHeight: isVertical ? undefined : height }}
          title="Demo 1"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          onError={() => handleIframeError(1)}
        />
      </div>
      <div className="rounded-lg border border-border bg-card overflow-hidden relative flex-1">
        {error2 && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="text-destructive text-sm">Failed to load demo 2</div>
          </div>
        )}
        <iframe
          ref={iframe2Ref}
          src={finalSecondUrl}
          className="w-full h-full"
          style={{ maxHeight: isVertical ? undefined : height }}
          title="Demo 2"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          onError={() => handleIframeError(2)}
        />
      </div>
    </div>
  )
}
