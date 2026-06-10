'use client';

// [Velt] Recorder lifecycle events — recordingStarted/Stopped/Cancelled fire
// with the media type; recordingDone fires once the recording is saved
import { useRecorderEventCallback } from '@veltdev/react';
import { useEffect, useState } from 'react';

type Status =
  | { kind: 'idle' }
  | { kind: 'recording'; type: string }
  | { kind: 'saving'; type: string }
  | { kind: 'saved' };

const TYPE_LABELS: Record<string, string> = {
  audio: 'audio',
  video: 'video',
  screen: 'screen',
};

/**
 * Fixed status pill (bottom-center) showing the live recording state.
 * The SDK's floating control panel covers audio/video recordings, but during a
 * screen recording the user is often looking at the captured page itself with
 * no visible indicator — this fills that gap, and also shows an explicit
 * "Saving…" state between stopping a recording and it landing in the panel.
 */
export default function RecordingStatusIndicator() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [elapsed, setElapsed] = useState(0);

  // [Velt] Latest recorder events (each hook re-emits when its event fires)
  const started = useRecorderEventCallback('recordingStarted');
  const stopped = useRecorderEventCallback('recordingStopped');
  const cancelled = useRecorderEventCallback('recordingCancelled');
  const done = useRecorderEventCallback('recordingDone');

  useEffect(() => {
    if (!started) return;
    setStatus({ kind: 'recording', type: started.type });
    setElapsed(0);
  }, [started]);

  useEffect(() => {
    if (!stopped) return;
    // Recording captured; upload/processing continues until recordingDone
    setStatus((prev) =>
      prev.kind === 'recording' ? { kind: 'saving', type: prev.type } : prev
    );
  }, [stopped]);

  useEffect(() => {
    if (!cancelled) return;
    setStatus({ kind: 'idle' });
  }, [cancelled]);

  useEffect(() => {
    if (!done) return;
    setStatus({ kind: 'saved' });
  }, [done]);

  // Tick the elapsed timer while recording
  useEffect(() => {
    if (status.kind !== 'recording') return;
    const interval = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [status.kind]);

  // Auto-dismiss the "Saved" confirmation
  useEffect(() => {
    if (status.kind !== 'saved') return;
    const timeout = setTimeout(() => setStatus({ kind: 'idle' }), 3000);
    return () => clearTimeout(timeout);
  }, [status.kind]);

  if (status.kind === 'idle') return null;

  const minutes = Math.floor(elapsed / 60);
  const seconds = String(elapsed % 60).padStart(2, '0');

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2 px-4 py-2 rounded-full shadow-lg text-[13px] font-medium"
      style={{
        backgroundColor: 'var(--app-surface)',
        border: '1px solid var(--app-border)',
        color: 'var(--app-text-primary)',
      }}
    >
      {status.kind === 'recording' && (
        <>
          <span className="relative flex size-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: '#f55d67' }} />
            <span className="relative inline-flex rounded-full size-2.5" style={{ backgroundColor: '#f55d67' }} />
          </span>
          <span>
            Recording {TYPE_LABELS[status.type] ?? ''}… {minutes}:{seconds}
          </span>
        </>
      )}
      {status.kind === 'saving' && (
        <>
          <svg className="animate-spin size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
            <path d="M22 12a10 10 0 00-10-10" strokeLinecap="round" />
          </svg>
          <span>Saving {TYPE_LABELS[status.type] ?? ''} recording…</span>
        </>
      )}
      {status.kind === 'saved' && (
        <>
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Recording saved — view it in the Recordings panel</span>
        </>
      )}
    </div>
  );
}
