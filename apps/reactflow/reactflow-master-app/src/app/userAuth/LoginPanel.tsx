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
      <div className="flex items-center gap-2 border border-[#3a3a3a] rounded-full px-3 py-1 text-sm bg-[#2a2a2a] text-white">
        <span className="w-6 h-6 rounded-full bg-[#3a3a3a] flex items-center justify-center font-semibold text-white">{initials}</span>
        <span className="truncate max-w-[180px]">Welcome, {user.name}</span>
        <button className="border border-[#3a3a3a] rounded px-2 py-1 hover:bg-[#3a3a3a] transition-colors" onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-[#888888]">Login as</span>
      {Object.values(demoUsers).map(u => (
        <button
          key={u.userId}
          className="border border-[#3a3a3a] rounded px-2 py-1 bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] transition-colors"
          onClick={() => login(u)}
        >
          {u.name}
        </button>
      ))}
    </div>
  );
}
