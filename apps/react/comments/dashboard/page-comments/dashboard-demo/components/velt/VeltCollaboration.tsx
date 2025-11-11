"use client";
import { useVeltClient, VeltComments, VeltCommentsSidebar } from "@veltdev/react";
import VeltInitializeDocument from "./VeltInitializeDocument";
import { VeltCustomization } from "./ui-customization/VeltCustomization";
import { useEffect } from "react";
import { useAppUser } from "@/app/userAuth/AppUserContext";
import { useCommentsSidebar } from "./CommentsSidebarContext";

export function VeltCollaboration() {
  const { isUserLoggedIn } = useAppUser();
  const { isOpen, isFullscreen, closeCommentsSidebar, toggleFullscreen } = useCommentsSidebar();
  // [Velt] Get Velt client instance
  const { client } = useVeltClient();

  // [Velt] Sign out user when user logs out, getting user login state from host app
  useEffect(() => {
    if (isUserLoggedIn === false && client) {
      client.signOutUser();
    }
  }, [isUserLoggedIn, client]);

  const groupConfig = {
    enable: false
  };

  return (
    <>
      <VeltInitializeDocument />
      <VeltComments
        popoverTriangleComponent={false}
        popoverMode={true}
        shadowDom={false}
        textMode={false}
        commentPinHighlighter={false}
        dialogOnHover={false}
        groupMatchedComments={true}
        priority={true}
      />

      {/* Embedded Comments Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-[#1a1a1a] shadow-xl transition-all duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${isFullscreen ? 'w-full' : 'w-[400px]'}`}
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
          <button
            onClick={toggleFullscreen}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
              </svg>
            )}
          </button>
          <h2 className="text-white font-semibold">Comments</h2>
        </div>
        <div className="h-[calc(100%-64px)]">
          <VeltCommentsSidebar embedMode={true} groupConfig={groupConfig} pageMode={true} />
        </div>
      </div>

      <VeltCustomization />
    </>
  );
}
