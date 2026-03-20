"use client";

import React from "react";
import { AppUserProvider } from "./AppUserContext";
import { ThemeProvider } from "@/components/theme/ThemeContext";

/**
 * Client component wrapper for AppUserProvider
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AppUserProvider>
        {children}
      </AppUserProvider>
    </ThemeProvider>
  );
}

