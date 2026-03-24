/**
 * Theme Toggle Component
 *
 * Vanilla JS port of the React ThemeToggle component.
 * Pill-shaped toggle with light/dark/system options.
 */

import { getTheme, setTheme, subscribeToTheme } from '../../lib/theme.js';

const sunIconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="5" />
  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
</svg>`;

const moonIconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
</svg>`;

const monitorIconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
  <line x1="8" y1="21" x2="16" y2="21" />
  <line x1="12" y1="17" x2="12" y2="21" />
</svg>`;

const options = [
  { value: 'light', icon: sunIconSvg, label: 'Light' },
  { value: 'dark', icon: moonIconSvg, label: 'Dark' },
  { value: 'system', icon: monitorIconSvg, label: 'System' },
];

/**
 * Create theme toggle component
 * @param {HTMLElement} container - Container element to append to
 * @returns {Object} - Component API with el and destroy methods
 */
export function createThemeToggle(container) {
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'var(--app-surface)',
    borderRadius: '8px',
    padding: '2px',
    gap: '2px',
  });

  const buttons = [];

  options.forEach((opt) => {
    const button = document.createElement('button');
    Object.assign(button.style, {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '28px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.15s, color 0.15s',
    });
    button.title = opt.label;
    button.innerHTML = opt.icon;

    button.addEventListener('click', () => setTheme(opt.value));

    buttons.push({ button, value: opt.value });
    wrapper.appendChild(button);
  });

  function updateButtons() {
    const currentTheme = getTheme();
    buttons.forEach(({ button, value }) => {
      const isActive = currentTheme === value;
      button.style.backgroundColor = isActive ? 'var(--app-toggle-active-bg)' : 'transparent';
      button.style.color = isActive ? 'var(--app-text-primary)' : 'var(--app-text-tertiary)';
    });
  }

  // Initial update
  updateButtons();

  // Subscribe to theme changes
  const unsubscribe = subscribeToTheme(() => updateButtons());

  container.appendChild(wrapper);

  return {
    el: wrapper,
    destroy() {
      unsubscribe();
      wrapper.remove();
    },
  };
}
