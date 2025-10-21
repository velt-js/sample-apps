"use client";

// [Velt] Collaboration tools
import { useVeltInitState, useVeltClient } from "@veltdev/react";
import VeltTools from '../velt/VeltTools';
import { useEffect } from 'react';

export default function Header() {
  const veltInitialized = useVeltInitState();
  const { client } = useVeltClient();

  // [Velt] Enable dark mode
  useEffect(() => {
    if (client) {
      client.setDarkMode(true);
    }
  }, [client]);

  return (
    <div className="absolute top-2 right-6 flex items-center gap-[6px] z-50">
      {veltInitialized && <VeltTools />}
    </div>
  );
}
