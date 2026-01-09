/**
 * Toolbar Button Component
 *
 * Reusable button component for the bubble menu toolbar.
 */

/**
 * Create a toolbar button element
 * @param {Object} options - Button options
 * @param {string} options.icon - Icon path
 * @param {string} options.alt - Alt text for the icon
 * @param {boolean} options.active - Whether the button is active
 * @param {Function} options.onClick - Click handler
 * @returns {HTMLElement} - Button element
 */
export function createToolbarButton({ icon, alt, active, onClick }) {
  const button = document.createElement('div');
  button.className = `box-border content-stretch flex items-center p-[8px] relative rounded-[12px] shrink-0 cursor-pointer transition-all ${
    active ? 'bg-[rgb(255,255,255)]' : 'hover:bg-white/10'
  }`;

  button.innerHTML = `
    <div class="relative shrink-0 size-[20px] transition-all">
      <img
        alt="${alt}"
        class="block max-w-none size-full"
        src="${icon}"
        style="${active
          ? 'filter: brightness(0) saturate(100%) invert(9%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(92%);'
          : 'filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(0deg) brightness(100%) contrast(100%);'
        }"
      />
    </div>
  `;

  button.addEventListener('click', onClick);

  return button;
}

