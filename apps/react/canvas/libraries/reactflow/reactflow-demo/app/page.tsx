"use client";
// [Velt] Provider + collaboration
import { VeltProvider } from "@veltdev/react";
import { useVeltAuthProvider } from "@/components/velt/VeltInitializeUser";
import { VeltCollaboration } from "@/components/velt/VeltCollaboration";
import ReactFlowComponent from '@/components/velt/ReactFlowComponent'
import Sidebar from '@/components/sidebar/sidebar'

export default function Home() {
  // [Velt] Auth provider (reads from app/userAuth/useAppUser)
  const { authProvider } = useVeltAuthProvider();

  return (
    // [Velt] Wrap app with VeltProvider
    <VeltProvider
      apiKey={process.env.NEXT_PUBLIC_VELT_API_KEY!}
      authProvider={authProvider}
    >
      {/* [Velt] Collaboration core (includes document init) */}
      <VeltCollaboration />

      {/* --- App UI --- */}
      <main className="relative flex h-screen w-screen">
        <ReactFlowComponent />
        {/* Sidebar overlay positioned at top-left as per Figma design */}
        <div className="absolute left-3 top-3 z-10">
          <Sidebar />
        </div>
      </main>
    </VeltProvider>
  );
}
