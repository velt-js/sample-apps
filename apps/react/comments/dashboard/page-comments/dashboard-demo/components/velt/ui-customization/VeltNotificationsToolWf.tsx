"use client";
import { VeltNotificationsToolWireframe } from '@veltdev/react';

const bellIcon = "/icons/bell-icon.svg";

const VeltNotificationsToolWf = () => {
  return (
    <VeltNotificationsToolWireframe>
      <div
        style={{
          borderRadius: '23.333px',
          padding: '5.833px 4px 5.833px 7px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3.889px',
          cursor: 'pointer',
          boxSizing: 'border-box',
          flexShrink: 0
        }}
      >
        <div
          style={{
            width: '19.444px',
            height: '19.444px',
            position: 'relative',
            flexShrink: 0
          }}
        >
          <img
            src={bellIcon}
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
          <VeltNotificationsToolWireframe.UnreadCount />
        </div>
      </div>
    </VeltNotificationsToolWireframe>
  );
};

export default VeltNotificationsToolWf;
