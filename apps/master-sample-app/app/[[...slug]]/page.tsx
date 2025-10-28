"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Sidebar } from "@/components/sidebar"
import { SampleViewer } from "@/components/viewer/sample-viewer"
import { getDefaultSample, getSampleById, getAllSamples } from "@/samples"

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentSampleId, setCurrentSampleId] = useState<string>(() => getDefaultSample().metadata.id)
  const [documentId, setDocumentId] = useState<string>('')
  const isInitialized = useRef(false)
  
  const currentSample = getSampleById(currentSampleId) || getDefaultSample()

  // Helper function to get document ID for a specific demo
  const getDocumentIdForDemo = useCallback((demoId: string): string => {
    if (typeof window === 'undefined') return ''
    
    // Check if there's a stored document ID for this demo
    const stored = localStorage.getItem(`demo-${demoId}-document-id`)
    if (stored) {
      return stored
    }
    
    // Generate a new document ID for this demo
    const newDocId = `doc-${demoId}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    localStorage.setItem(`demo-${demoId}-document-id`, newDocId)
    return newDocId
  }, [])

  // Update URL when sample or documentId changes
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

  // Initialize: determine sample from path and get/set document ID
  useEffect(() => {
    if (isInitialized.current) return
    if (typeof window === 'undefined') return

    try {
      // 1. Check URL path to determine which sample to load
      const currentPath = window.location.pathname
      const allSamples = getAllSamples()
      const sampleFromPath = allSamples.find(s => s.metadata.routePath === currentPath)
      
      let targetSampleId = getDefaultSample().metadata.id
      if (sampleFromPath) {
        targetSampleId = sampleFromPath.metadata.id
      }
      setCurrentSampleId(targetSampleId)

      // 2. Check URL for documentId parameter
      const urlParams = new URLSearchParams(window.location.search)
      let docId = urlParams.get('documentId')
      
      if (docId) {
        // Use document ID from URL (shareable link)
        setDocumentId(docId)
        localStorage.setItem(`demo-${targetSampleId}-document-id`, docId)
      } else {
        // 3. Get document ID for this specific demo
        docId = getDocumentIdForDemo(targetSampleId)
        setDocumentId(docId)
      }
      
      isInitialized.current = true
    } catch (error) {
      console.error('Error initializing:', error)
    }
  }, [getDocumentIdForDemo])

  // Handle sample change: get document ID for the new demo
  useEffect(() => {
    if (!isInitialized.current) return
    if (typeof window === 'undefined') return

    try {
      const sample = getSampleById(currentSampleId)
      if (!sample) return

      // Get or generate document ID for this demo
      const docId = getDocumentIdForDemo(currentSampleId)
      setDocumentId(docId)

      // Update URL
      const routePath = sample.metadata.routePath || ''
      const newUrl = `${routePath}?documentId=${docId}`
      
      if (window.location.pathname + window.location.search !== newUrl) {
        window.history.pushState({}, '', newUrl)
      }
    } catch (error) {
      console.error('Error changing sample:', error)
    }
  }, [currentSampleId, getDocumentIdForDemo])

  // Handle reset: generate new document ID for current demo
  const handleReset = () => {
    if (typeof window === 'undefined') return

    try {
      const sample = getSampleById(currentSampleId)
      if (!sample) return

      // Generate a new document ID for this specific demo
      const newDocId = `doc-${currentSampleId}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      
      // Update localStorage for this demo
      localStorage.setItem(`demo-${currentSampleId}-document-id`, newDocId)
      
      // Update state and URL
      setDocumentId(newDocId)
      const routePath = sample.metadata.routePath || ''
      const newUrl = `${routePath}?documentId=${newDocId}`
      
      window.history.pushState({}, '', newUrl)
    } catch (error) {
      console.error('Error resetting document:', error)
    }
  }

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
        onReset={handleReset}
      />
    </div>
  )
}

