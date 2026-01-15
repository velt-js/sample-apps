"use client";

import { VeltProvider } from "@veltdev/react";
import { useVeltAuthProvider } from "@/components/velt/VeltInitializeUser";
import { VeltCollaboration } from "@/components/velt/VeltCollaboration";
import DocumentCanvas from '@/components/document/document-canvas'

// [Velt] Replace with your own API key from https://console.velt.dev
const NEXT_PUBLIC_VELT_API_KEY = "6xTcUFtlYAlCdh11zrKB";

export default function Home() {
  const { authProvider } = useVeltAuthProvider();

  return (
    <VeltProvider
      apiKey={NEXT_PUBLIC_VELT_API_KEY}
      authProvider={authProvider}
    >
      <VeltCollaboration />
      <main className="flex h-screen w-screen overflow-hidden">
        <DocumentCanvas />
      </main>
    </VeltProvider>
  )
}
