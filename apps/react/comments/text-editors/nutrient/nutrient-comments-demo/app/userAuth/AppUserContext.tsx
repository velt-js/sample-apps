"use client";

import type { User } from "@veltdev/types"; // [Velt] TypeScript interface for user data structure required by Velt SDK
import React, { useCallback, useContext, useEffect, useState } from "react";

/**
 * ⚠️ IMPORTANT DISCLAIMER FOR DEVELOPERS ⚠️
 *
 * This user authentication logic is ONLY for demo purposes.
 * It generates random users and stores them in localStorage/sessionStorage to simulate
 * a multi-user collaboration environment for demonstration.
 *
 * IN YOUR REAL APPLICATION:
 * - Fetch the currently logged in user from YOUR existing authentication system
 * - Use your own user management (Auth0, Firebase Auth, custom backend, etc.)
 * - Simply pass your authenticated user object to Velt's identify() method
 * - You do NOT need to generate random users or store users in localStorage
 *
 * Example of real-world usage:
 * ```typescript
 * // Get your authenticated user from your auth system
 * const currentUser = await yourAuthSystem.getCurrentUser();
 *
 * // Pass it to Velt via authProvider (see VeltInitializeUser.tsx for full implementation)
 * const authProvider: VeltAuthProvider = { user: currentUser, generateToken: ... };
 * ```
 *
 * The random user generation and storage logic here is purely for demo convenience
 * to simulate multiple users without requiring actual authentication infrastructure.
 * Do not replicate this pattern in your production application.
 */

type AppUserContextValue = {
  user: User | undefined;
  login: (u: User) => void;
  logout: () => void;
  isUserLoggedIn?: boolean;
};

const AppUserContext = React.createContext<AppUserContextValue | undefined>(
  undefined
);

// Simple hash function to convert userId to a consistent number
function hashStringToIndex(str: string, arrayLength: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash) % arrayLength;
}

// Generate a deterministic hash from a string (for userId generation)
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  // Convert to base36 and pad to ensure consistent length
  return Math.abs(hash).toString(36).padStart(8, '0');
}

// Generate a random user with deterministic ID based on name
function generateRandomUser(): User {
  const avatarColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];

  const firstNames = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Avery'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];

  // Randomly select first and last name
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const fullName = `${firstName} ${lastName}`;

  // Generate deterministic userId from the full name
  // This ensures "Alex Smith" always gets the same ID
  const userId = `user-${hashString(fullName)}`;

  // Use deterministic color based on userId for consistent photoUrl
  const colorIndex = hashStringToIndex(userId, avatarColors.length);
  const avatarColor = avatarColors[colorIndex];

  return {
    userId: userId,
    name: fullName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    organizationId: "sample-apps-demo-org",
    photoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=${avatarColor.substring(1)}&color=fff&size=128`,
  };
}

export function AppUserProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    if (typeof window === 'undefined') return; // Guard against SSR

    try {
      // Detect if running in iframe (for master-sample-app dual view)
      const isInIframe = window.self !== window.top;

      // Choose storage based on iframe context:
      // - In iframe: use sessionStorage (each origin/port is isolated automatically)
      // - Not in iframe: use localStorage (same user across tabs)
      const storage = isInIframe ? sessionStorage : localStorage;
      const STORAGE_KEY = 'nutrient-comments-demo-user';

      // Check storage for existing user
      const stored = storage.getItem(STORAGE_KEY);

      let selectedUser: User;
      if (stored) {
        // Use existing user from storage
        selectedUser = JSON.parse(stored);
      } else {
        // Generate NEW random user
        selectedUser = generateRandomUser();
        storage.setItem(STORAGE_KEY, JSON.stringify(selectedUser));
      }

      setUser(selectedUser);
      setIsUserLoggedIn(true);
    } catch {}
  }, []);

  const login = useCallback((next: User) => {
    if (typeof window === 'undefined') return;

    try {
      const isInIframe = window.self !== window.top;
      const storage = isInIframe ? sessionStorage : localStorage;
      const STORAGE_KEY = 'nutrient-comments-demo-user';

      setUser(next);
      setIsUserLoggedIn(true);
      storage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const logout = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      const isInIframe = window.self !== window.top;
      const storage = isInIframe ? sessionStorage : localStorage;
      const STORAGE_KEY = 'nutrient-comments-demo-user';

      setUser(undefined);
      setIsUserLoggedIn(false);
      storage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(
    () => ({ user, login, logout, isUserLoggedIn }),
    [user, login, logout, isUserLoggedIn]
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
