'use client'

// [Velt] VeltRecorderNotes lets reviewers pin recordings to locations on the
// page; VeltRecorderControlPanel is the floating in-progress recording UI
import { VeltRecorderNotes, VeltRecorderControlPanel } from "@veltdev/react";
import { useState } from "react";
import Header from '@/components/header/header'
import Sidebar from '@/components/sidebar/sidebar'
import RecordingsPanel from '@/components/recordings/RecordingsPanel'
import RecordingStatusIndicator from '@/components/velt/RecordingStatusIndicator'
import DocumentArticle from './DocumentArticle'

export default function DocumentCanvas() {
  // Host app manages the Recordings drawer state
  const [recordingsOpen, setRecordingsOpen] = useState(false);

  const toggleRecordings = () => {
    setRecordingsOpen((prev) => !prev);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto relative" style={{ backgroundColor: 'var(--app-bg)' }}>
        <Header toggleRecordings={toggleRecordings} />
        <DocumentArticle />
        {/* [Velt] Recorder notes pinned to the document — recordings left via
            the note tool render as playable markers at their pinned location */}
        <VeltRecorderNotes
          shadowDom={false}
          videoEditor={true}
          recordingTranscription={true}
        />
        {/* [Velt] Floating control panel (pause / stop / cancel + live preview)
            — mounted at canvas level so it is never clipped by the header */}
        <VeltRecorderControlPanel
          mode="floating"
          recordingCountdown={true}
          recordingTranscription={true}
          videoEditor={true}
        />
        {/* Recording / saving / saved status pill driven by recorder events —
            covers screen recordings, where the SDK panel isn't visible */}
        <RecordingStatusIndicator />
      </div>

      {/* Recordings drawer — every recording on this document with playback */}
      <RecordingsPanel open={recordingsOpen} onClose={() => setRecordingsOpen(false)} />
    </div>
  )
}
