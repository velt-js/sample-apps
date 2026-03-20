"use client";
import { VeltSidebarButtonWireframe } from '@veltdev/react';

const inboxIcon = "/icons/inbox-icon.svg";

const VeltSidebarButtonWf = () => {
  return (
    <VeltSidebarButtonWireframe>
      <div
        style={{
          background: '#252525',
          borderRadius: '16px',
          padding: '6px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          height: '32px',
          cursor: 'pointer',
          boxSizing: 'border-box',
          flexShrink: 0
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
          <img
            src={inboxIcon}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              filter: 'none'
            }}
          />
        </div>
        <div
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '1.5',
            color: '#ffffff',
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
