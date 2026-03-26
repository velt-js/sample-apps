/**
 * Velt Tools Component
 *
 * Velt Tools Component
 *
 * Creates Velt tool web components (presence, sidebar button, notifications, huddle).
 */

/**
 * Create Velt tool components
 * @param {HTMLElement} container - Container element to append to
 * @returns {Object} - Component API with el and destroy methods
 */
export function createVeltTools(container) {
  // Create wrapper for Velt tools
  const wrapper = document.createElement('div');
  wrapper.className = 'flex items-center gap-2';

  // [Velt] Show online users
  const presence = document.createElement('velt-presence');
  wrapper.appendChild(presence);

  // [Velt] Toggle comments sidebar
  const sidebarButton = document.createElement('velt-sidebar-button');
  wrapper.appendChild(sidebarButton);

  // [Velt] Video call tool
  const huddleTool = document.createElement('velt-huddle-tool');
  huddleTool.setAttribute('type', 'all');
  wrapper.appendChild(huddleTool);

  // [Velt] Notifications panel
  const notificationsTool = document.createElement('velt-notifications-tool');
  notificationsTool.setAttribute('settings', 'true');
  notificationsTool.setAttribute('shadow-dom', 'false');
  wrapper.appendChild(notificationsTool);

  container.appendChild(wrapper);

  return {
    el: wrapper,
    destroy() {
      wrapper.remove();
    },
  };
}

/**
 * Configure notifications tool settings
 * Call this after Velt client is initialized.
 * @param {Object} veltClient - Velt client instance
 */
export function configureNotificationsTool(veltClient) {
  if (!veltClient) return;

  try {
    const notificationElement = veltClient.getNotificationElement();
    if (notificationElement) {
      notificationElement.setTabConfig({
        forYou: { name: 'For You', enable: true },
        documents: { name: 'Payrolls', enable: true },
        all: { name: 'All', enable: true },
      });
    }
  } catch (error) {
    console.warn('[VeltTools] Failed to configure notifications:', error);
  }
}
