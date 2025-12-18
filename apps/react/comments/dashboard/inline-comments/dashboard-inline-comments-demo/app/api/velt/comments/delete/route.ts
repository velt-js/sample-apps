import { NextRequest, NextResponse } from 'next/server';
import { deleteComment } from '../store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { commentAnnotationId } = body;

    console.log('[Velt API] DELETE comment:', commentAnnotationId);

    if (commentAnnotationId) {
      await deleteComment(commentAnnotationId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Velt API] Error deleting comment:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 });
  }
}
