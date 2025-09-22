"use client";
import type { User, VeltAuthProvider } from "@veltdev/types";
import { useEffect, useState } from "react";

// Token implementation and auth provider stay here.
// User retrieval is delegated to the host app via window.__VELT__.getUser().
export function useVeltAuthProvider() {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const readUser = () => {
      const anyWindow = typeof window !== "undefined" ? (window as any) : undefined;
      const getUser = anyWindow?.__VELT__?.getUser;
      const nextUser: User | undefined = typeof getUser === "function" ? getUser() : undefined;
      setUser(nextUser);
    };

    readUser();
    const onChange = () => readUser();
    if (typeof window !== "undefined") {
      window.addEventListener("velt:user-changed", onChange);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("velt:user-changed", onChange);
      }
    };
  }, []);

  const generateToken = async () => {
    return process.env.NEXT_PUBLIC_VELT_STATIC_TOKEN || "";
  };

  const authProvider: VeltAuthProvider | undefined = user
    ? {
        user,
        options: { replaceContacts: false },
        retryConfig: { retryCount: 3, retryDelay: 1000 },
        generateToken,
      }
    : undefined;

  return { authProvider, user };
}

// Note: The host app should define window.__VELT__.getUser().