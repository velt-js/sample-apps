import React from 'react';

export const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: 'var(--app-bg)' as any,
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '32px',
    paddingTop: '80px',
    gap: '16px',
  },
  tableContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '1600px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--app-surface)' as any,
    borderRadius: '8px',
    overflow: 'hidden',
    paddingTop: '40px',
    paddingBottom: '16px',
  },
  gridWrapper: {
    width: '100%',
    height: '100%',
    padding: '16px',
  },
};
