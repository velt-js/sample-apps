"use client";
// [Velt] Provider + collaboration
import { VeltProvider } from "@veltdev/react";
import { useVeltAuthProvider } from "@/components/velt/VeltInitializeUser";
import { VeltCollaboration } from "@/components/velt/VeltCollaboration";
import DocumentCanvas from '@/components/document/document-canvas'

export default function Home() {
  // [Velt] Auth provider (reads from app/userAuth/useAppUser)
  const { authProvider } = useVeltAuthProvider();

  return (
    // [Velt] Wrap app with VeltProvider.
    <VeltProvider
      apiKey={process.env.NEXT_PUBLIC_VELT_API_KEY!}
      authProvider={authProvider}
    >
      <VeltCollaboration />
      <DocumentCanvas />
    </VeltProvider>
  );
}
