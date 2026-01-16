"use client";
import { VeltSidebarButtonWireframe } from '@veltdev/react';

const VeltSidebarButtonWf = () => {
  return (
    // [Velt] Custom wireframe for sidebar button - opens embedded comments panel
    <VeltSidebarButtonWireframe>
      <div
        style={{
          background: '#754cff',
          borderRadius: '8px',
          padding: '6px 12px 6px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          height: '32px',
          cursor: 'pointer',
          boxSizing: 'border-box',
          flexShrink: 0,
          boxShadow: '0px 0px 0px 1px #5a34d9, 0px 1px 2px rgba(23, 32, 38, 0.24), inset 0px 1px 0px 0px rgba(255, 255, 255, 0.3)'
        }}
      >
        {/* Comments icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <div
          style={{
            fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
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
