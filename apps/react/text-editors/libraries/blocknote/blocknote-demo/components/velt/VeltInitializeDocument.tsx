'use client';
import { useEffect } from 'react';
import { useSetDocuments } from '@veltdev/react';
import { useCurrentDocument } from '@/app/document/useCurrentDocument';
import { useAppUser } from '@/app/userAuth/useAppUser';

export default function VeltInitializeDocument() {
  const { documentId, documentName } = useCurrentDocument();
  const { user } = useAppUser();

  const { setDocuments } = useSetDocuments();

  // [Velt] Set document in Velt. This is the resource where all Velt collaboration data will be scoped.
  useEffect(() => {
    if (!user || !documentId || !documentName || documentId === 'loading') {
      return;
    }
    console.log('🔵 [Velt] Setting document with ID:', documentId);
    setDocuments([
      { id: documentId, metadata: { documentName: documentName || 'Untitled' } },
    ]);
  }, [user, setDocuments, documentId, documentName]);

  return null;
}
