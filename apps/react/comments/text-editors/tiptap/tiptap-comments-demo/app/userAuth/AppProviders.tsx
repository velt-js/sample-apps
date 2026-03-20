"use client";
import React from "react";
import { AppUserProvider } from "./AppUserContext";
import { ThemeProvider } from "@/components/theme/ThemeContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AppUserProvider>
        {children}
      </AppUserProvider>
    </ThemeProvider>
  );
}
