"use client"

import { Search, ChevronRight, ExternalLink, RotateCcw, Github, Copy, Sun, Moon, Monitor } from "lucide-react"
import { VeltLogo } from "./velt-logo"
import { cn } from "@/lib/utils"
import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface HeaderBarProps {
  title: string
  mode: "code" | "demo"
  onModeChange: (mode: "code" | "demo") => void
  onSearchClick: () => void
  onBreadcrumbClick?: (level: number) => void
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
  onBreadcrumbClick,
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
    <header className="relative flex h-[48px] items-center border-b border-black/8 dark:border-white/8 bg-white dark:bg-[#0e0e0e] px-[19px] shrink-0">
      {/* Left: Brand + Breadcrumbs */}
      <div className="flex items-center gap-4 min-w-0 overflow-hidden font-[family-name:var(--font-urbanist)]">
        {/* Velt brand */}
        <div className="flex items-center gap-2 shrink-0">
          <VeltLogo className="h-[20px] w-[20px] text-foreground" />
          <span className="text-[20px] font-bold text-black dark:text-white tracking-[0.2px] leading-none">Velt</span>
        </div>

        {/* Vertical divider line */}
        <div className="h-[18px] w-px bg-black/12 dark:bg-white/12 shrink-0" />

        {/* Breadcrumb path */}
        <div className="flex items-center gap-[10px] shrink-0">
          {segments.map((segment, i) => (
            <div key={i} className="flex items-center gap-[10px] shrink-0">
              {i > 0 && (
                <ChevronRight className="h-[14px] w-[14px] text-black/50 dark:text-white/50" />
              )}
              {i === 0 && segment.toLowerCase() === 'react' ? (
                <button
                  onClick={() => onBreadcrumbClick?.(i)}
                  className="flex items-center gap-2 text-[14px] text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 transition-colors cursor-pointer leading-normal"
                >
                  <ReactIcon />
                  <span>{segment}</span>
                </button>
              ) : i === 0 && segment.toLowerCase() === 'javascript' ? (
                <button
                  onClick={() => onBreadcrumbClick?.(i)}
                  className="flex items-center gap-2 text-[14px] text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 transition-colors cursor-pointer leading-normal"
                >
                  <JavaScriptIcon />
                  <span>{segment}</span>
                </button>
              ) : i === segments.length - 1 ? (
                <button
                  onClick={() => onBreadcrumbClick?.(i)}
                  className="text-[14px] text-black/50 dark:text-white/50 hover:text-black/70 dark:hover:text-white/70 transition-colors cursor-pointer truncate max-w-[200px] leading-normal"
                >
                  {segment}
                </button>
              ) : (
                <button
                  onClick={() => onBreadcrumbClick?.(i)}
                  className="text-[14px] text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 transition-colors cursor-pointer leading-normal"
                >
                  {segment}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Center: Mode Toggle - absolutely centered */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-[2px] bg-black/6 dark:bg-[#1e1e1e] rounded-[16px] p-[2px]">
        <button
          onClick={() => onModeChange("demo")}
          className={cn(
            "p-1 flex items-center justify-center rounded-[32px] transition-colors",
            mode === "demo"
              ? "bg-black dark:bg-white"
              : "hover:bg-black/10 dark:hover:bg-white/10"
          )}
          title="Demo view"
        >
          <ClickIcon className={mode === "demo" ? "text-white dark:text-black" : "text-black dark:text-white"} />
        </button>
        <button
          onClick={() => onModeChange("code")}
          className={cn(
            "p-1 flex items-center justify-center rounded-[32px] transition-colors",
            mode === "code"
              ? "bg-black dark:bg-white"
              : "hover:bg-black/10 dark:hover:bg-white/10"
          )}
          title="Code view"
        >
          <CodeBracketsIcon className={cn(mode === "code" ? "text-white dark:text-black" : "text-black dark:text-white")} />
        </button>
      </div>

      {/* Right: Theme Toggle + Search + Icons */}
      <div className="flex items-center gap-3 shrink-0 ml-auto">
        <HeaderThemeToggle />
        <button
          onClick={onSearchClick}
          className="flex items-center gap-[9px] h-auto px-3 py-[5px] rounded-lg border border-black/12 dark:border-white/12 text-black dark:text-white opacity-52 hover:opacity-80 transition-opacity w-[233px] font-[family-name:var(--font-urbanist)]"
        >
          <Search className="h-[14px] w-[14px] shrink-0" />
          <span className="text-[14px] leading-normal">Search</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className={cn(
              "transition-colors",
              copied ? "text-green-400" : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
            )}
            title={copied ? "Copied!" : "Copy link"}
          >
            <Copy className="h-[14.8px] w-[14.8px]" />
          </button>

          <button
            onClick={handleGithubClick}
            className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
            title="View on GitHub"
          >
            <Github className="h-[14.8px] w-[14.8px]" />
          </button>

          <button
            onClick={handleOpenInNewTab}
            className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
            title="Open in new tab"
          >
            <ExternalLink className="h-[14.8px] w-[14.8px]" />
          </button>

          <button
            onClick={handleReset}
            className={cn(
              "transition-colors",
              resetting ? "text-blue-400" : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
            )}
            title={resetting ? "Resetting..." : "Reset document"}
            disabled={resetting}
          >
            <RotateCcw className="h-[14.8px] w-[14.8px]" />
          </button>
        </div>
      </div>
    </header>
  )
}

function ReactIcon() {
  return (
    <svg width="13.336" height="12" viewBox="0 0 24 22" fill="none" className="shrink-0">
      <circle cx="12" cy="11" r="2.2" fill="#61DAFB" />
      <ellipse cx="12" cy="11" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" />
      <ellipse cx="12" cy="11" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 11)" />
      <ellipse cx="12" cy="11" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 11)" />
    </svg>
  )
}

function JavaScriptIcon() {
  return (
    <svg width="13.336" height="12" viewBox="0 0 256 256" className="shrink-0">
      <rect width="256" height="256" fill="#F7DF1E" rx="16" />
      <path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574" fill="#000" />
    </svg>
  )
}

function ClickIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 8H4M8 2V4M5.20007 5.19998L3.7334 3.73332M10.8 5.19998L12.2666 3.73332M5.20007 10.8L3.7334 12.2667M8 8L14 10L11.3333 11.3333L10 14L8 8Z" />
    </svg>
  )
}

function CodeBracketsIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4.66667 5.33333L2 8L4.66667 10.6667M11.3333 5.33333L14 8L11.3333 10.6667M9.33333 2.66667L6.66667 13.3333" />
    </svg>
  )
}

function HeaderThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex items-center gap-[2px] bg-black/6 dark:bg-[#1e1e1e] rounded-[8px] p-[2px]">
      <button
        onClick={() => setTheme("light")}
        className={cn(
          "flex h-[28px] w-[32px] items-center justify-center rounded-[6px] transition-colors",
          theme === "light" ? "bg-black/10 dark:bg-white/10 text-black dark:text-white" : "text-black/40 dark:text-white/40 hover:text-black/70 dark:hover:text-white/70"
        )}
        title="Light"
      >
        <Sun className="h-[14px] w-[14px]" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={cn(
          "flex h-[28px] w-[32px] items-center justify-center rounded-[6px] transition-colors",
          theme === "dark" ? "bg-black/10 dark:bg-white/10 text-black dark:text-white" : "text-black/40 dark:text-white/40 hover:text-black/70 dark:hover:text-white/70"
        )}
        title="Dark"
      >
        <Moon className="h-[14px] w-[14px]" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={cn(
          "flex h-[28px] w-[32px] items-center justify-center rounded-[6px] transition-colors",
          theme === "system" ? "bg-black/10 dark:bg-white/10 text-black dark:text-white" : "text-black/40 dark:text-white/40 hover:text-black/70 dark:hover:text-white/70"
        )}
        title="System"
      >
        <Monitor className="h-[14px] w-[14px]" />
      </button>
    </div>
  )
}
