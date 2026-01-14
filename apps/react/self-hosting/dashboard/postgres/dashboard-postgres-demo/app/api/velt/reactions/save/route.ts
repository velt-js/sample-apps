import { NextRequest, NextResponse } from 'next/server';
import { saveReactions } from '../../store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reactionAnnotation, metadata } = body;

    console.log('[Velt Self-hosting BE API] SAVE reactions:', { reactionAnnotation, metadata });

    if (!reactionAnnotation) {
      return NextResponse.json({ success: false, error: 'No reaction annotation provided' }, { status: 400 });
    }

    const documentId = metadata?.documentId;
    const organizationId = metadata?.organizationId;
    await saveReactions(reactionAnnotation, { documentId, organizationId });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Velt Self-hosting BE API] Error saving reactions:', error);
    return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 });
  }
}
