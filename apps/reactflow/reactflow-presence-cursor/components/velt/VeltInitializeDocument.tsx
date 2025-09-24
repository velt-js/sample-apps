// [Velt] Thin adapter that mirrors the hook into Velt SDK state
'use client';
import { useEffect } from 'react';
import { useSetDocuments } from '@veltdev/react';
import { useCurrentDocument } from '@/components/velt/hooks/useCurrentDocument';
import { useAppUser } from '@/app/userAuth/useAppUser';

export default function VeltInitializeDocument() {
  const { documentId, documentName } = useCurrentDocument();
  const { user } = useAppUser();

  const { setDocuments } = useSetDocuments();

  // [Velt] Set documents only when Velt is ready AND a user is logged in
  useEffect(() => {
    if (!user) return;
    setDocuments([
      { id: documentId, metadata: { documentName: documentName || 'Untitled' } },
    ]);
  }, [user, setDocuments, documentId, documentName]);

  return null;
}
