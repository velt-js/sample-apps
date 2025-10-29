"use client";

import { useVeltInitState, useVeltClient } from "@veltdev/react"; // [Velt] Hooks for checking SDK initialization status and accessing the Velt client instance
import VeltTools from '../velt/VeltTools'; // [Velt] Component containing presence, notifications, huddle, and sidebar button tools
import { useEffect } from 'react';

export default function Header() {
  const veltInitialized = useVeltInitState(); // [Velt] Returns true when Velt SDK is fully loaded and ready to use
  const { client } = useVeltClient(); // [Velt] Provides access to Velt client for SDK configuration and API calls

  useEffect(() => {
    if (client) {
      client.setDarkMode(true); // [Velt] Configures Velt UI components to use dark theme styling
    }
  }, [client]);

  return (
    <div className="absolute top-2 right-6 flex items-center gap-[6px] z-50">
      {veltInitialized && <VeltTools />} {/* [Velt] Renders collaboration toolbar once SDK is initialized */}
    </div>
  );
}
