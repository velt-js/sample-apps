import React from 'react';
import { ViewType } from '../types';

interface ViewToggleProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ currentView, onViewChange }) => {
  const getButtonStyle = (isActive: boolean) => ({
    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
    border: 'none',
    borderRadius: '8px',
    padding: '4px 8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

  const getTextStyle = (isActive: boolean) => ({
    fontFamily: 'Urbanist, sans-serif',
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: '16px',
    color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.52)',
    whiteSpace: 'pre' as const,
    letterSpacing: '0.13px',
  });

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
      <button
        style={getButtonStyle(currentView === 'day')}
        onClick={() => onViewChange('day')}
      >
        <span style={getTextStyle(currentView === 'day')}>Day View</span>
      </button>
      <button
        style={getButtonStyle(currentView === 'week')}
        onClick={() => onViewChange('week')}
      >
        <span style={getTextStyle(currentView === 'week')}>Weekly View</span>
      </button>
      <button
        style={getButtonStyle(currentView === 'month')}
        onClick={() => onViewChange('month')}
      >
        <span style={getTextStyle(currentView === 'month')}>Monthly View</span>
      </button>
    </div>
  );
};
