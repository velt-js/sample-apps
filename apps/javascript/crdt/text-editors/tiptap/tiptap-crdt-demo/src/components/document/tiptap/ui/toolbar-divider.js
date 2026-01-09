/**
 * Toolbar Divider Component
 *
 * Visual divider for separating toolbar button groups.
 */

/**
 * Create a toolbar divider element
 * @returns {HTMLElement} - Divider element
 */
export function createToolbarDivider() {
  const divider = document.createElement('div');
  divider.className = 'flex items-center justify-center relative shrink-0 h-[20px]';
  divider.innerHTML = '<div class="w-[1px] h-full bg-[rgb(255,255,255)] opacity-20"></div>';
  return divider;
}

