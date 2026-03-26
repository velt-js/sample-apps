/**
 * Theme Management Module
 *
 * Vanilla JS port of the React ThemeContext.
 * Supports light, dark, and system themes with URL param override and postMessage sync.
 */

import { setVeltDarkMode } from './velt.js';

const STORAGE_KEY = 'theme-preference';

let currentTheme = 'dark';
let resolvedTheme = 'dark';
const themeListeners = [];

/**
 * Get system theme preference
 * @returns {'light'|'dark'} - System theme
 */
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Resolve a theme value to light or dark
 * @param {'light'|'dark'|'system'} theme - Theme value
 * @returns {'light'|'dark'} - Resolved theme
 */
function resolveThemeValue(theme) {
  if (theme === 'system') return getSystemTheme();
  return theme;
}

/**
 * Apply theme to the DOM
 * @param {'light'|'dark'} resolved - Resolved theme
 */
function applyTheme(resolved) {
  if (resolved === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  // Sync Velt dark mode
  setVeltDarkMode(resolved === 'dark');
}

/**
 * Read theme from URL ?theme= param
 * @returns {'light'|'dark'|'system'|null}
 */
function getUrlTheme() {
  const params = new URLSearchParams(window.location.search);
  const t = params.get('theme');
  if (t === 'light' || t === 'dark' || t === 'system') return t;
  return null;
}

/**
 * Get initial theme from URL or localStorage
 * @returns {'light'|'dark'|'system'}
 */
function getInitialTheme() {
  return getUrlTheme() || localStorage.getItem(STORAGE_KEY) || 'dark';
}

/**
 * Notify all theme listeners
 */
function notifyListeners() {
  themeListeners.forEach(callback => callback(resolvedTheme, currentTheme));
}

/**
 * Get current resolved theme
 * @returns {'light'|'dark'}
 */
export function getResolvedTheme() {
  return resolvedTheme;
}

/**
 * Get current theme setting
 * @returns {'light'|'dark'|'system'}
 */
export function getTheme() {
  return currentTheme;
}

/**
 * Set theme
 * @param {'light'|'dark'|'system'} theme - Theme to set
 */
export function setTheme(theme) {
  currentTheme = theme;
  localStorage.setItem(STORAGE_KEY, theme);
  resolvedTheme = resolveThemeValue(theme);
  applyTheme(resolvedTheme);
  notifyListeners();
}

/**
 * Subscribe to theme changes
 * @param {Function} callback - Callback receiving (resolvedTheme, theme)
 * @returns {Function} - Unsubscribe function
 */
export function subscribeToTheme(callback) {
  themeListeners.push(callback);
  // Call immediately with current state
  callback(resolvedTheme, currentTheme);
  return () => {
    const index = themeListeners.indexOf(callback);
    if (index > -1) {
      themeListeners.splice(index, 1);
    }
  };
}

/**
 * Initialize theme system
 * Sets up listeners for postMessage and system preference changes.
 */
export function initializeTheme() {
  // Set initial theme
  currentTheme = getInitialTheme();
  resolvedTheme = resolveThemeValue(currentTheme);
  applyTheme(resolvedTheme);

  // Listen for postMessage from master app for live theme switching
  window.addEventListener('message', (event) => {
    if (event.data?.type === 'theme-change' && event.data.theme) {
      setTheme(event.data.theme);
    }
  });

  // Listen for system preference changes when theme is 'system'
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', () => {
    if (currentTheme === 'system') {
      resolvedTheme = getSystemTheme();
      applyTheme(resolvedTheme);
      notifyListeners();
    }
  });
}
