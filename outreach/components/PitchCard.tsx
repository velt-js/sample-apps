"use client";

import { useState } from "react";
import { PITCH_TEMPLATE } from "@/data/outreach";

export default function PitchCard() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(PITCH_TEMPLATE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="border-2 border-rule-strong bg-paper-deep p-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="label-mono">Pitch template — anchor on the React Flow precedent</span>
        <button
          onClick={copy}
          className="border border-rule-strong px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:bg-ink hover:text-paper"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <blockquote className="font-display text-lg leading-relaxed">
        “{PITCH_TEMPLATE}”
      </blockquote>
      <p className="mt-3 text-xs text-ink-soft">
        Fill {"{demo link}"} / {"{docs link}"} from the Demo / Docs columns above — only pitch
        libraries where at least one is YES.
      </p>
    </div>
  );
}
