"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { SampleViewer } from "@/components/viewer/sample-viewer"
import { Sample } from "@/types/sample"

interface SamplePageClientProps {
  sample: Sample
}

export function SamplePageClient({ sample }: SamplePageClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <SampleViewer 
        sample={sample}
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
      />
    </div>
  )
}

