"use client";
import VeltTools from '../velt/VeltTools';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import SuggestionModeToggle from '../suggestions/SuggestionModeToggle';

export default function Header() {
  return (
    <div className="absolute top-2 right-6 flex items-center gap-[6px] z-50">
      <SuggestionModeToggle />
      <ThemeToggle />
      <VeltTools />
    </div>
  );
}
