"use client";
import { useEffect } from "react";
import { useSetDocuments } from "@veltdev/react";

export function VeltInitializeDocument() {
  const { setDocuments } = useSetDocuments();

  useEffect(() => {
    const anyWindow = typeof window !== "undefined" ? (window as any) : undefined;
    const getUser = anyWindow?.__VELT__?.getUser;
    const getDocument = anyWindow?.__VELT__?.getDocument;

    const init = () => {
      // Initialize a document immediately, even before user login, so DocService has an id.
      const doc = typeof getDocument === "function" ? getDocument() : undefined;
      const documentId = doc?.documentId || "general-document-1";
      const documentName = doc?.documentName || "General Document";
      const documentType = doc?.documentType || "flow";
      setDocuments([{ id: documentId, metadata: { documentName, documentType } }]);
    };

    init();
    // Re-run when user changes in case host app changes document context
    const onUserChanged = () => init();
    if (typeof window !== "undefined") {
      window.addEventListener("velt:user-changed", onUserChanged);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("velt:user-changed", onUserChanged);
      }
    };
  }, [setDocuments]);

    return null;
}
