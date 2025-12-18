import { NextRequest, NextResponse } from 'next/server';
import { getComments } from '../store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { organizationId, commentAnnotationIds, documentIds } = body;

    console.log('[Velt API] GET comments:', { organizationId, commentAnnotationIds, documentIds });

    const result = getComments({
      organizationId,
      commentAnnotationIds,
      documentIds,
    });

    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error('[Velt API] Error getting comments:', error);
    return NextResponse.json({ result: {}, success: true }, { status: 200 });
  }
}
