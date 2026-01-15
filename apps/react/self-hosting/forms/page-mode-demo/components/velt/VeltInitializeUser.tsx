"use client";

import { useAppUser } from "@/app/userAuth/useAppUser";
import type { VeltAuthProvider } from "@veltdev/types";
import { useMemo, useEffect, useRef } from "react";
import { saveCurrentUserToDB } from "./VeltDataProviders";

// [Velt] Call your backend API to generate a JWT token for the user
async function getVeltJwtFromBackend(user: {
  userId: string;
  organizationId: string;
  email?: string;
}) {
  const resp = await fetch("/api/velt/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: user.userId,
      organizationId: user.organizationId,
      email: user.email,
      isAdmin: false,
    }),
    cache: "no-store",
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(`Token API failed: ${err?.error || resp.statusText}`);
  }
  const { token } = await resp.json();
  if (!token) throw new Error("No token in response");
  return token as string;
}

export function useVeltAuthProvider() {
  // [Velt] Get your app's current authenticated user to authenticate with Velt.
  const { user } = useAppUser();

  // Track if we've saved this user to avoid duplicate saves
  const savedUserRef = useRef<string | null>(null);

  // [Velt] Save user to self-hosted DB when they log in
  useEffect(() => {
    if (user && user.userId && savedUserRef.current !== user.userId) {
      savedUserRef.current = user.userId as string;
      saveCurrentUserToDB({
        userId: user.userId as string,
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl,
        organizationId: user.organizationId as string,
      }).catch((err) => {
        console.warn('[Velt] Failed to save user to DB:', err);
      });
    }
  }, [user]);

  // [Velt] Create auth provider object to pass to VeltProvider
  const authProvider: VeltAuthProvider | undefined = useMemo(() => {
    if (!user) return undefined;
    return {
      user,
      retryConfig: { retryCount: 3, retryDelay: 1000 },
      generateToken: async () => {
        return await getVeltJwtFromBackend({
          userId: user.userId as string,
          organizationId: user.organizationId as string,
          email: user.email,
        });
      },
    };
  }, [user]);

  return { authProvider };
}
