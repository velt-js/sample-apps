import { NextRequest, NextResponse } from 'next/server';
import { saveComments } from '../store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { commentAnnotation, metadata } = body;

    console.log('[Velt Selfhosting] SAVE comments:', { commentAnnotation, metadata });

    if (commentAnnotation) {
      // Extract documentId and organizationId from metadata
      const documentId = metadata?.documentId;
      const organizationId = metadata?.organizationId;
      await saveComments(commentAnnotation, { documentId, organizationId });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Velt Selfhosting] Error saving comments:', error);
    return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 });
  }
}
