"use client";

import { useVeltInitState } from "@veltdev/react";
import VeltTools from '../velt/VeltTools';

export default function Header() {
  const veltInitialized = useVeltInitState();

  return (
    <div className="absolute top-2 right-6 flex items-center gap-[6px] z-50">
      {veltInitialized && <VeltTools />}
    </div>
  );
}

