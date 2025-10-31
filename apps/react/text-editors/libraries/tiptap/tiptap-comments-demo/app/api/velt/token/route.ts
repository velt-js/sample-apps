// [Velt] Server-side API endpoint that generates secure JWT tokens for authenticating users with Velt services
import { NextRequest, NextResponse } from 'next/server';

// [Velt] Replace with your own API key and auth token from https://console.velt.dev
const NEXT_PUBLIC_VELT_API_KEY = "6xTcUFtlYAlCdh11zrKB";
const VELT_AUTH_TOKEN = "bd4d5226050470b6c658054fcdf1092a";

export async function POST(req: NextRequest) {
  try {
    const { userId, organizationId, email, isAdmin } = await req.json();

    if (!userId || !organizationId) {
      return NextResponse.json({ error: 'Missing userId or organizationId' }, { status: 400 });
    }

    if (!VELT_AUTH_TOKEN) { // [Velt] Requires VELT_AUTH_TOKEN secret key from environment variables for secure token generation
      return NextResponse.json({ error: 'Server configuration error: missing VELT_AUTH_TOKEN' }, { status: 500 });
    }

    // [Velt] Construct payload with user identification and properties for token generation
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

    // [Velt] Request JWT token from Velt API using API key and auth token for server-to-server authentication
    const res = await fetch('https://api.velt.dev/v2/auth/token/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-velt-api-key': NEXT_PUBLIC_VELT_API_KEY,
        'x-velt-auth-token': VELT_AUTH_TOKEN
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    const token = json?.result?.data?.token;

    if (!res.ok || !token) {
      return NextResponse.json({ error: json?.error?.message || 'Failed to generate token' }, { status: 500 });
    }

    return NextResponse.json({ token }); // [Velt] Returns generated JWT token to client for secure user authentication
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
