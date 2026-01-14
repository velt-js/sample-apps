"use client";

import React from "react";
import { AppUserProvider } from "./AppUserContext";
import { JobsProvider } from "@/app/document/JobsContext";

/**
 * Client component wrapper for AppUserProvider and JobsProvider
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppUserProvider>
      <JobsProvider>
        {children}
      </JobsProvider>
    </AppUserProvider>
  );
}
