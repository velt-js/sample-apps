"use client";
import { VeltCommentToolWireframe } from '@veltdev/react';

const VeltCommentToolWf = () => {
  return (
    <VeltCommentToolWireframe>
      <div
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="rgb(152,152,152)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>
    </VeltCommentToolWireframe>
  );
};

export default VeltCommentToolWf;
