"use client";

import React from 'react';
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react';
import { useTheme } from './ThemeContext';

type ThemeOption = 'light' | 'dark' | 'system';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const options: { value: ThemeOption; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <IconSun size={16} stroke={1.5} />, label: 'Light' },
    { value: 'dark', icon: <IconMoon size={16} stroke={1.5} />, label: 'Dark' },
    { value: 'system', icon: <IconDeviceDesktop size={16} stroke={1.5} />, label: 'System' },
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
