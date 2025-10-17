"use client";

import type { User } from "@veltdev/types";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { demoUsers } from "./users";

const SAMPLE_APP_USER = "user"; // [Velt]

type AppUserContextValue = {
  user: User | undefined;
  login: (u: User) => void;
  logout: () => void;
  isUserLoggedIn?: boolean;
};

const AppUserContext = React.createContext<AppUserContextValue | undefined>(
  undefined
);

// Map user query param to demo users (like playground component)
const userMap: Record<string, User> = {
  "1": demoUsers.jim,
  "2": demoUsers.pam,
  "3": demoUsers.michael,
};

// Generate a random user with unique ID
function generateRandomUser(): User {
  const randomId = `user-${Math.random().toString(36).substring(2, 11)}`;
  const avatarColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
  const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];
  
  const firstNames = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Avery'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const fullName = `${firstName} ${lastName}`;
  
  return {
    userId: randomId,
    name: fullName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    organizationId: "demo-org-1",
    photoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=${randomColor.substring(1)}&color=fff&size=128`,
  };
}

export function AppUserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | undefined>(
    undefined
  );

  // Load on mount - check URL param for user, then sessionStorage, then generate random user
  useEffect(() => {
    try {
      // Get user param from URL (e.g., ?user=1, ?user=2, ?user=3)
      const urlParams = new URLSearchParams(window.location.search);
      const userParam = urlParams.get('user');
      
      let selectedUser: User | undefined;
      
      // If URL has user param, use it
      if (userParam && userMap[userParam]) {
        selectedUser = userMap[userParam];
      } else {
        // Otherwise, check sessionStorage for existing session user
        const raw = window.sessionStorage.getItem(SAMPLE_APP_USER);
        if (raw) {
          selectedUser = JSON.parse(raw);
        } else {
          // Generate a new random user for this session
          selectedUser = generateRandomUser();
        }
      }
      
      setUser(selectedUser);
      setIsUserLoggedIn(true);
      window.sessionStorage.setItem(SAMPLE_APP_USER, JSON.stringify(selectedUser));
    } catch {}
  }, []);

  const login = useCallback((next: User) => {
    try {
      setUser(next);
      setIsUserLoggedIn(true);
      window.sessionStorage.setItem(SAMPLE_APP_USER, JSON.stringify(next));
    } catch {}
  }, []);

  const logout = useCallback(() => {
    try {
      setUser(undefined);
      setIsUserLoggedIn(false);
      window.sessionStorage.removeItem(SAMPLE_APP_USER);
    }
     catch {}
  }, []);

  return (
    <AppUserContext.Provider
      value={{ user, login, logout, isUserLoggedIn }}
    >
      {children}
    </AppUserContext.Provider>
  );
}

export function useAppUser() {
  const ctx = useContext(AppUserContext);
  if (!ctx) throw new Error("useAppUser must be used within AppUserProvider");
  return ctx;
}
