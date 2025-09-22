"use client";
import { useEffect, useState } from "react";
import type React from "react";
import { useVeltClient } from "@veltdev/react";
import type { User } from "@veltdev/types";

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

  useEffect(() => {
    try {
      const stored = typeof window !== "undefined" ? window.localStorage.getItem("user") : null;
      if (stored) setUser(JSON.parse(stored));
    } catch {}
  }, []);

  // No longer call client.identify here; the Provider will handle auth using authProvider from useVeltAuthProvider
  useEffect(() => {
    // still keep effect to respond to user changes if needed in future
  }, [client, user]);

  const loginWithUser = (userId: string) => {
    const next = demoUsers[userId];
    if (!next) return;
    setUser(next);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("user", JSON.stringify(next));
        window.dispatchEvent(new Event("velt:user-changed"));
      }
    } catch {}
  };

  const logout = () => {
    setUser(undefined);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("user");
        window.dispatchEvent(new Event("velt:user-changed"));
      }
    } catch {}
    if (client) client.signOutUser();
    if (typeof window !== "undefined") {
      setTimeout(() => window.location.reload(), 1000);
    }
  };

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
  };

  const buttonStyle: React.CSSProperties = {
    padding: "6px 10px",
    borderRadius: 8,
    border: "1px solid #d1d5db",
    background: "#f9fafb",
    cursor: "pointer",
    fontSize: 13,
  };

  const logoutButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: "#fff",
  };

  const avatarStyle: React.CSSProperties = {
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

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {user ? (
        <div style={pillStyle}>
          <span style={avatarStyle} aria-hidden>
            {initials(user.name)}
          </span>
          <span style={{ whiteSpace: "nowrap" }}>Welcome, {user.name}</span>
          <button onClick={logout} style={logoutButtonStyle} aria-label="Logout">
            Logout
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Login as</span>
          {Object.keys(demoUsers).map((id) => (
            <button
              key={id}
              onClick={() => loginWithUser(id)}
              style={buttonStyle}
              aria-label={`Login as ${demoUsers[id].name}`}
            >
              {demoUsers[id].name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
