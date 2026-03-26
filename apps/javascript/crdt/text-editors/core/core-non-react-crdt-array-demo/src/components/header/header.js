/**
 * Header Component
 *
 * Absolute positioned top-right with ThemeToggle + VeltTools.
 */

// [Velt] Import Velt tool components (presence, sidebar button, notifications, huddle)
import { createVeltTools } from '../velt/velt-tools.js';
import { createThemeToggle } from './theme-toggle.js';

export function createHeader(container) {
  const header = document.createElement('div');
  header.className = 'absolute top-2 right-6 flex items-center gap-[6px] z-50';

  const themeToggle = createThemeToggle(header);
  // [Velt] Mount Velt collaboration tools in the header
  const veltTools = createVeltTools(header);

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
