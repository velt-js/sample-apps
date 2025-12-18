import { NextRequest, NextResponse } from 'next/server';
import { saveComments } from '../store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { commentAnnotation } = body;

    console.log('[Velt API] SAVE comments:', commentAnnotation);

    if (commentAnnotation) {
      saveComments(commentAnnotation);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Velt API] Error saving comments:', error);
    return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 });
  }
}
