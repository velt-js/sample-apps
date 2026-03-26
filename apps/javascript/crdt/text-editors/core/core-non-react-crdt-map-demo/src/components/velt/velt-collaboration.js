/**
 * Velt Collaboration Component
 *
 * Velt Collaboration Component
 *
 * Creates Velt comments and sidebar web components.
 */

import { getVeltClient } from '../../lib/velt.js';
import { subscribeToUser } from '../../lib/user.js';

/**
 * Create Velt collaboration components (comments, sidebar)
 * @param {HTMLElement} container - Container element to append to
 * @returns {Object} - Component API with el and destroy methods
 */
export function createVeltCollaboration(container) {
  // Create wrapper for Velt components
  const wrapper = document.createElement('div');
  wrapper.id = 'velt-collaboration';

  // Create Velt Comments component
  const comments = document.createElement('velt-comments');
  comments.setAttribute('text-mode', 'false');
  comments.setAttribute('shadow-dom', 'false');
  wrapper.appendChild(comments);

  // Create Velt Comments Sidebar
  const sidebar = document.createElement('velt-comments-sidebar');
  wrapper.appendChild(sidebar);

  container.appendChild(wrapper);

  // Subscribe to user changes to handle sign out
  const unsubscribe = subscribeToUser((user, isLoggedIn) => {
    const client = getVeltClient();
    if (isLoggedIn === false && client) {
      client.signOutUser();
    }
  });

  return {
    el: wrapper,
    destroy() {
      unsubscribe();
      wrapper.remove();
    },
  };
}
