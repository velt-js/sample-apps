"use client";

import { useRecorderUtils } from "@veltdev/react";
import { useEffect } from "react";

/**
 * [Velt] Global Recorder configuration. Mounted once inside VeltCollaboration.
 * Enables transcription (AI summary + transcript on recordings), the beta
 * video editor (trim/retake after recording), and the pre-record countdown.
 */
export function VeltRecorderConfig() {
  // [Velt] Recorder API element
  const recorderElement = useRecorderUtils();

  useEffect(() => {
    if (!recorderElement) return;
    // [Velt] Generate transcript + AI content summary for each recording
    recorderElement.enableRecordingTranscription();
    // [Velt] Post-record trim / retake editor (beta)
    recorderElement.enableVideoEditor();
    // [Velt] 3-2-1 countdown before recording starts
    recorderElement.enableRecordingCountdown();
  }, [recorderElement]);

  return null;
}

export default VeltRecorderConfig;
