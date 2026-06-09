import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        "paper-deep": "var(--paper-deep)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-faint": "var(--ink-faint)",
        rule: "var(--rule)",
        "rule-strong": "var(--rule-strong)",
        signal: "var(--signal)",
        moss: "var(--moss)",
        cobalt: "var(--cobalt)",
        plum: "var(--plum)",
        brass: "var(--brass)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Helvetica", "sans-serif"],
        mono: ["var(--font-mono)", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
