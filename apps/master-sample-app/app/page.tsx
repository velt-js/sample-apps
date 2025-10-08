"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { SampleViewer } from "@/components/viewer/sample-viewer"
import { getDefaultSample, getSampleById } from "@/samples"

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentSampleId, setCurrentSampleId] = useState<string>(() => getDefaultSample().metadata.id)
  
  const currentSample = getSampleById(currentSampleId) || getDefaultSample()

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentSampleId={currentSampleId}
        onSampleSelect={setCurrentSampleId}
      />

      {/* Main Content */}
      <SampleViewer 
        sample={currentSample}
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
      />
    </div>
  )
}
