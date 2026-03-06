// [Velt] Replace with your own API key and auth token from https://console.velt.dev
const VELT_API_KEY = '6xTcUFtlYAlCdh11zrKB';
const VELT_AUTH_TOKEN = 'bd4d5226050470b6c658054fcdf1092a';

export async function getVeltAuthToken(user: {
  userId: string;
  organizationId: string;
  email?: string;
  isAdmin?: boolean;
}): Promise<string> {
  const body = {
    data: {
      userId: user.userId,
      userProperties: {
        organizationId: user.organizationId,
        ...(typeof user.isAdmin === 'boolean' ? { isAdmin: user.isAdmin } : {}),
        ...(user.email ? { email: user.email } : {}),
      },
    },
  };

  const res = await fetch('https://api.velt.dev/v2/auth/token/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-velt-api-key': VELT_API_KEY,
      'x-velt-auth-token': VELT_AUTH_TOKEN,
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  const token = json?.result?.data?.token;

  if (!res.ok || !token) {
    throw new Error(json?.error?.message || 'Failed to generate Velt token');
  }

  return token;
}
