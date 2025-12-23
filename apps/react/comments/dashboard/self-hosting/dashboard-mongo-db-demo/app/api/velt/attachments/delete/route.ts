import { NextRequest, NextResponse } from 'next/server';
import { deleteAttachment } from '../../comments/store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { attachmentId } = body;

    console.log('[Velt API] DELETE attachment:', attachmentId);

    if (attachmentId !== undefined) {
      await deleteAttachment(attachmentId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Velt API] Error deleting attachment:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 });
  }
}
