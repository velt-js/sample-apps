'use client';
import { useEffect } from 'react';
import { useSetDocuments, useSetLocations, useCurrentUser } from '@veltdev/react';
import { useCurrentDocument, useActiveImage } from '@/app/document/useCurrentDocument';

export default function VeltInitializeDocument() {
  const { documentId, documentName } = useCurrentDocument();
  const { activeImageId } = useActiveImage();

  // [Velt] Get document and location setter hooks
  const { setDocuments } = useSetDocuments();
  const { setLocations } = useSetLocations();

  // [Velt] Wait for Velt user to be authenticated before setting document
  const veltUser = useCurrentUser();

  // [Velt] Set document in Velt. This is the resource where all Velt collaboration data will be scoped.
  useEffect(() => {
    if (veltUser && documentId && documentName && setDocuments) {
      setDocuments([
          { id: documentId, metadata: { documentName: documentName } },
        ]);
      }
  }, [veltUser, setDocuments, documentId, documentName]);

  // [Velt] Set location scoped to the active image so comments are per-image.
  useEffect(() => {
    if (veltUser && documentId && activeImageId && setLocations) {
      setLocations([
        { id: activeImageId, locationName: activeImageId },
      ]);
    }
  }, [veltUser, documentId, activeImageId, setLocations]);

  return null;
}
