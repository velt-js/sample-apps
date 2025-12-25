import { NextRequest, NextResponse } from 'next/server';
import { saveUser } from '../../store';

// [Velt] DEMO ONLY: In your real app, you don't need to save the user to the database. You will already have your own user database. This is just for the demo.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user } = body;

    console.log('[Velt Selfhosting] SAVE user:', { user });

    if (user?.userId) {
      await saveUser(user);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'No user provided' }, { status: 400 });
  } catch (error) {
    console.error('[Velt Selfhosting] Error saving user:', error);
    return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 });
  }
}
