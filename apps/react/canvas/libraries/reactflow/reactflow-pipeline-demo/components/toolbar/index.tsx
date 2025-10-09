"use client";
import React from "react";
import { Presence } from "../velt/VeltTools";

export default function Toolbar() {
  return (
    <header
      style={{
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        borderBottom: "1px solid #eee",
        background: "#f6f6f6",
      }}
    >
      <strong>Toolbar</strong>
      <Presence />
    </header>
  );
}


