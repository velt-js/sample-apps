"use client"

import { Search, ChevronRight, Code, ExternalLink, RotateCcw, Github, Copy } from "lucide-react"
import { VeltLogo } from "./velt-logo"
import { cn } from "@/lib/utils"
import { useState, useEffect, useRef } from "react"

interface HeaderBarProps {
  title: string
  mode: "code" | "demo"
  onModeChange: (mode: "code" | "demo") => void
  onSearchClick: () => void
  githubUrl?: string
  routePath?: string
  documentId?: string
  onReset?: () => void
  iframeUrl?: string
}

function formatBreadcrumbSegment(segment: string): string {
  return segment
    .trim()
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function parseTitleToSegments(title: string): string[] {
  // Handle both " / " and " · " separators
  const separator = title.includes(' / ') ? ' / ' : ' · '
  return title.split(separator).map(s => formatBreadcrumbSegment(s))
}

export function HeaderBar({
  title,
  mode,
  onModeChange,
  onSearchClick,
  githubUrl,
  routePath,
  documentId,
  onReset,
  iframeUrl
}: HeaderBarProps) {
  const [copied, setCopied] = useState(false)
  const [resetting, setResetting] = useState(false)
  const prevDocumentId = useRef<string | undefined>(documentId)

  const segments = parseTitleToSegments(title)

  const handleShare = async () => {
    if (typeof window === 'undefined') return
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleReset = () => {
    if (onReset) {
      setResetting(true)
      onReset()
      setTimeout(() => setResetting(false), 500)
    }
  }

  const handleOpenInNewTab = () => {
    if (iframeUrl) {
      window.open(iframeUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const handleGithubClick = () => {
    if (githubUrl) {
      window.open(githubUrl, '_blank', 'noopener,noreferrer')
    }
  }

  useEffect(() => {
    if (resetting && documentId) {
      const isDifferent = documentId !== prevDocumentId.current
      prevDocumentId.current = documentId
      if (isDifferent) setResetting(false)
    } else if (documentId) {
      prevDocumentId.current = documentId
    }
  }, [documentId, resetting])

  return (
    <header className="flex h-12 items-center border-b border-border bg-[#0d0d0d] px-3 shrink-0 gap-2">
      {/* Left: Brand + Breadcrumbs */}
      <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
        <div className="flex items-center gap-2 shrink-0">
          <VeltLogo className="h-5 w-5 text-foreground" />
          <span className="text-sm font-medium text-foreground">Velt</span>
        </div>

        {segments.map((segment, i) => (
          <div key={i} className="flex items-center gap-1.5 shrink-0">
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
            {i === 0 && segment.toLowerCase() === 'react' ? (
              <div className="flex items-center gap-1.5">
                <ReactIcon />
                <span className="text-sm text-foreground">{segment}</span>
              </div>
            ) : (
              <span className={cn(
                "text-sm",
                i === segments.length - 1 ? "text-muted-foreground truncate max-w-[200px]" : "text-foreground"
              )}>
                {segment}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Center: Mode Toggle */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          className="h-8 w-8 flex items-center justify-center rounded-full bg-[#1a1a1a] hover:bg-[#252525] transition-colors"
          title="Settings"
        >
          <SettingsIcon />
        </button>
        <button
          onClick={() => onModeChange(mode === "code" ? "demo" : "code")}
          className={cn(
            "h-8 w-8 flex items-center justify-center rounded-full transition-colors",
            mode === "code"
              ? "bg-[#ffc31c] text-black"
              : "bg-[#1a1a1a] text-foreground hover:bg-[#252525]"
          )}
          title={mode === "code" ? "Switch to demo view" : "Switch to code view"}
        >
          <Code className="h-4 w-4" />
        </button>
      </div>

      {/* Right: Search + Icons */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onSearchClick}
          className="flex items-center gap-2 h-8 px-3 rounded-md border border-[#333] bg-[#1a1a1a] text-muted-foreground hover:bg-[#252525] transition-colors text-sm w-[180px]"
        >
          <Search className="h-3.5 w-3.5 shrink-0" />
          <span className="text-xs">Search</span>
        </button>

        <button
          onClick={handleShare}
          className={cn(
            "h-8 w-8 flex items-center justify-center rounded-md transition-colors",
            copied ? "bg-green-500 text-white" : "hover:bg-[#252525] text-muted-foreground"
          )}
          title={copied ? "Copied!" : "Copy link"}
        >
          <Copy className="h-3.5 w-3.5" />
        </button>

        <button
          onClick={handleOpenInNewTab}
          className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-[#252525] text-muted-foreground transition-colors"
          title="Open in new tab"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </button>

        <button
          onClick={handleGithubClick}
          className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-[#252525] text-muted-foreground transition-colors"
          title="View on GitHub"
        >
          <Github className="h-3.5 w-3.5" />
        </button>

        <button
          onClick={handleReset}
          className={cn(
            "h-8 w-8 flex items-center justify-center rounded-md transition-colors",
            resetting ? "bg-blue-500 text-white" : "hover:bg-[#252525] text-muted-foreground"
          )}
          title={resetting ? "Resetting..." : "Reset document"}
          disabled={resetting}
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>
    </header>
  )
}

function ReactIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
