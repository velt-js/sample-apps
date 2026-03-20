"use client";
import VeltTools from '../velt/VeltTools';

export default function Header() {
  return (
    <div className="absolute top-2 right-[180px] flex items-center gap-[6px] z-50">
      <VeltTools />
    </div>
  );
}
