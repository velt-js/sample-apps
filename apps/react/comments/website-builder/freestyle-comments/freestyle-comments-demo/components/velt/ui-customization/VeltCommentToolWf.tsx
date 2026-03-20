"use client";
import { VeltCommentToolWireframe } from '@veltdev/react';

const VeltCommentToolWf = () => {
  return (
    <VeltCommentToolWireframe>
      <div
        style={{
          background: 'var(--app-border)',
          border: 'none',
          padding: '5px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '28px',
          height: '28px',
          borderRadius: '18px',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            width: '18px',
            height: '18px',
            position: 'relative',
            flexShrink: 0
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '14px',
              height: '14px',
              border: '1.5px solid var(--app-text-primary)',
              borderRadius: '7px 7px 7px 2px',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>
    </VeltCommentToolWireframe>
  );
};

export default VeltCommentToolWf;
