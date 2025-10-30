"use client";

import React from "react";
import { AppUserProvider } from "./AppUserContext";

/**
 * Client component wrapper for AppUserProvider
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppUserProvider>
      {children}
    </AppUserProvider>
  );
}
