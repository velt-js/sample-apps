"use client";
import React, { useEffect } from "react";
import "reactflow/dist/base.css";
import "reactflow/dist/style.css";
import Toolbar from "../components/toolbar/index";
import Sidebar from "../components/sidebar/index";
import { VeltProvider, VeltCursor } from "@veltdev/react";
import { VeltCollaboration } from "../components/velt/VeltCollaboration";
import { useVeltAuthProvider } from "../components/velt/hooks/useVeltAuthProvider";
import ReactFlowComponent from "../components/velt/ReactFlowComponent";

export default function Page() {
  const { authProvider } = useVeltAuthProvider();

  // Host app document bridge: expose a global getter for Velt to read
  useEffect(() => {
    if (typeof window !== "undefined") {
      const anyWindow = window as any;
      anyWindow.__VELT__ = anyWindow.__VELT__ || {};
      if (typeof anyWindow.__VELT__.getDocument !== "function") {
        anyWindow.__VELT__.getDocument = () => ({
          documentId: "general-document-1",
          documentName: "General Document",
          documentType: "flow",
        });
      }
      // Host app user bridge: provide user only after login
      if (typeof anyWindow.__VELT__.getUser !== "function") {
        anyWindow.__VELT__.getUser = () => {
          try {
            const raw = window.localStorage.getItem("user");
            return raw ? JSON.parse(raw) : undefined;
          } catch {}
          return undefined;
        };
      }
    }
  }, []);

  return (
    <VeltProvider
      apiKey={process.env.NEXT_PUBLIC_VELT_API_KEY!}
      authProvider={authProvider}
    >
      <VeltCursor />
      <VeltCollaboration />
      <main className="h-full">
        <div
          style={{
            display: "grid",
            gridTemplateRows: "56px 1fr",
            gridTemplateColumns: "260px 1fr",
            height: "100vh",
            width: "100vw",
          }}
        >
          {/* Toolbar spans the full width on top */}
          <div style={{ gridColumn: "1 / -1" }}>
            <Toolbar />
          </div>

          {/* Sidebar on the left */}
          <div>
            <Sidebar />
          </div>

          {/* Document area */}
          <div>
            <ReactFlowComponent />
          </div>
        </div>
      </main>
    </VeltProvider>
  );
}


