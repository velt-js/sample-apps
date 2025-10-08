"use client"

interface IframePairProps {
  url?: string
  secondUrl?: string
  height?: string
  displayMode?: 'single' | 'dual'
}

export function IframePair({
  url = "https://demo-examples.vercel.app/realtime/cursors",
  secondUrl,
  height = "982px",
  displayMode = 'dual'
}: IframePairProps) {
  const finalSecondUrl = secondUrl || url

  // Single iframe mode
  if (displayMode === 'single') {
    return (
      <div className="h-full">
        <div className="rounded-lg border border-border bg-card overflow-hidden h-full">
          <iframe
            src={url}
            className="w-full h-full"
            style={{ maxHeight: height }}
            title="Demo"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </div>
    )
  }

  // Dual iframe mode (default)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <iframe
          src={url}
          className="w-full h-full"
          style={{ maxHeight: height }}
          title="Demo 1"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <iframe
          src={finalSecondUrl}
          className="w-full h-full"
          style={{ maxHeight: height }}
          title="Demo 2"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  )
}

