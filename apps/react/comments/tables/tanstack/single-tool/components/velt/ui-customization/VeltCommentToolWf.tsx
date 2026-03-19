"use client";
import { VeltCommentToolWireframe } from '@veltdev/react';

const VeltCommentToolWf = () => {
  return (
    // [Velt] Custom wireframe for comment tool UI
    <VeltCommentToolWireframe>
      <div
        style={{
          background: 'var(--app-border)',
          border: 'none',
          padding: '4.667px 6.32px 4.667px 6.222px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '28px',
          height: '28px',
          borderRadius: '18.667px',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            width: '15.556px',
            height: '15.556px',
            position: 'relative',
            overflow: 'clip',
            flexShrink: 0
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 'calc(50% + 0.492px)',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '11px',
              height: '11px',
              border: '1.5px solid var(--app-text-primary)',
              borderRadius: '6px 6px 6px 1px',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>
    </VeltCommentToolWireframe>
  );
};

export default VeltCommentToolWf;
