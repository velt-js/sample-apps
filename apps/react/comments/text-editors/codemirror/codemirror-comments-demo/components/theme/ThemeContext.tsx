"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'theme-preference';

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme === 'system') return getSystemTheme();
  return theme;
}

function applyTheme(resolved: ResolvedTheme) {
  if (typeof document === 'undefined') return;
  if (resolved === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

/** Read theme from URL ?theme= param (set by master sample app) */
function getUrlTheme(): Theme | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const t = params.get('theme');
  if (t === 'light' || t === 'dark' || t === 'system') return t;
  return null;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  }, []);

  // Hydrate from URL param / localStorage after mount to avoid SSR mismatch
  useEffect(() => {
    const stored = getUrlTheme() || (localStorage.getItem(STORAGE_KEY) as Theme) || 'light';
    setThemeState(stored);
    if (stored !== theme) {
      localStorage.setItem(STORAGE_KEY, stored);
    }
  }, []);

  useEffect(() => {
    const resolved = resolveTheme(theme);
    setResolvedTheme(resolved);
    applyTheme(resolved);
  }, [theme]);

  // Listen for postMessage from master app for live theme switching
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'theme-change' && event.data.theme) {
        const newTheme = event.data.theme as Theme;
        setThemeState(newTheme);
        localStorage.setItem(STORAGE_KEY, newTheme);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      const resolved = getSystemTheme();
      setResolvedTheme(resolved);
      applyTheme(resolved);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme hook - works both with and without ThemeProvider.
 * When ThemeProvider is present, uses shared context.
 * When absent, manages its own state as a standalone fallback.
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  // Standalone state — always called to satisfy rules of hooks
  const [localTheme, setLocalThemeState] = useState<Theme>('light');
  const [localResolved, setLocalResolved] = useState<ResolvedTheme>('light');

  // Hydrate standalone state from storage after mount
  useEffect(() => {
    if (context) return;
    const stored = getUrlTheme() || (localStorage.getItem(STORAGE_KEY) as Theme) || 'light';
    setLocalThemeState(stored);
  }, [context]);

  const setLocalTheme = useCallback((newTheme: Theme) => {
    setLocalThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newTheme);
    }
  }, []);

  // Only apply side effects when running standalone (no provider)
  useEffect(() => {
    if (context) return;
    const resolved = resolveTheme(localTheme);
    setLocalResolved(resolved);
    applyTheme(resolved);
  }, [localTheme, context]);

  useEffect(() => {
    if (context) return;
    if (localTheme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      const resolved = getSystemTheme();
      setLocalResolved(resolved);
      applyTheme(resolved);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [localTheme, context]);

  if (context) return context;
  return { theme: localTheme, resolvedTheme: localResolved, setTheme: setLocalTheme };
}
