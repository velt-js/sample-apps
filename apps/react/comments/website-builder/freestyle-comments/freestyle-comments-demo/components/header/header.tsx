"use client";

import VeltTools from '../velt/VeltTools'; // [Velt] Component containing presence, notifications, huddle, and sidebar button tools

export default function Header() {
  return (
    <div className="absolute top-2 right-6 flex items-center gap-[6px] z-50">
      <VeltTools />
    </div>
  );
}
