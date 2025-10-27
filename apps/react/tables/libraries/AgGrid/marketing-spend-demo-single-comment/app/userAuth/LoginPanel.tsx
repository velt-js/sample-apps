// [Velt] Minimal login UI that drives useAppUser via localStorage
'use client';

import React from "react";
import { demoUsers } from "./users";
import { useAppUser } from "./useAppUser";

export default function LoginPanel() {
  const { user, login, logout } = useAppUser();

  if (user) {
    const initials = (user.name || "")
      .split(" ").map(n => n[0]).filter(Boolean).slice(0,2).join("").toUpperCase();

    return (
      <div className="flex items-center gap-2 border rounded-full px-3 py-1 text-sm bg-white">
        <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-semibold">{initials}</span>
        <span className="truncate max-w-[180px]">Welcome, {user.name}</span>
        <button className="border rounded px-2 py-1" onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-500">Login as</span>
      {Object.values(demoUsers).map(u => (
        <button
          key={u.userId}
          className="border rounded px-2 py-1 bg-white"
          onClick={() => login(u)}
        >
          {u.name}
        </button>
      ))}
    </div>
  );
}
