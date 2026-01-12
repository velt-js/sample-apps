/**
 * Velt Initialize User Component
 *
 * Vanilla JS port of the React VeltInitializeUser component.
 * Handles user authentication with Velt using JWT tokens.
 */

import { authenticateUser } from '../../lib/velt.js';
import { getUser, initializeUser } from '../../lib/user.js';

/**
 * Initialize and authenticate user with Velt
 * @returns {Promise<Object>} - Authenticated user
 */
export async function initializeVeltUser() {
  // Initialize user from storage or generate new one
  const user = initializeUser();

  if (!user) {
    throw new Error('Failed to initialize user');
  }

  // Authenticate with Velt
  await authenticateUser(user);

  return user;
}

/**
 * Get current user
 * @returns {Object|undefined} - Current user or undefined
 */
export { getUser, initializeUser } from '../../lib/user.js';
