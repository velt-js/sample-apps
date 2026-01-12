/**
 * Header Component with Velt Tools
 *
 * Vanilla JS port of the React Header and VeltTools components.
 * Uses Velt web components for presence, sidebar button, huddle, and notifications.
 */

/**
 * Create the Header component with Velt tools
 * @param {HTMLElement} container - Container element to mount into
 * @returns {Object} - Component API with el and destroy methods
 */
export function createHeader(container) {
  const header = document.createElement('div');
  header.className = 'absolute top-2 right-6 flex items-center gap-[6px] z-50';

  // Velt tools - using web components
  header.innerHTML = `
    <!-- [Velt] Show online users -->
    <velt-presence></velt-presence>
    <!-- [Velt] Toggle comments sidebar -->
    <velt-sidebar-button></velt-sidebar-button>
    <!-- [Velt] Video call tool -->
    <velt-huddle-tool type="all"></velt-huddle-tool>
    <!-- [Velt] Notifications panel -->
    <velt-notifications-tool
      settings="true"
      shadow-dom="false"
    ></velt-notifications-tool>
  `;

  container.appendChild(header);

  return {
    el: header,
    destroy() {
      header.remove();
    },
  };
}
