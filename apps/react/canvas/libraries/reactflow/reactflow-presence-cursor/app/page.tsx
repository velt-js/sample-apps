"use client";
// [Velt] Provider + login + collaboration
import { VeltProvider, VeltCursor } from "@veltdev/react"; // [Velt]
import { useVeltAuthProvider } from "@/components/velt/VeltInitializeUser"; // [Velt]
import { VeltCollaboration } from "@/components/velt/VeltCollaboration"; // [Velt]
import LoginPanel from "@/app/userAuth/LoginPanel"; // [Velt]

import { Toolbar } from "@/components/toolbar/Toolbar";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { DocumentCanvas } from "@/components/document/DocumentCanvas";

export default function Home() {
  // [Velt] Auth provider (reads from app/userAuth/useAppUser)
  const { authProvider } = useVeltAuthProvider(); // [Velt]

  return (
    // [Velt] Wrap app with VeltProvider
    <VeltProvider
      // Will switch to API method once implementation is complete
      apiKey={process.env.NEXT_PUBLIC_VELT_API_KEY!}
      authProvider={authProvider}
    >
      {/* [Velt] Demo login */}
      <div className="p-4 flex justify-end">
        <LoginPanel />
      </div>

      {/* [Velt] Collaboration core (includes document init) */}
      <VeltCollaboration />

      {/* --- App UI --- */}
      <div className="h-screen grid grid-rows-[auto_1fr] grid-cols-[auto_1fr] min-h-0">
        <div className="col-span-2">
          <Toolbar />
        </div>
        <Sidebar />
        <main className="relative overflow-hidden min-h-0 h-full">
          <DocumentCanvas />
        </main>
      </div>
    </VeltProvider>
  );
}
