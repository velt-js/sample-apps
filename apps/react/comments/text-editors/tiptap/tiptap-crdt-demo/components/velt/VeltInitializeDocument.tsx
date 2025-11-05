'use client';
import { useEffect } from 'react';
import { useSetDocuments } from '@veltdev/react';
import { useCurrentDocument } from '@/app/document/useCurrentDocument';
import { useAppUser } from '@/app/userAuth/useAppUser';

export default function VeltInitializeDocument() {
  const { documentId, documentName } = useCurrentDocument();
  const { user } = useAppUser();

  // [Velt] Get document setter hook
  const { setDocuments } = useSetDocuments();

  // [Velt] Set document in Velt. This is the resource where all Velt collaboration data will be scoped.
  useEffect(() => {
    // Don't set document if user is not logged in, or if documentId is still loading
    if (!user || !documentId || documentId === 'loading' || !documentName) return;
    setDocuments([
      { id: documentId, metadata: { documentName: documentName || 'Untitled' } },
    ]);
  }, [user, setDocuments, documentId, documentName]);

  return null;
}
