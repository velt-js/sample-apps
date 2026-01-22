"use client";

import React, { useCallback, useContext, useEffect, useState, useMemo } from "react";

/**
 * ⚠️ IMPORTANT DISCLAIMER FOR DEVELOPERS ⚠️
 *
 * This user authentication logic is ONLY for demo purposes.
 * It uses hardcoded users and URL parameters to simulate a multi-user collaboration environment.
 *
 * IN YOUR REAL APPLICATION:
 * - Fetch the currently logged in user from YOUR existing authentication system
 * - Use your own user management (Auth0, Firebase Auth, custom backend, etc.)
 * - Simply pass your authenticated user object to Velt's identify() method
 *
 * Example of real-world usage:
 * ```typescript
 * const currentUser = await yourAuthSystem.getCurrentUser();
 * const authProvider: VeltAuthProvider = { user: currentUser, generateToken: ... };
 * ```
 *
 * DEMO USAGE:
 * - First visit: Randomly assigns a user (1-10), persists in localStorage
 * - Refresh: Same user (from localStorage)
 * - Incognito/different profile: Gets different random user (isolated localStorage)
 * - Explicit: Use ?userId=3 in URL to force a specific user
 */

export type User = {
  userId: string;
  name: string;
  email: string;
  organizationId?: string;
};

// 10 hardcoded demo users
const DEMO_USERS = [
  { userId: "user-1", name: "Alex Smith", email: "alex.smith@example.com" },
  { userId: "user-2", name: "Sam Johnson", email: "sam.johnson@example.com" },
  { userId: "user-3", name: "Jordan Williams", email: "jordan.williams@example.com" },
  { userId: "user-4", name: "Taylor Brown", email: "taylor.brown@example.com" },
  { userId: "user-5", name: "Casey Jones", email: "casey.jones@example.com" },
  { userId: "user-6", name: "Morgan Garcia", email: "morgan.garcia@example.com" },
  { userId: "user-7", name: "Riley Miller", email: "riley.miller@example.com" },
  { userId: "user-8", name: "Avery Davis", email: "avery.davis@example.com" },
  { userId: "user-9", name: "Quinn Wilson", email: "quinn.wilson@example.com" },
  { userId: "user-10", name: "Drew Martinez", email: "drew.martinez@example.com" },
];

const ORGANIZATION_ID = "page-mode-demo";
const STORAGE_KEY = 'velt-demo-userId';

type AppUserContextValue = {
  user: User | undefined;
  login: (u: User) => void;
  logout: () => void;
  isUserLoggedIn?: boolean;
  /** All available demo users for UI selection */
  availableUsers: User[];
};

const AppUserContext = React.createContext<AppUserContextValue | undefined>(undefined);

// [Host App] Save user to database via host-app API
async function saveUserToDatabase(user: User): Promise<void> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SELF_HOSTING_BASE_URL?.replace('/api/velt', '') || 'http://localhost:8000';
    const response = await fetch(`${baseUrl}/api/host-app/users/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user })
    });
    if (!response.ok) {
      console.warn('[Host App] Failed to save user:', response.status);
    } else {
      console.log('[Host App] User saved to database:', user.userId);
    }
  } catch (error) {
    console.error('[Host App] Error saving user:', error);
  }
}

/**
 * Get user index from various sources (URL param, localStorage, or random)
 * Returns a 1-based index (1-10)
 */
function getUserIndex(): number {
  // 1. Check URL param first (allows explicit user selection)
  const urlParams = new URLSearchParams(window.location.search);
  const urlUserId = urlParams.get('userId');
  if (urlUserId) {
    const parsed = parseInt(urlUserId, 10);
    if (parsed >= 1 && parsed <= 10) {
      return parsed;
    }
  }

  // 2. Check localStorage for existing user
  const storedId = localStorage.getItem(STORAGE_KEY);
  if (storedId) {
    const parsed = parseInt(storedId, 10);
    if (parsed >= 1 && parsed <= 10) {
      return parsed;
    }
  }

  // 3. Generate random user (1-10)
  return Math.floor(Math.random() * 10) + 1;
}

export function AppUserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    async function initializeUser() {
      const userIndex = getUserIndex();
      const selectedUser: User = { ...DEMO_USERS[userIndex - 1], organizationId: ORGANIZATION_ID };

      // Persist to localStorage
      localStorage.setItem(STORAGE_KEY, String(userIndex));

      // Update URL for shareability (without triggering navigation)
      const url = new URL(window.location.href);
      url.searchParams.set('userId', String(userIndex));
      window.history.replaceState({}, '', url.toString());

      setUser(selectedUser);
      setIsUserLoggedIn(true);

      // [Host App] Save user to database
      await saveUserToDatabase(selectedUser);
    }

    initializeUser();
  }, []);

  const login = useCallback(async (nextUser: User) => {
    if (typeof window === 'undefined') return;

    // Find the user index from DEMO_USERS
    const userIndex = DEMO_USERS.findIndex(u => u.userId === nextUser.userId);
    if (userIndex === -1) {
      console.warn('[Demo] Attempted to login with non-demo user');
      return;
    }

    const userWithOrg: User = { ...DEMO_USERS[userIndex], organizationId: ORGANIZATION_ID };

    // Persist to localStorage
    localStorage.setItem(STORAGE_KEY, String(userIndex + 1));

    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.set('userId', String(userIndex + 1));
    window.history.replaceState({}, '', url.toString());

    setUser(userWithOrg);
    setIsUserLoggedIn(true);

    // [Host App] Save user to database
    await saveUserToDatabase(userWithOrg);
  }, []);

  const logout = useCallback(() => {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(STORAGE_KEY);

    // Remove userId from URL
    const url = new URL(window.location.href);
    url.searchParams.delete('userId');
    window.history.replaceState({}, '', url.toString());

    setUser(undefined);
    setIsUserLoggedIn(false);
  }, []);

  const availableUsers = useMemo(
    () => DEMO_USERS.map(u => ({ ...u, organizationId: ORGANIZATION_ID })),
    []
  );

  const contextValue = useMemo(
    () => ({ user, login, logout, isUserLoggedIn, availableUsers }),
    [user, login, logout, isUserLoggedIn, availableUsers]
  );

  return (
    <AppUserContext.Provider value={contextValue}>
      {children}
    </AppUserContext.Provider>
  );
}

export function useAppUser() {
  const ctx = useContext(AppUserContext);
  if (!ctx) throw new Error("useAppUser must be used within AppUserProvider");
  return ctx;
}

/** Export demo users for external use if needed */
export { DEMO_USERS };
