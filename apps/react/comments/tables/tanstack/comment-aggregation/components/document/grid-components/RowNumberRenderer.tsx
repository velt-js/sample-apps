import React from 'react';

interface RowNumberRendererProps {
  rowIndex: number;
}

export const RowNumberRenderer: React.FC<RowNumberRendererProps> = ({ rowIndex }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      fontFamily: 'DM Mono, monospace',
      fontSize: '12px',
      color: 'var(--app-text-muted)',
      letterSpacing: '0.12px'
    }}>
      {rowIndex + 1}
    </div>
  );
};
