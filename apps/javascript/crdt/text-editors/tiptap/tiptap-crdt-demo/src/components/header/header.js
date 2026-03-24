/**
 * Header Component with Velt Tools and Theme Toggle
 */

import { createThemeToggle } from './theme-toggle.js';

/**
 * Create the Header component with theme toggle and Velt tools
 * @param {HTMLElement} container - Container element to mount into
 * @returns {Object} - Component API with el and destroy methods
 */
export function createHeader(container) {
  const header = document.createElement('div');
  header.className = 'absolute top-2 right-6 flex items-center gap-[6px] z-50';

  // Theme toggle
  const themeToggle = createThemeToggle(header);

  // Velt tools wrapper
  const toolsWrapper = document.createElement('div');
  toolsWrapper.className = 'flex items-center gap-[6px]';
  toolsWrapper.innerHTML = `
    <velt-presence></velt-presence>
    <velt-sidebar-button></velt-sidebar-button>
    <velt-huddle-tool type="all"></velt-huddle-tool>
    <velt-notifications-tool settings="true" shadow-dom="false"></velt-notifications-tool>
  `;
  header.appendChild(toolsWrapper);

  container.appendChild(header);

  return {
    el: header,
    destroy() {
      if (themeToggle && themeToggle.destroy) themeToggle.destroy();
      header.remove();
    },
  };
}
