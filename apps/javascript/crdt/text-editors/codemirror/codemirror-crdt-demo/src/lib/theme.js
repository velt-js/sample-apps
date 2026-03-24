/**
 * Theme Module
 *
 * Vanilla JS implementation of light/dark/system theme management.
 * Mirrors the React ThemeContext from the React CodeMirror CRDT demo.
 */

const STORAGE_KEY = 'theme-preference';

let currentTheme = 'light';
let resolvedTheme = 'light';
const listeners = [];

/**
 * Get system preference
 * @returns {'light'|'dark'}
 */
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Resolve theme to light or dark
 * @param {'light'|'dark'|'system'} theme
 * @returns {'light'|'dark'}
 */
function resolveTheme(theme) {
  if (theme === 'system') return getSystemTheme();
  return theme;
}

/**
 * Apply resolved theme to DOM
 * @param {'light'|'dark'} resolved
 */
function applyTheme(resolved) {
  if (resolved === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

/**
 * Read theme from URL ?theme= param (set by master sample app)
 * @returns {'light'|'dark'|'system'|null}
 */
function getUrlTheme() {
  const params = new URLSearchParams(window.location.search);
  const t = params.get('theme');
  if (t === 'light' || t === 'dark' || t === 'system') return t;
  return null;
}

/**
 * Notify all listeners of theme change
 */
function notifyListeners() {
  listeners.forEach((fn) => fn({ theme: currentTheme, resolvedTheme }));
}

/**
 * Set theme
 * @param {'light'|'dark'|'system'} newTheme
 */
export function setTheme(newTheme) {
  currentTheme = newTheme;
  localStorage.setItem(STORAGE_KEY, newTheme);
  resolvedTheme = resolveTheme(newTheme);
  applyTheme(resolvedTheme);
  notifyListeners();
}

/**
 * Get current theme state
 * @returns {{ theme: string, resolvedTheme: string }}
 */
export function getTheme() {
  return { theme: currentTheme, resolvedTheme };
}

/**
 * Subscribe to theme changes
 * @param {Function} callback - Receives { theme, resolvedTheme }
 * @returns {Function} - Unsubscribe function
 */
export function subscribeToTheme(callback) {
  listeners.push(callback);
  return () => {
    const index = listeners.indexOf(callback);
    if (index > -1) listeners.splice(index, 1);
  };
}

/**
 * Initialize theme system
 * Reads from URL param, localStorage, or defaults to 'light'.
 * Sets up system preference listener and postMessage handler.
 */
export function initializeTheme() {
  // Hydrate from URL param or localStorage
  const stored = getUrlTheme() || localStorage.getItem(STORAGE_KEY) || 'light';
  currentTheme = stored;
  resolvedTheme = resolveTheme(stored);
  applyTheme(resolvedTheme);
  localStorage.setItem(STORAGE_KEY, stored);

  // Listen for system preference changes
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', () => {
    if (currentTheme === 'system') {
      resolvedTheme = getSystemTheme();
      applyTheme(resolvedTheme);
      notifyListeners();
    }
  });

  // Listen for postMessage from master app for live theme switching
  window.addEventListener('message', (event) => {
    if (event.data?.type === 'theme-change' && event.data.theme) {
      setTheme(event.data.theme);
    }
  });
}
