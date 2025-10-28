import React from 'react';

interface SortIconProps {
  direction: 'asc' | 'desc' | null;
}

export const SortIcon: React.FC<SortIconProps> = ({ direction }) => {
  if (direction === 'asc') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9L7 5M7 5L11 9M7 5V19" stroke="#FFCD2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 15L17 19M17 19L13 15M17 19V5" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 15L17 19M17 19L13 15M17 19V5" stroke="black" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (direction === 'desc') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9L7 5M7 5L11 9M7 5V19" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 9L7 5M7 5L11 9M7 5V19" stroke="black" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 15L17 19M17 19L13 15M17 19V5" stroke="#FFCD2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Neutral state - both arrows grayed out
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9L7 5M7 5L11 9M7 5V19" stroke="white" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 9L7 5M7 5L11 9M7 5V19" stroke="black" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 15L17 19M17 19L13 15M17 19V5" stroke="white" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 15L17 19M17 19L13 15M17 19V5" stroke="black" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
