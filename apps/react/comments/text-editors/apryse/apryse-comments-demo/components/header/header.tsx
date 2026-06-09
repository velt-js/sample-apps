"use client";
import VeltTools from '../velt/VeltTools';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export default function Header() {
  return (
    <header
      className="flex items-center justify-between px-6 py-2 border-b border-solid shrink-0"
      style={{
        backgroundColor: 'var(--app-surface)',
        borderColor: 'var(--app-surface-border)',
      }}
    >
      <span
        className="text-[14px] font-semibold"
        style={{ color: 'var(--app-text-primary)' }}
      >
        Velt Apryse Comments Demo
      </span>
      <div className="flex items-center gap-[6px]">
        <ThemeToggle />
        <VeltTools />
      </div>
    </header>
  );
}
