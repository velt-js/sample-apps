'use client';

// [Velt] Drop-in Activity Log feed UI (date-grouped, loading/empty states, feature filtering)
import { VeltActivityLog } from '@veltdev/react';

interface ActivityLogPanelProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Right-side drawer that hosts the Velt Activity Log.
 *
 * IMPORTANT (Velt): the <VeltActivityLog> web component stays mounted at all
 * times — we only toggle VISIBILITY with `display`. Conditionally mounting it
 * (`{open && <VeltActivityLog />}`) would tear down its backend connection and
 * re-fetch on every open. Do NOT pass style/className to <VeltActivityLog>
 * directly; wrap it in a styled <div> and set shadowDom={false} for CSS access.
 */
export default function ActivityLogPanel({ open, onClose }: ActivityLogPanelProps) {
  return (
    <div
      className="h-full shadow-xl transition-all duration-300 ease-in-out overflow-hidden flex flex-col"
      style={{
        width: open ? '380px' : '0px',
        backgroundColor: 'var(--app-comments-sidebar-bg)',
      }}
    >
      {/* Always rendered; hidden via display when closed so the feed stays connected */}
      <div
        className="flex-col h-full w-[380px]"
        style={{ display: open ? 'flex' : 'none' }}
      >
        <div
          className="flex items-center justify-between p-4 border-b flex-shrink-0"
          style={{ borderColor: 'var(--app-border)' }}
        >
          <h2 className="font-semibold" style={{ color: 'var(--app-text-primary)' }}>
            Activity Log
          </h2>
          <button
            onClick={onClose}
            className="transition-colors"
            style={{ color: 'var(--app-text-tertiary)' }}
            aria-label="Close activity log"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <VeltActivityLog shadowDom={false} />
        </div>
      </div>
    </div>
  );
}
