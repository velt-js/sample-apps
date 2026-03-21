"use client";

import { VeltProvider } from "@veltdev/react"; // [Velt] Main provider component that initializes Velt SDK and provides context to all child components
import { useVeltAuthProvider } from "@/components/velt/VeltInitializeUser"; // [Velt] Custom hook that manages user authentication and generates JWT tokens for Velt
import { VeltCollaboration } from "@/components/velt/VeltCollaboration"; // [Velt] Wrapper component containing all Velt collaboration features (comments, presence)
import DocumentCanvas from '@/components/document/document-canvas'
import { ActiveImageProvider } from '@/app/document/useCurrentDocument'

// [Velt] Replace with your own API key from https://console.velt.dev
const NEXT_PUBLIC_VELT_API_KEY = "6xTcUFtlYAlCdh11zrKB";

export default function Home() {
  const { authProvider } = useVeltAuthProvider(); // [Velt] Retrieves auth configuration with user data and token generator for secure authentication

  return (
    <ActiveImageProvider>
      <VeltProvider // [Velt] Wraps entire app to enable Velt collaboration features throughout component tree
        apiKey={NEXT_PUBLIC_VELT_API_KEY} // [Velt] API key authenticates this app with Velt services - replace with your own from https://console.velt.dev
        authProvider={authProvider} // [Velt] Passes authentication provider to securely identify users and manage access
      >
        <VeltCollaboration />

        <DocumentCanvas />
      </VeltProvider>
    </ActiveImageProvider>
  );
}
