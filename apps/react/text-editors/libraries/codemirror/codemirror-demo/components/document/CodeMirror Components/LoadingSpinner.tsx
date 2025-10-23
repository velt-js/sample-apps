import React from 'react';

interface LoadingSpinnerProps {
  loadingText?: string;
  subtitle?: string;
  size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  loadingText = 'Loading...', 
  subtitle,
  size = 'medium'
}) => {
  const getSpinnerSize = () => {
    switch (size) {
      case 'small': return '40px';
      case 'large': return '80px';
      default: return '60px';
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small': return '14px';
      case 'large': return '18px';
      default: return '16px';
    }
  };

  return (
    <div className="loading-spinner-overlay">
      <div className="loading-content">
        <div 
          className="loading-spinner" 
          style={{ width: getSpinnerSize(), height: getSpinnerSize() }}
        >
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <div 
          className="loading-text" 
          style={{ fontSize: getFontSize() }}
        >
          {loadingText}
        </div>
        {subtitle && (
          <div className="loading-subtitle">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner; 