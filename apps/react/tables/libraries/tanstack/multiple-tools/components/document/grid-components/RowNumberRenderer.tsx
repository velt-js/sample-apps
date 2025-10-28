import React from 'react';

export const RowNumberRenderer = (props: any) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      fontFamily: 'DM Mono, monospace',
      fontSize: '12px',
      color: 'rgba(255, 255, 255, 0.5)',
      letterSpacing: '0.12px'
    }}>
      {props.node.rowIndex + 1}
    </div>
  );
};
