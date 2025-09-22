"use client"

// [Velt] Provider & globals setup
import React, { useEffect, useState } from "react"
import { VeltProvider, VeltCursor } from "@veltdev/react" // [Velt]
import { VeltCollaboration } from "@/components/velt/VeltCollaboration" // [Velt]
import { useVeltAuthProvider } from "@/components/velt/hooks/useVeltAuthProvider" // [Velt]
import { VeltInitializeDocument } from "@/components/velt/VeltInitializeDocument" // [Velt]
// [Velt] React Flow
import ReactFlowComponent from "@/components/velt/ReactFlowComponent"
import { Toolbar } from "@/components/toolbar/toolbar"
import { Sidebar } from "@/components/sidebar/sidebar"

export default function Page() {
  const [activeTool, setActiveTool] = useState<string>("select")

  // [Velt] Auth provider
  const { authProvider } = useVeltAuthProvider()

  // [Velt] Expose global getters for document & user
  useEffect(() => {
    if (typeof window !== "undefined") {
      const w = window as any
      w.__VELT__ = w.__VELT__ || {}

      // [Velt] Document getter (host-owned source of truth)
      if (typeof w.__VELT__.getDocument !== "function") {
        w.__VELT__.getDocument = () => ({
          documentId: "general-document-1",
          documentName: "General Document",
          documentType: "flow",
        })
      }

      // [Velt] User getter (reads from localStorage; set by VeltInitializeUser or your auth)
      if (typeof w.__VELT__.getUser !== "function") {
        w.__VELT__.getUser = () => {
          try {
            const raw = window.localStorage.getItem("user")
            return raw ? JSON.parse(raw) : undefined
          } catch {}
          return undefined
        }
      }
    }
  }, [])

  return (
    // [Velt] Wrap app with provider
    <VeltProvider apiKey={process.env.NEXT_PUBLIC_VELT_API_KEY!} authProvider={authProvider}>
      {/* [Velt] Optional live cursor */}
      <VeltCursor />

      {/* [Velt] Collaboration core */}
      <VeltCollaboration />

      {/* [Velt] Initialize document from global getter */}
      <VeltInitializeDocument />

      {/* --- Your app UI below --- */}
      <div className="h-screen grid grid-rows-[auto_1fr] lg:grid-cols-[auto_1fr] bg-background text-foreground">
        {/* Toolbar spans full width */}
        <header className="col-span-full border-b border-border" role="banner">
          <Toolbar />
        </header>

        {/* Main content area with sidebar and canvas */}
        <div className="lg:contents" style={{ minWidth: 0 }}>
          {/* Sidebar - hidden on mobile, visible on lg+ */}
          <aside
            className="hidden lg:block border-r border-border"
            role="complementary"
            aria-label="Tools and node types"
          >
            <Sidebar activeTool={activeTool} onToolChange={setActiveTool} />
          </aside>

          {/* Main canvas area */}
          <main className="overflow-hidden" role="main" aria-label="Flowchart canvas" style={{ minWidth: 0 }}>
            <ReactFlowComponent activeTool={activeTool} /> {/* [Velt] */}
          </main>
        </div>
      </div>
    </VeltProvider>
  )
}
