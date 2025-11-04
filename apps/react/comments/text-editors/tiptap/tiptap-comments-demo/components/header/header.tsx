"use client";

import { useVeltInitState } from "@veltdev/react"; // [Velt] Hooks for checking SDK initialization status and accessing the Velt client instance
import VeltTools from '../velt/VeltTools'; // [Velt] Component containing presence, notifications, huddle, and sidebar button tools

export default function Header() {
  const veltInitialized = useVeltInitState(); // [Velt] Returns true when Velt SDK is fully loaded and ready to use

  return (
    <div className="absolute top-2 right-6 flex items-center gap-[6px] z-50">
      {/* [Velt] Renders collaboration toolbar once SDK is initialized */}
      {veltInitialized && <VeltTools />}
    </div>
  );
}
