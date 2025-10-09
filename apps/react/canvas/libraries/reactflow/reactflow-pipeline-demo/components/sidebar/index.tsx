"use client";
import React from "react";

export default function Sidebar() {
  return (
    <aside
      style={{
        height: "100%",
        width: 260,
        borderRight: "1px solid #eee",
        padding: 16,
        background: "#fafafa",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Sidebar</h3>
      <p style={{ color: "#666" }}>Add app controls here.</p>
    </aside>
  );
}


