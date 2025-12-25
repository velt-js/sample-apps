import { NextRequest, NextResponse } from 'next/server';
import { deleteReaction } from '../../store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reactionAnnotationId } = body;

    console.log('[Velt Selfhosting] DELETE reaction:', reactionAnnotationId);

    if (!reactionAnnotationId) {
      return NextResponse.json({ success: false, error: 'No reaction annotation ID provided' }, { status: 400 });
    }

    await deleteReaction(reactionAnnotationId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Velt Selfhosting] Error deleting reaction:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 });
  }
}
