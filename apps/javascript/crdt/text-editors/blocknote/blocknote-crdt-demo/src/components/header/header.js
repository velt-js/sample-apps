/**
 * Header Component
 *
 * Vanilla JS port of the React Header component.
 * Shows Velt logo, title, theme toggle, and Velt tools.
 */

import { createVeltTools } from '../velt/velt-tools.js';
import { createThemeToggle } from './theme-toggle.js';

/**
 * Create the Velt logo SVG
 * @returns {HTMLElement}
 */
function createVeltLogo() {
  const wrapper = document.createElement('div');
  wrapper.className = 'flex items-center justify-center';
  wrapper.style.width = '24px';
  wrapper.style.height = '24px';
  wrapper.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="var(--app-text-primary)"/>
    <path d="M2 17l10 5 10-5" stroke="var(--app-text-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M2 12l10 5 10-5" stroke="var(--app-text-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>`;
  return wrapper;
}

/**
 * Create the header component
 * @param {HTMLElement} container - Container element to append to
 * @returns {Object} - Component API with el and destroy methods
 */
export function createHeader(container) {
  const header = document.createElement('div');
  header.className = 'flex items-center justify-between gap-2 p-2 border-b';
  Object.assign(header.style, {
    backgroundColor: 'var(--app-bg)',
    borderColor: 'var(--app-border)',
  });

  // Left side: logo + title
  const left = document.createElement('div');
  left.className = 'flex items-center gap-2';

  left.appendChild(createVeltLogo());

  const title = document.createElement('h1');
  title.className = 'text-lg font-semibold';
  title.style.color = 'var(--app-text-primary)';
  title.textContent = 'Velt BlockNote Demo';
  left.appendChild(title);

  // Right side: theme toggle + Velt tools
  const right = document.createElement('div');
  right.className = 'flex items-center gap-2';

  const themeToggle = createThemeToggle(right);
  const veltTools = createVeltTools(right);

  header.appendChild(left);
  header.appendChild(right);
  container.appendChild(header);

  return {
    el: header,
    destroy() {
      if (themeToggle && themeToggle.destroy) themeToggle.destroy();
      if (veltTools && veltTools.destroy) veltTools.destroy();
      header.remove();
    },
  };
}
