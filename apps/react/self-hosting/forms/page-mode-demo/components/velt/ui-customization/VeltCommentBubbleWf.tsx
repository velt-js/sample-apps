"use client";
import { VeltCommentBubbleWireframe } from '@veltdev/react';

const VeltCommentBubbleWf = () => {
  return (
    // [Velt] Custom wireframe for comment bubble UI - shows when comments exist
    <VeltCommentBubbleWireframe>
      <div
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          color: '#754cff',
          transition: 'color 0.2s',
        }}
        className="comment-bubble-icon"
      >
        {/* Comment icon with fill when has comments */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="#754cff"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span
          style={{
            fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
            fontWeight: 600,
            fontSize: '13px',
            color: '#754cff',
            marginLeft: '4px'
          }}
        >
          <VeltCommentBubbleWireframe.CommentsCount />
        </span>
      </div>
    </VeltCommentBubbleWireframe>
  );
};

export default VeltCommentBubbleWf;
