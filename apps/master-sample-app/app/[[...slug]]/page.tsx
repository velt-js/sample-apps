"use client"

import { useState, useEffect, useRef } from "react"
import { Sidebar } from "@/components/sidebar"
import { SampleViewer } from "@/components/viewer/sample-viewer"
import { getDefaultSample, getSampleById, getAllSamples } from "@/samples"

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentSampleId, setCurrentSampleId] = useState<string>(() => getDefaultSample().metadata.id)
  const [documentId, setDocumentId] = useState<string>('')
  const isInitialized = useRef(false)
  
  const currentSample = getSampleById(currentSampleId) || getDefaultSample()

  // Update URL when sample changes
  useEffect(() => {
    if (typeof window === 'undefined' || !documentId) return

    const sample = getSampleById(currentSampleId)
    if (!sample) return

    const routePath = sample.metadata.routePath || ''
    const newUrl = `${routePath}?documentId=${documentId}`
    
    if (window.location.pathname + window.location.search !== newUrl) {
      window.history.pushState({}, '', newUrl)
    }
  }, [currentSampleId, documentId])

  // Generate or load document ID with URL support and determine sample from path
  useEffect(() => {
    if (isInitialized.current) return
    if (typeof window === 'undefined') return

    try {
      // 1. Check URL path to determine which sample to load
      const currentPath = window.location.pathname
      const allSamples = getAllSamples()
      const sampleFromPath = allSamples.find(s => s.metadata.routePath === currentPath)
      
      if (sampleFromPath) {
        setCurrentSampleId(sampleFromPath.metadata.id)
      }

      // 2. Check URL for documentId parameter
      const urlParams = new URLSearchParams(window.location.search)
      let docId = urlParams.get('documentId')
      
      if (docId) {
        // Use document ID from URL (shareable link)
        setDocumentId(docId)
        localStorage.setItem('master-app-document-id', docId)
      } else {
        // 3. Check localStorage for existing document
        const stored = localStorage.getItem('master-app-document-id')
        if (stored) {
          docId = stored
        } else {
          // 4. Generate new document ID
          docId = `doc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
          localStorage.setItem('master-app-document-id', docId)
        }
        
        setDocumentId(docId)
      }
      
      isInitialized.current = true
    } catch (error) {
      console.error('Error initializing:', error)
    }
  }, [])

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
        documentId={documentId}
      />
    </div>
  )
}

