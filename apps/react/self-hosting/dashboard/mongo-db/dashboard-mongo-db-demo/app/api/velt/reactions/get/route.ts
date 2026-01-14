import { NextRequest, NextResponse } from 'next/server';
import { getReactions } from '../../store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { organizationId, reactionAnnotationIds, documentIds } = body;

    console.log('[Velt Self-hosting BE API] GET reactions:', { organizationId, reactionAnnotationIds, documentIds });

    const result = await getReactions({
      organizationId,
      reactionAnnotationIds,
      documentIds,
    });

    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error('[Velt Self-hosting BE API] Error getting reactions:', error);
    return NextResponse.json({ result: {}, success: false, error: 'Failed to get reactions' }, { status: 500 });
  }
}
