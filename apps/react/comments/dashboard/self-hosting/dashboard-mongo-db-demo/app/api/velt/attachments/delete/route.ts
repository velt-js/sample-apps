import { NextRequest, NextResponse } from 'next/server';
import { deleteAttachment } from '../../store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { attachmentId } = body;

    console.log('[Velt Selfhosting] DELETE attachment:', attachmentId);

    if (attachmentId === undefined || attachmentId === null) {
      return NextResponse.json({ success: false, error: 'No attachment ID provided' }, { status: 400 });
    }

    await deleteAttachment(attachmentId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Velt Selfhosting] Error deleting attachment:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 });
  }
}
