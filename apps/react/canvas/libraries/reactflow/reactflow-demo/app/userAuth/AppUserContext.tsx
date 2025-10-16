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

export function AppUserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | undefined>(
    undefined
  );

  // Load on mount - check URL param for user, then sessionStorage, then default to Jim
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
        // Otherwise, check sessionStorage
        const raw = window.sessionStorage.getItem(SAMPLE_APP_USER);
        if (raw) {
          selectedUser = JSON.parse(raw);
        } else {
          // Default to Jim Halpert for demo purposes
          selectedUser = demoUsers.jim;
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
