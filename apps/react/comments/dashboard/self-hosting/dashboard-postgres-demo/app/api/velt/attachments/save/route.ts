import { NextRequest, NextResponse } from 'next/server';
import { saveAttachment } from '../../comments/store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { attachment, metadata } = body;

    console.log('[Velt API] SAVE attachment:', { attachment, metadata });

    if (!attachment) {
      return NextResponse.json({ success: false, error: 'No attachment provided' }, { status: 400 });
    }

    if (attachment.attachmentId === undefined || attachment.attachmentId === null) {
      return NextResponse.json({ success: false, error: 'No attachment ID provided' }, { status: 400 });
    }

    const documentId = metadata?.documentId;
    const organizationId = metadata?.organizationId;
    const result = await saveAttachment(attachment, { documentId, organizationId });
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error('[Velt API] Error saving attachment:', error);
    return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 });
  }
}
