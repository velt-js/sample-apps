import { NextRequest, NextResponse } from 'next/server';
import { saveAttachment } from '../../comments/store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { attachment, metadata } = body;

    console.log('[Velt API] SAVE attachment:', { attachment, metadata });

    if (attachment) {
      const documentId = metadata?.documentId;
      const organizationId = metadata?.organizationId;
      const result = await saveAttachment(attachment, { documentId, organizationId });
      return NextResponse.json({ result, success: true });
    }

    return NextResponse.json({ success: false, error: 'No attachment provided' }, { status: 400 });
  } catch (error) {
    console.error('[Velt API] Error saving attachment:', error);
    return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 });
  }
}
