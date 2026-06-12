'use client'

import { useState } from "react";
import Header from '@/components/header/header'
import Sidebar from '@/components/sidebar/sidebar'
import CommentsPanel from '@/components/comments/CommentsPanel'
import DocumentArticle from './DocumentArticle'

export default function DocumentCanvas() {
  // Host app manages the Comments drawer state
  const [commentsOpen, setCommentsOpen] = useState(false);

  const toggleComments = () => {
    setCommentsOpen((prev) => !prev);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto relative" style={{ backgroundColor: 'var(--app-bg)' }}>
        <Header toggleComments={toggleComments} />
        <DocumentArticle />
      </div>

      {/* Comments drawer — every data-point comment thread on the dashboard */}
      <CommentsPanel open={commentsOpen} onClose={() => setCommentsOpen(false)} />
    </div>
  )
}
