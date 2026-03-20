"use client";
import { VeltCommentToolWireframe } from '@veltdev/react';

const VeltCommentToolWf = () => {
  return (
    <VeltCommentToolWireframe>
      <div
        style={{
          background: '#252525',
          border: 'none',
          padding: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: '16px',
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
              border: '1.5px solid #ffffff',
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
