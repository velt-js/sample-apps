"use client";
import { VeltCommentToolWireframe } from '@veltdev/react';

const VeltCommentToolWf = () => {
  return (
    // [Velt] Custom wireframe for comment tool - add new comment button
    <VeltCommentToolWireframe>
      <div
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#9ca3af',
          transition: 'color 0.2s',
          padding: '4px',
          borderRadius: '4px',
        }}
        className="comment-tool-icon hover:bg-gray-100"
      >
        {/* Comment outline icon for adding new comment */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          {/* Plus sign in the middle */}
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="10" y1="10" x2="14" y2="10" />
        </svg>
      </div>
    </VeltCommentToolWireframe>
  );
};

export default VeltCommentToolWf;
