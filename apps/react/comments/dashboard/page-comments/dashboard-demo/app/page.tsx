"use client";
// [Velt] Provider + collaboration
import { VeltProvider, VeltCommentsSidebar } from "@veltdev/react";
import { useVeltAuthProvider } from "@/components/velt/VeltInitializeUser";
import { VeltCollaboration } from "@/components/velt/VeltCollaboration";
import DocumentCanvas from '@/components/document/document-canvas'
import { useState } from "react";

// [Velt] Replace with your own API key from https://console.velt.dev
const NEXT_PUBLIC_VELT_API_KEY = "6xTcUFtlYAlCdh11zrKB";

export default function Home() {
  // [Velt] Auth provider (reads from app/userAuth/useAppUser)
  const { authProvider } = useVeltAuthProvider();

  // Host app manages sidebar state
  const [isOpen, setIsOpen] = useState(false);

  const toggleCommentsSidebar = () => {
    setIsOpen(!isOpen);
  };

  const openCommentsSidebar = () => {
    setIsOpen(true);
  };

  const closeCommentsSidebar = () => {
    setIsOpen(false);
  };

  const groupConfig = {
    enable: false
  };

  return (
    // [Velt] Wrap app with VeltProvider
    <VeltProvider
      apiKey={NEXT_PUBLIC_VELT_API_KEY}
      authProvider={authProvider}
    >
      <VeltCollaboration />
      <DocumentCanvas
        toggleCommentsSidebar={toggleCommentsSidebar}
      />

      {/* Embedded Comments Sidebar - Managed by host app */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-[#1a1a1a] shadow-xl transition-all duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 p-4 border-b border-gray-700">
          <button
            onClick={closeCommentsSidebar}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close comments sidebar"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-white font-semibold">Comments</h2>
        </div>
        <div className="h-[calc(100%-64px)]">
          <VeltCommentsSidebar embedMode={true} groupConfig={groupConfig} pageMode={true} />
        </div>
      </div>
    </VeltProvider>
  );
}
