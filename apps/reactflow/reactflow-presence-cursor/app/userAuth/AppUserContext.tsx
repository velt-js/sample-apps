"use client";

import type { User } from "@veltdev/types";
import React, { useCallback, useContext, useEffect, useState } from "react";

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

export function AppUserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | undefined>(
    undefined
  );

  // load on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SAMPLE_APP_USER);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const login = useCallback((next: User) => {
    try {
      setUser(next);
      setIsUserLoggedIn(true);
      window.localStorage.setItem(SAMPLE_APP_USER, JSON.stringify(next));
    } catch {}
  }, []);

  const logout = useCallback(() => {
    try {
      setUser(undefined);
      setIsUserLoggedIn(false);
      window.localStorage.removeItem(SAMPLE_APP_USER);
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
