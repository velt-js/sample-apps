"use client"

import { ChevronLeft, Github, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect, useRef } from "react"
import { VeltLogo } from "@/components/velt-logo"

interface TopBarProps {
  mode: "code" | "demo"
  onModeChange: (mode: "code" | "demo") => void
  sidebarOpen: boolean
  onSidebarToggle: () => void
  title?: string
  githubUrl?: string
  routePath?: string
  documentId?: string
  onReset?: () => void
}

export function TopBar({ 
  mode, 
  onModeChange, 
  sidebarOpen, 
  onSidebarToggle,
  title = "TIPTAP · CRDT DEMO",
  githubUrl = "https://github.com/velt-js/tiptap-velt-nextjs",
  routePath,
  documentId,
  onReset
}: TopBarProps) {
  const [copied, setCopied] = useState(false)
  const [resetting, setResetting] = useState(false)
  const prevDocumentId = useRef<string | undefined>(documentId)

  const handleGithubClick = () => {
    if (githubUrl) {
      window.open(githubUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const displayText = title

  const handleShare = async () => {
    if (typeof window === 'undefined') return
    
    const fullUrl = window.location.href
    
    try {
      await navigator.clipboard.writeText(fullUrl)
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
      
      // Fallback: reset the button state after a timeout
      setTimeout(() => {
        setResetting(false)
      }, 500)
    }
  }

  // Reset the resetting state when documentId changes
  useEffect(() => {
    if (resetting && documentId) {
      const isDifferent = documentId !== prevDocumentId.current
      prevDocumentId.current = documentId
      if (isDifferent) {
        setResetting(false)
      }
    } else if (documentId) {
      prevDocumentId.current = documentId
    }
  }, [documentId, resetting])

  return (
    <header className="relative flex h-14 items-center border-b border-border bg-background px-4">
      {/* Left: Toggle + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onSidebarToggle}
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent transition-colors"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <ChevronLeft className={cn("h-4 w-4 text-foreground transition-transform", !sidebarOpen && "rotate-180")} />
        </button>
        <div className="flex items-center gap-2">
          <VeltLogo className="text-foreground" />
          <h1 className="text-sm font-medium text-foreground">{displayText}</h1>
        </div>
      </div>

      {/* Center: Mode Toggle - Absolutely Centered */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 rounded-lg bg-muted p-1">
        <button
          onClick={() => onModeChange("code")}
          className={cn(
            "rounded-md px-4 py-1.5 text-xs font-semibold transition-colors",
            mode === "code" ? "bg-[#ffc31c] text-black" : "text-muted-foreground hover:text-foreground",
          )}
        >
          CODE
        </button>
        <button
          onClick={() => onModeChange("demo")}
          className={cn(
            "rounded-md px-4 py-1.5 text-xs font-semibold transition-colors",
            mode === "demo" ? "bg-[#ffc31c] text-black" : "text-muted-foreground hover:text-foreground",
          )}
        >
          DEMO
        </button>
      </div>

      {/* Right: Icons */}
      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={handleReset}
          className={cn(
            "rounded-md px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-1.5",
            resetting 
              ? "bg-blue-500 text-white hover:bg-blue-600" 
              : "hover:bg-accent text-foreground"
          )}
          aria-label="Reset document"
          disabled={resetting}
        >
          <RotateCcw className="h-3 w-3" />
          {resetting ? "Resetting..." : "Reset"}
        </button>
        <button
          onClick={handleShare}
          className={cn(
            "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            copied 
              ? "bg-green-500 text-white hover:bg-green-600" 
              : "hover:bg-accent text-foreground"
          )}
          aria-label="Copy link"
        >
          {copied ? "Copied!" : "Share"}
        </button>
        <button 
          onClick={handleGithubClick}
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent transition-colors"
        >
          <Github className="h-4 w-4 text-foreground" />
        </button>
      </div>
    </header>
  )
}


