'use client';
import { useEffect } from 'react';
import { useSetDocuments } from '@veltdev/react'; // [Velt]
import { useCurrentDocument } from '@/app/document/useCurrentDocument';
import { useAppUser } from '@/app/userAuth/useAppUser';

export default function VeltInitializeDocument() {
  const { documentId, documentName } = useCurrentDocument();
  const { user } = useAppUser();

  // [Velt] Get document setter hook
  const { setDocuments } = useSetDocuments();

  // [Velt] Set document in Velt. This is the resource where all Velt collaboration data will be scoped.
  useEffect(() => {
    if (!user || !documentId || !documentName) return;
    setDocuments([
      { id: documentId, metadata: { documentName: documentName || 'Untitled' } },
    ]);
  }, [user, setDocuments, documentId, documentName]);

  return null;
}
