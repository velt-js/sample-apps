"use client";
import { VeltSidebarButtonWireframe } from '@veltdev/react';

const inboxIcon = "http://localhost:3845/assets/dc5877167057758b07de4a56c967d02885b26646.svg";

const VeltSidebarButtonWf = () => {
  return (
    <VeltSidebarButtonWireframe>
      <div
        style={{
          background: '#141414',
          borderRadius: '24px',
          padding: '6px 8px 6px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          height: '28px',
          cursor: 'pointer',
          boxSizing: 'border-box',
          flexShrink: 0
        }}
      >
        <div
          style={{
            width: '17px',
            height: '17px',
            position: 'relative',
            overflow: 'clip',
            flexShrink: 0
          }}
        >
          <img
            src={inboxIcon}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              display: 'block'
            }}
          />
        </div>
        <div
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '1.5',
            color: 'white',
            whiteSpace: 'pre',
            flexShrink: 0
          }}
        >
          <VeltSidebarButtonWireframe.CommentsCount />
        </div>
      </div>
    </VeltSidebarButtonWireframe>
  );
};

export default VeltSidebarButtonWf;
