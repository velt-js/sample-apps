/**
 * Theme Toggle Component
 *
 * Vanilla JS port of the React ThemeToggle component.
 * Three-button toggle for Light/Dark/System modes.
 */

import { getTheme, setTheme, subscribeToTheme } from '../../lib/theme.js';

const SunIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="5" />
  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
</svg>`;

const MoonIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
</svg>`;

const MonitorIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
  <line x1="8" y1="21" x2="16" y2="21" />
  <line x1="12" y1="17" x2="12" y2="21" />
</svg>`;

const options = [
  { value: 'light', icon: SunIcon, label: 'Light' },
  { value: 'dark', icon: MoonIcon, label: 'Dark' },
  { value: 'system', icon: MonitorIcon, label: 'System' },
];

/**
 * Create the theme toggle component
 * @param {HTMLElement} container - Container element to mount into
 * @returns {Object} - Component API with el and destroy methods
 */
export function createThemeToggle(container) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'display:flex;flex-direction:row;align-items:center;background-color:var(--app-surface);border-radius:8px;padding:2px;gap:2px;';

  const buttons = [];

  options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.title = opt.label;
    btn.innerHTML = opt.icon;
    btn.style.cssText = 'display:flex;align-items:center;justify-content:center;width:32px;height:28px;border-radius:6px;border:none;cursor:pointer;transition:background-color 0.15s, color 0.15s;';
    btn.addEventListener('click', () => setTheme(opt.value));
    wrapper.appendChild(btn);
    buttons.push({ btn, value: opt.value });
  });

  function updateButtons() {
    const { theme } = getTheme();
    buttons.forEach(({ btn, value }) => {
      const isActive = theme === value;
      btn.style.backgroundColor = isActive ? 'var(--app-toggle-active-bg)' : 'transparent';
      btn.style.color = isActive ? 'var(--app-text-primary)' : 'var(--app-text-tertiary)';
    });
  }

  updateButtons();
  const unsubscribe = subscribeToTheme(updateButtons);

  container.appendChild(wrapper);

  return {
    el: wrapper,
    destroy() {
      unsubscribe();
      wrapper.remove();
    },
  };
}
