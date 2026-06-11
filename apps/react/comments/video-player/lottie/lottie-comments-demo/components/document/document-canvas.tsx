'use client'

import { useCallback, useRef, useState } from "react";
import Header from '@/components/header/header'
import Sidebar from '@/components/sidebar/sidebar'
import CommentsPanel from '@/components/comments/CommentsPanel'
import DocumentArticle from './DocumentArticle'
import type { SeekToCommentHandler } from '@/components/player/LottiePlayer'

export default function DocumentCanvas() {
  // Host app manages the Comments drawer state
  const [commentsOpen, setCommentsOpen] = useState(false);

  // Bridge between the comments sidebar and the Lottie player: the player
  // registers its seek-to-comment handler here, the panel invokes it
  const seekHandlerRef = useRef<SeekToCommentHandler | null>(null);
  const registerSeekHandler = useCallback((handler: SeekToCommentHandler) => {
    seekHandlerRef.current = handler;
  }, []);
  const handleSidebarCommentClick = useCallback<SeekToCommentHandler>((event) => {
    seekHandlerRef.current?.(event);
  }, []);

  const toggleComments = () => {
    setCommentsOpen((prev) => !prev);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto relative" style={{ backgroundColor: 'var(--app-bg)' }}>
        <Header toggleComments={toggleComments} />
        <DocumentArticle registerSeekHandler={registerSeekHandler} />
      </div>

      {/* Comments drawer — every frame-pinned comment with click-to-seek */}
      <CommentsPanel
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        onCommentClick={handleSidebarCommentClick}
      />
    </div>
  )
}
