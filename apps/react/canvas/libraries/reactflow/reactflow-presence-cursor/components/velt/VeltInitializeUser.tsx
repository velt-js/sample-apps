"use client";

import { useAppUser } from "@/app/userAuth/useAppUser";
import type { VeltAuthProvider } from "@veltdev/types";
import { useMemo } from "react";

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
  const { user } = useAppUser();
  const authProvider: VeltAuthProvider | undefined = useMemo(() => {
    if (!user) return undefined;
    return {
      user,
      options: { replaceContacts: false },
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

  return { authProvider, user };
}
