'use client';
import { useEffect } from 'react';
import { useSetDocuments, useCurrentUser } from '@veltdev/react';
import { useCurrentDocument } from '@/app/document/useCurrentDocument';
import { useAppUser } from '@/app/userAuth/useAppUser';

export default function VeltInitializeDocument() {
  const { documentId, documentName } = useCurrentDocument();
  const { user } = useAppUser();

  // [Velt] Get document setter hook
  const { setDocuments } = useSetDocuments();

  // [Velt] Wait for Velt user to be authenticated before setting document
  const veltUser = useCurrentUser();

  // [Velt] Set document in Velt. This is the resource where all Velt collaboration data will be scoped.
  useEffect(() => {
    if (!veltUser || !user || !documentId || !documentName) return;
    setDocuments([
      { id: documentId, metadata: { documentName: documentName } },
    ]);
  }, [veltUser, user, setDocuments, documentId, documentName]);

  return null;
}
