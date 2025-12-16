import { NextRequest, NextResponse } from 'next/server';

// [Velt] API key and auth token from environment variables
const NEXT_PUBLIC_VELT_API_KEY = process.env.NEXT_PUBLIC_VELT_API_KEY || process.env.VELT_API_KEY;
const VELT_AUTH_TOKEN = process.env.VELT_AUTH_TOKEN;

export async function POST(req: NextRequest) {
  try {
    const { userId, organizationId, email, isAdmin } = await req.json();
    if (!userId || !organizationId) {
      return NextResponse.json({ error: 'Missing userId or organizationId' }, { status: 400 });
    }
    if (!VELT_AUTH_TOKEN) {
      return NextResponse.json({ error: 'Server configuration error: missing VELT_AUTH_TOKEN' }, { status: 500 });
    }
    const body = {
      data: {
        userId,
        userProperties: {
          organizationId,
          ...(typeof isAdmin === 'boolean' ? { isAdmin } : {}),
          ...(email ? { email } : {}),
        },
      },
    };
    const res = await fetch('https://api.velt.dev/v2/auth/token/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-velt-api-key': NEXT_PUBLIC_VELT_API_KEY, 'x-velt-auth-token': VELT_AUTH_TOKEN },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    const token = json?.result?.data?.token;
    if (!res.ok || !token) {
      return NextResponse.json({ error: json?.error?.message || 'Failed to generate token' }, { status: 500 });
    }
    return NextResponse.json({ token });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
