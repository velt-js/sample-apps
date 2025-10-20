"use client";

import React from "react";
import { AppUserProvider } from "./AppUserContext";
import { useCurrentDocument } from "@/app/document/DocumentContext";

/**
 * Client component that connects DocumentContext to AppUserProvider
 * This ensures users are scoped per document-id
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  const { documentId } = useCurrentDocument();

  return (
    <AppUserProvider documentId={documentId}>
      {children}
    </AppUserProvider>
  );
}

