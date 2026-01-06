"use client"

import { useState, useRef, useEffect } from "react"

// Time to wait for Velt SDK auth to complete before refreshing
// validateclient takes ~7-8 seconds, add buffer
const VELT_AUTH_WAIT_MS = 8000

// Check if a demo origin has been initialized (Velt auth cached)
function isDemoInitialized(url: string): boolean {
  try {
    const origin = new URL(url).origin
    const key = `velt-initialized-${origin}`
    return localStorage.getItem(key) === 'true'
  } catch {
    return false
  }
}

// Mark a demo origin as initialized
function markDemoInitialized(url: string): void {
  try {
    const origin = new URL(url).origin
    const key = `velt-initialized-${origin}`
    localStorage.setItem(key, 'true')
  } catch {
    // ignore
  }
}

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
  // If demo was already initialized, skip the wait/refresh cycle
  const [hasRefreshed1, setHasRefreshed1] = useState(() => url ? isDemoInitialized(url) : false)
  const [hasRefreshed2, setHasRefreshed2] = useState(() => {
    const targetUrl = secondUrl || url
    return targetUrl ? isDemoInitialized(targetUrl) : false
  })

  const iframe1Ref = useRef<HTMLIFrameElement>(null)
  const iframe2Ref = useRef<HTMLIFrameElement>(null)
  const refreshTimer1 = useRef<NodeJS.Timeout | null>(null)
  const refreshTimer2 = useRef<NodeJS.Timeout | null>(null)

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (refreshTimer1.current) clearTimeout(refreshTimer1.current)
      if (refreshTimer2.current) clearTimeout(refreshTimer2.current)
    }
  }, [])

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
      setError1(false)

      if (!hasRefreshed1) {
        // First load: wait for Velt auth to complete, then refresh
        refreshTimer1.current = setTimeout(() => {
          if (iframe1Ref.current && url) {
            setHasRefreshed1(true)
            // Force refresh by resetting src
            iframe1Ref.current.src = url
          }
        }, VELT_AUTH_WAIT_MS)
      } else {
        // Second load (after refresh): Velt auth should be cached, ready to show
        setIsLoading1(false)
        // Mark this demo origin as initialized for future visits
        if (url) markDemoInitialized(url)
      }
    } else {
      setError2(false)

      if (!hasRefreshed2) {
        // First load: wait for Velt auth to complete, then refresh
        refreshTimer2.current = setTimeout(() => {
          if (iframe2Ref.current) {
            const refreshUrl = secondUrl || url
            if (refreshUrl) {
              setHasRefreshed2(true)
              // Force refresh by resetting src
              iframe2Ref.current.src = refreshUrl
            }
          }
        }, VELT_AUTH_WAIT_MS)
      } else {
        // Second load (after refresh): Velt auth should be cached, ready to show
        setIsLoading2(false)
        // Mark this demo origin as initialized for future visits
        const targetUrl = secondUrl || url
        if (targetUrl) markDemoInitialized(targetUrl)
      }
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
          {!hasRefreshed1 && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-background">
              <div className="text-muted-foreground">Initializing...</div>
            </div>
          )}
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
        {!hasRefreshed1 && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-background">
            <div className="text-muted-foreground text-sm">Initializing demo...</div>
          </div>
        )}
        {error1 && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="text-destructive text-sm">Failed to load demo 1</div>
          </div>
        )}
        <iframe
          ref={iframe1Ref}
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
        {!hasRefreshed2 && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-background">
            <div className="text-muted-foreground text-sm">Initializing demo...</div>
          </div>
        )}
        {error2 && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="text-destructive text-sm">Failed to load demo 2</div>
          </div>
        )}
        <iframe
          ref={iframe2Ref}
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
