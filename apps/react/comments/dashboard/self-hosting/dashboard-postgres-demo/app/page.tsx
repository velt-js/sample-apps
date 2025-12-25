"use client";
// [Velt] Provider + collaboration
import { VeltProvider } from "@veltdev/react";
import { useVeltAuthProvider } from "@/components/velt/VeltInitializeUser";
import { VeltCollaboration } from "@/components/velt/VeltCollaboration";
import DocumentCanvas from '@/components/document/document-canvas'
import { commentDataProvider, userDataProvider, attachmentDataProvider, reactionDataProvider } from "@/components/velt/VeltDataProvider";

// [Velt] Replace with your own API key from https://console.velt.dev
const NEXT_PUBLIC_VELT_API_KEY = "6xTcUFtlYAlCdh11zrKB";

// [Velt] Self-hosting: set to true to enable self-hosted comment storage
const SELF_HOSTING_ENABLED = true;

export default function Home() {
  // [Velt] Auth provider (reads from app/userAuth/useAppUser)
  const { authProvider } = useVeltAuthProvider();

  return (
    // [Velt] Wrap app with VeltProvider
    <VeltProvider
      apiKey={NEXT_PUBLIC_VELT_API_KEY}
      authProvider={authProvider}
      dataProviders={SELF_HOSTING_ENABLED ? {
        comment: commentDataProvider,
        user: userDataProvider,
        attachment: attachmentDataProvider,
        reaction: reactionDataProvider
      } : undefined}
    >
      <VeltCollaboration />
      <DocumentCanvas />
    </VeltProvider>
  );
}