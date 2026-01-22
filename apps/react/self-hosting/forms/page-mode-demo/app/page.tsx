"use client";
// [Velt] Provider + collaboration
import { VeltProvider } from "@veltdev/react";
import { useVeltAuthProvider } from "@/components/velt/VeltInitializeUser";
import { VeltCollaboration } from "@/components/velt/VeltCollaboration";
import DocumentCanvas from '@/components/document/document-canvas'

// [Velt] Self-hosting data providers for MongoDB persistence
import {
  commentDataProvider,
  userDataProvider,
  attachmentDataProvider,
  reactionDataProvider,
} from "@/components/velt/VeltDataProviders";

// [Velt] Replace with your own API key from https://console.velt.dev
const NEXT_PUBLIC_VELT_API_KEY = process.env.NEXT_PUBLIC_VELT_API_KEY || "6xTcUFtlYAlCdh11zrKB";

export default function Home() {
  // [Velt] Auth provider (reads from app/userAuth/useAppUser)
  const { authProvider } = useVeltAuthProvider();

  return (
    // [Velt] Wrap app with VeltProvider + self-hosting dataProviders
    <VeltProvider
      apiKey={NEXT_PUBLIC_VELT_API_KEY}
      authProvider={authProvider}
      dataProviders={{
        comment: commentDataProvider,
        user: userDataProvider,
        attachment: attachmentDataProvider,
        reaction: reactionDataProvider,
      }}
    >
      <VeltCollaboration />
      <DocumentCanvas />
    </VeltProvider>
  );
}
