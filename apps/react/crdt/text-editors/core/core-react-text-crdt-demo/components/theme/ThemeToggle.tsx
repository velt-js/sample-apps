"use client";

import React from 'react';
import { useTheme } from './ThemeContext';

type ThemeOption = 'light' | 'dark' | 'system';

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const MonitorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const options: { value: ThemeOption; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <SunIcon />, label: 'Light' },
    { value: 'dark', icon: <MoonIcon />, label: 'Dark' },
    { value: 'system', icon: <MonitorIcon />, label: 'System' },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'var(--app-surface)',
      borderRadius: '8px',
      padding: '2px',
      gap: '2px',
    }}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setTheme(opt.value)}
          title={opt.label}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '28px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: theme === opt.value ? 'var(--app-toggle-active-bg)' : 'transparent',
            color: theme === opt.value ? 'var(--app-text-primary)' : 'var(--app-text-tertiary)',
            transition: 'background-color 0.15s, color 0.15s',
          }}
        >
          {opt.icon}
        </button>
      ))}
    </div>
  );
}
