import { NextRequest, NextResponse } from 'next/server';
import { getReactions } from '../../store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { organizationId, reactionAnnotationIds, documentIds } = body;

    console.log('[Velt Selfhosting] GET reactions:', { organizationId, reactionAnnotationIds, documentIds });

    const result = await getReactions({
      organizationId,
      reactionAnnotationIds,
      documentIds,
    });

    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error('[Velt Selfhosting] Error getting reactions:', error);
    return NextResponse.json({ result: {}, success: false, error: 'Failed to get reactions' }, { status: 500 });
  }
}
