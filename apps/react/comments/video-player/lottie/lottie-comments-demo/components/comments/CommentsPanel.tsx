'use client';

// [Velt] Embedded comments sidebar — lists every frame-pinned comment thread
import { VeltCommentsSidebar } from '@veltdev/react';
import type { SeekToCommentHandler } from '@/components/player/LottiePlayer';

interface CommentsPanelProps {
  open: boolean;
  onClose: () => void;
  /** Seeks the Lottie player to a clicked comment's frame */
  onCommentClick: SeekToCommentHandler;
}

/**
 * Right-side drawer hosting the Velt comments sidebar. Stays mounted at all
 * times — visibility is toggled with `display` so the sidebar web component
 * keeps its connection instead of re-fetching on every open.
 */
export default function CommentsPanel({ open, onClose, onCommentClick }: CommentsPanelProps) {
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
            Comments
          </h2>
          <button
            onClick={onClose}
            className="transition-colors"
            style={{ color: 'var(--app-text-tertiary)' }}
            aria-label="Close comments panel"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden">
          {/* [Velt] Embedded sidebar; clicking a comment seeks the player to
              that comment's frame via the shared seek handler */}
          <VeltCommentsSidebar
            embedMode={true}
            groupConfig={{ enable: false }}
            onCommentClick={onCommentClick}
          />
        </div>
      </div>
    </div>
  );
}
