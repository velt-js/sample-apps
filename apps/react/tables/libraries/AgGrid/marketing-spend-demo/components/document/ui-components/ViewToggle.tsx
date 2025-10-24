import React from 'react';

export const ViewToggle: React.FC = () => {
  return (
    <div style={{
      position: 'absolute',
      left: '12px',
      top: '14px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '4px',
      zIndex: 10,
    }}>
      <button style={{
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        border: 'none',
        borderRadius: '8px',
        padding: '4px 8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: 'Urbanist, sans-serif',
          fontSize: '13px',
          fontWeight: 400,
          lineHeight: '16px',
          color: '#ffffff',
          whiteSpace: 'pre',
          letterSpacing: '0.13px',
        }}>Day View</span>
      </button>
      <button style={{
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '8px',
        padding: '4px 8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: 'Urbanist, sans-serif',
          fontSize: '13px',
          fontWeight: 400,
          lineHeight: '16px',
          color: 'rgba(255, 255, 255, 0.52)',
          whiteSpace: 'pre',
          letterSpacing: '0.13px',
        }}>Weekly View</span>
      </button>
      <button style={{
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '8px',
        padding: '4px 8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: 'Urbanist, sans-serif',
          fontSize: '13px',
          fontWeight: 400,
          lineHeight: '16px',
          color: 'rgba(255, 255, 255, 0.52)',
          whiteSpace: 'pre',
          letterSpacing: '0.13px',
        }}>Monthly View</span>
      </button>
    </div>
  );
};
