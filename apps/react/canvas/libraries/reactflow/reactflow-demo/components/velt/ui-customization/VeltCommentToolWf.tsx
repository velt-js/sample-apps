"use client";
import { VeltCommentToolWireframe } from '@veltdev/react';

const VeltCommentToolWf = () => {
  return (
    <VeltCommentToolWireframe>
      <div 
        style={{
          background: 'transparent',
          border: 'none',
          padding: '0',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '20px',
          height: '20px'
        }}
      >
        <div
          style={{
            width: '15.556px',
            height: '15.556px',
            position: 'relative'
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '11px',
              height: '11px',
              border: '1.5px solid white',
              borderRadius: '6px 6px 6px 1px'
            }}
          />
        </div>
      </div>
    </VeltCommentToolWireframe>
  );
};

export default VeltCommentToolWf;

