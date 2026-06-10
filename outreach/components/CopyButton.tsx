"use client";

import { useState } from "react";

export default function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={copy}
      className="border border-rule-strong px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors hover:bg-ink hover:text-paper"
    >
      {copied ? "Copied" : label}
    </button>
  );
}
