"use client";
import { useEffect, useState } from "react";
import type React from "react";
import { useVeltClient } from "@veltdev/react";
import type { User } from "@veltdev/types";
import { useVeltAuthProvider } from "@/components/velt/hooks/useVeltAuthProvider";
import { useTheme } from "@/lib/theme";

const demoUsers: Record<string, User> = {
  michael: {
    userId: "michael",
    name: "Michael Scott",
    email: "michael.scott@dundermifflin.com",
    organizationId: "demo-org-1",
  },
  jim: {
    userId: "jim",
    name: "Jim Halpert",
    email: "jim.halpert@dundermifflin.com",
    organizationId: "demo-org-1",
  },
  pam: {
    userId: "pam",
    name: "Pam Beesly",
    email: "pam.beesly@dundermifflin.com",
    organizationId: "demo-org-1",
  },
  // Uncomment to add more demo users
  // dwight: {
  //   userId: "dwight",
  //   name: "Dwight Schrute",
  //   email: "dwight.schrute@dundermifflin.com",
  //   organizationId: "demo-org-1",
  // },
};

export function VeltInitializeUser() {
  const { client } = useVeltClient();
  const [user, setUser] = useState<User | undefined>(undefined);

  // Ensure default is logged out on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const anyWindow = window as any;
      anyWindow.__VELT__ = anyWindow.__VELT__ || {};
      anyWindow.__VELT__.getUser = () => undefined;
      // Clear any persisted user to ensure true logged-out default
      try { window.localStorage.removeItem("user"); } catch {}
      window.dispatchEvent(new Event("velt:user-changed"));
    }
  }, []);

  // keep reference to client for sign-out; no auto-identify here
  useEffect(() => {
    // placeholder for future client reactions to user changes
  }, [client, user]);

  // Expose imperative helpers on window for UI to call
  useEffect(() => {
    if (typeof window !== "undefined") {
      const anyWindow = window as any;
      anyWindow.__VELT__ = anyWindow.__VELT__ || {};
      anyWindow.__VELT__.loginAs = (userId: string) => {
        const next = demoUsers[userId];
        if (!next) return;
        setUser(next);
        anyWindow.__VELT__.getUser = () => next;
        try {
          window.localStorage.setItem("user", JSON.stringify(next));
          window.dispatchEvent(new Event("velt:user-changed"));
        } catch {}
      };
      anyWindow.__VELT__.logout = () => {
        setUser(undefined);
        try {
          anyWindow.__VELT__.getUser = () => undefined;
          // Clear any persisted user to avoid auto-login on refresh
          window.localStorage.removeItem("user");
          window.dispatchEvent(new Event("velt:user-changed"));
        } catch {}
        if (client) client.signOutUser();
      };
    }
  }, [client]);

  return null;
}

// UI component to be mounted in Toolbar
export function VeltLoginPill() {
  const { theme } = useTheme();
  const { user: authUser } = useVeltAuthProvider();
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  // Derive UI state from the same source as the Provider (authoritative)
  useEffect(() => {
    setCurrentUser(authUser);
  }, [authUser]);

  const pillStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 10px",
    borderRadius: 9999,
    border: "1px solid #e5e7eb",
    background: "#fff",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    fontSize: 13,
    color: "#111827",
    height: 32,
  };

  const buttonStyle: React.CSSProperties =
    theme === "dark"
      ? {
          padding: "6px 10px",
          borderRadius: 8,
          border: "1px solid #374151",
          background: "#111827",
          color: "#e5e7eb",
          cursor: "pointer",
          fontSize: 13,
          height: 32,
        }
      : {
          padding: "6px 10px",
          borderRadius: 8,
          border: "1px solid #d1d5db",
          background: "#f9fafb",
          color: "#111827",
          cursor: "pointer",
          fontSize: 13,
          height: 32,
        };

  const logoutButtonStyle: React.CSSProperties =
    theme === "dark"
      ? { ...buttonStyle, background: "#111827" }
      : { ...buttonStyle, background: "#fff" };

  const avatarStyle: React.CSSProperties =
    theme === "dark"
      ? {
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#1f2937",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
          color: "#d1d5db",
        }
      : {
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#f3f4f6",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
          color: "#374151",
        };

  const initials = (name?: string) =>
    (name || "")
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const handleLogin = (id: string) => {
    const anyWindow = window as any;
    anyWindow.__VELT__?.loginAs?.(id);
  };
  const handleLogout = () => {
    const anyWindow = window as any;
    anyWindow.__VELT__?.logout?.();
  };

  const containerStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    minWidth: 0,
    maxWidth: "40vw",
    flexShrink: 1,
    height: 32,
  };

  return (
    <div style={containerStyle}>
      {currentUser ? (
        <div style={{ ...pillStyle, width: "100%" }}>
          <span style={avatarStyle} aria-hidden>
            {initials(currentUser.name)}
          </span>
          <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            Welcome, {currentUser.name}
          </span>
          <button onClick={handleLogout} style={logoutButtonStyle} aria-label="Logout">
            Logout
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            width: "100%",
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: "#6b7280", fontSize: 13, flex: "0 0 auto" }}>Login as</span>
          <div style={{ display: "inline-flex", gap: 8, flex: "0 0 auto" }}>
            {Object.keys(demoUsers).map((id) => (
              <button
                key={id}
                onClick={() => handleLogin(id)}
                style={buttonStyle}
                aria-label={`Login as ${demoUsers[id].name}`}
              >
                {demoUsers[id].name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
