import { NextRequest, NextResponse } from 'next/server';
import { getUsers } from '../../comments/store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userIds } = body;

    console.log('[Velt API] GET users:', { userIds });

    // Fetch users from database
    // In a real app, this would query your user database
    const result = await getUsers(userIds || []);

    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error('[Velt API] Error getting users:', error);
    return NextResponse.json({ result: {}, success: true }, { status: 200 });
  }
}
