'use client';

import { useState } from 'react';
// [Velt] useRecordings: live subscription to all recordings on the current
// document; useRecorderUtils: Recorder API element (delete, config, etc.)
import { useRecordings, useRecorderUtils, VeltRecorderPlayer } from '@veltdev/react';
import type { GetRecordingsResponse } from '@veltdev/types';

interface RecordingsPanelProps {
  open: boolean;
  onClose: () => void;
}

// Derive a human label for the recording. Screen captures share the video mime
// type, but their asset file name starts with "Screen Recording".
function mediaKind(recording: GetRecordingsResponse): 'Audio' | 'Video' | 'Screen' | 'Recording' {
  const asset = recording.assets?.[0];
  const mimeType = asset?.mimeType ?? '';
  if (mimeType.startsWith('audio')) return 'Audio';
  if (asset?.fileName?.toLowerCase().includes('screen')) return 'Screen';
  if (mimeType.startsWith('video')) return 'Video';
  return 'Recording';
}

function RecordingCard({ recording }: { recording: GetRecordingsResponse }) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  // [Velt] Recorder API element for managing recordings
  const recorderElement = useRecorderUtils();

  const handleDelete = async () => {
    // [Velt] Remove the recording; the useRecordings subscription in the parent
    // re-emits automatically, so the card disappears without manual refetch
    await recorderElement?.deleteRecordings({ recorderIds: [recording.recorderId] });
  };

  const kind = mediaKind(recording);
  const summary = recording.transcription?.contentSummary;

  return (
    <div
      className="rounded-xl border overflow-hidden shrink-0"
      style={{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface)' }}
    >
      <div className="flex items-center gap-2 px-3 pt-3">
        {recording.from?.photoUrl && (
          <img
            src={recording.from.photoUrl}
            alt={recording.from?.name ?? 'Reviewer'}
            className="size-6 rounded-full shrink-0"
          />
        )}
        <span className="text-[13px] font-medium truncate" style={{ color: 'var(--app-text-primary)' }}>
          {recording.from?.name ?? 'Reviewer'}
        </span>
        <span
          className="px-2 py-[1px] rounded-full text-[11px] shrink-0"
          style={{ backgroundColor: 'rgba(99,102,241,0.14)', color: 'var(--app-text-secondary)' }}
        >
          {kind}
        </span>
        <div className="ml-auto shrink-0">
          {confirmingDelete ? (
            <span className="flex items-center gap-2 text-[12px]">
              <button
                onClick={handleDelete}
                className="cursor-pointer font-medium"
                style={{ color: '#f55d67' }}
              >
                Delete
              </button>
              <button
                onClick={() => setConfirmingDelete(false)}
                className="cursor-pointer"
                style={{ color: 'var(--app-text-tertiary)' }}
              >
                Cancel
              </button>
            </span>
          ) : (
            <button
              onClick={() => setConfirmingDelete(true)}
              className="cursor-pointer transition-colors"
              style={{ color: 'var(--app-text-tertiary)' }}
              aria-label="Delete recording"
              title="Delete recording"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* [Velt] Playback with AI summary tab + video editor; summary appears
          once transcription completes for the recording */}
      <div className="p-2">
        <VeltRecorderPlayer
          recorderId={recording.recorderId}
          summary={true}
          videoEditor={true}
          playbackOnPreviewClick={true}
        />
      </div>

      {summary && (
        <p
          className="px-3 pb-3 text-[12px] leading-relaxed"
          style={{ color: 'var(--app-text-tertiary)' }}
        >
          {summary}
        </p>
      )}
    </div>
  );
}

/**
 * Right-side drawer listing every recording left on this document.
 * Stays mounted at all times — visibility is toggled with `display` so the
 * Velt subscription and player web components keep their connections.
 */
export default function RecordingsPanel({ open, onClose }: RecordingsPanelProps) {
  // [Velt] Live array of recordings for the current document; re-emits on
  // every new recording and deletion
  const recordings = useRecordings();

  return (
    <div
      className="h-full shadow-xl transition-all duration-300 ease-in-out overflow-hidden flex flex-col"
      style={{
        width: open ? '380px' : '0px',
        backgroundColor: 'var(--app-comments-sidebar-bg)',
      }}
    >
      <div
        className="flex-col h-full w-[380px]"
        style={{ display: open ? 'flex' : 'none' }}
      >
        <div
          className="flex items-center justify-between p-4 border-b flex-shrink-0"
          style={{ borderColor: 'var(--app-border)' }}
        >
          <h2 className="font-semibold" style={{ color: 'var(--app-text-primary)' }}>
            Recordings
          </h2>
          <button
            onClick={onClose}
            className="transition-colors"
            style={{ color: 'var(--app-text-tertiary)' }}
            aria-label="Close recordings panel"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* min-h-0 lets this flex child shrink so the list scrolls instead of
            being clipped by the drawer's overflow-hidden */}
        <div className="flex-1 min-h-0 overflow-y-auto p-3 flex flex-col gap-3">
          {!recordings?.length ? (
            <div
              className="flex flex-col items-center gap-2 text-center px-6 py-12 text-[13px]"
              style={{ color: 'var(--app-text-tertiary)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="6" width="13" height="12" rx="2" />
                <path d="M15 10l7-3v10l-7-3" />
              </svg>
              <p>No recordings yet.</p>
              <p>Use the Record button in the top bar to leave audio, video, or screen feedback on this spec.</p>
            </div>
          ) : (
            recordings.map((recording) => (
              <RecordingCard key={recording.recorderId} recording={recording} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
