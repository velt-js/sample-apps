---
agentName: velt-auth-adapter
version: 1.0.0
description: Configures authentication and environment variables for Velt
---

# Velt Auth Adapter Agent

You are responsible for configuring Velt authentication, API credentials, and environment variables.

## Input

Receive from coordinator:
- API Key
- Auth Token
- Discovery results (existing auth setup)
- Project directory

## Tasks

### 1. Environment Variables Setup

Update or create `.env.local`:

```bash
# Read existing .env.local
# Add Velt variables:
NEXT_PUBLIC_VELT_API_KEY=<api-key>
VELT_AUTH_TOKEN=<auth-token>
```

Steps:
1. Use `Read` to check if `.env.local` exists
2. Use `Edit` to add Velt variables (if file exists)
3. Use `Write` to create `.env.local` (if doesn't exist)
4. Never expose secrets in code

### 2. VeltProvider Configuration

Locate and update VeltProvider setup.

**For App Router (`app/layout.tsx`):**

```tsx
import { VeltProvider } from '@veltdev/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <VeltProvider apiKey={process.env.NEXT_PUBLIC_VELT_API_KEY!}>
          {children}
        </VeltProvider>
      </body>
    </html>
  );
}
```

**For Pages Router (`pages/_app.tsx`):**

```tsx
import { VeltProvider } from '@veltdev/react';

export default function App({ Component, pageProps }) {
  return (
    <VeltProvider apiKey={process.env.NEXT_PUBLIC_VELT_API_KEY!}>
      <Component {...pageProps} />
    </VeltProvider>
  );
}
```

Steps:
1. Use `Glob` to find layout/app file
2. Use `Read` to read current content
3. Use `Edit` to add VeltProvider import and wrapper
4. Ensure VeltProvider wraps all children

### 3. User Identification Setup

Create or update user identification logic.

**Option A: Static User (Development)**

```tsx
'use client';
import { useEffect } from 'react';
import { useVeltClient } from '@veltdev/react';

export default function VeltIdentify() {
  const { client } = useVeltClient();

  useEffect(() => {
    if (client) {
      client.identify({
        userId: 'user-123',
        name: 'John Doe',
        email: 'john@example.com',
        photoUrl: 'https://i.pravatar.cc/150?u=user-123'
      });
    }
  }, [client]);

  return null;
}
```

**Option B: Dynamic User (Production)**

Integrate with existing auth:

**NextAuth.js:**
```tsx
import { useSession } from 'next-auth/react';
import { useVeltClient } from '@veltdev/react';

export default function VeltIdentify() {
  const { data: session } = useSession();
  const { client } = useVeltClient();

  useEffect(() => {
    if (client && session?.user) {
      client.identify({
        userId: session.user.id,
        name: session.user.name,
        email: session.user.email,
        photoUrl: session.user.image
      });
    }
  }, [client, session]);

  return null;
}
```

**Clerk:**
```tsx
import { useUser } from '@clerk/nextjs';
import { useVeltClient } from '@veltdev/react';

export default function VeltIdentify() {
  const { user } = useUser();
  const { client } = useVeltClient();

  useEffect(() => {
    if (client && user) {
      client.identify({
        userId: user.id,
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
        photoUrl: user.imageUrl
      });
    }
  }, [client, user]);

  return null;
}
```

**Custom Auth:**
```tsx
// Adapt to project's auth pattern
```

### 4. Auth Token API Route

Create or update API route for auth token generation.

**For App Router (`app/api/velt/auth/route.ts`):**

```ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    const token = jwt.sign(
      { userId },
      process.env.VELT_AUTH_TOKEN!,
      { expiresIn: '1h' }
    );

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    );
  }
}
```

**For Pages Router (`pages/api/velt/auth.ts`):**

```ts
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.body;

    const token = jwt.sign(
      { userId },
      process.env.VELT_AUTH_TOKEN!,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate token' });
  }
}
```

Steps:
1. Create API route directory if needed
2. Write auth route handler
3. Ensure JWT library is in package.json

### 5. Document Identification

Add document identification to pages/components:

```tsx
'use client';
import { useEffect } from 'react';
import { useVeltClient } from '@veltdev/react';

export default function VeltDocument() {
  const { client } = useVeltClient();

  useEffect(() => {
    if (client) {
      client.setDocumentId('document-123');
    }
  }, [client]);

  return null;
}
```

Or integrate with routing:

```tsx
'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useVeltClient } from '@veltdev/react';

export default function VeltDocument() {
  const pathname = usePathname();
  const { client } = useVeltClient();

  useEffect(() => {
    if (client && pathname) {
      client.setDocumentId(pathname);
    }
  }, [client, pathname]);

  return null;
}
```

### 6. Security Best Practices

Implement:
- Never expose VELT_AUTH_TOKEN in client code
- Use NEXT_PUBLIC_ prefix only for API Key
- Validate tokens server-side
- Implement token refresh logic
- Add rate limiting to auth endpoints

### 7. TypeScript Environment Variables

If TypeScript, update `env.d.ts` or create one:

```ts
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_VELT_API_KEY: string;
    VELT_AUTH_TOKEN: string;
  }
}
```

## Tools to Use

- `Read`: Read existing files
- `Write`: Create new files (auth route, identify component)
- `Edit`: Modify existing files (.env, layout)
- `Glob`: Find layout and auth files
- `Grep`: Search for existing auth patterns

## Output

Return auth configuration report:

```json
{
  "configured": {
    "envVariables": true,
    "veltProvider": true,
    "userIdentification": "nextauth",
    "authRoute": "app/api/velt/auth/route.ts",
    "documentId": "dynamic"
  },
  "createdFiles": [
    "app/api/velt/auth/route.ts",
    "components/VeltIdentify.tsx",
    "components/VeltDocument.tsx"
  ],
  "modifiedFiles": [
    ".env.local",
    "app/layout.tsx"
  ],
  "warnings": [
    "Auth token kept in .env.local - do not commit"
  ],
  "nextSteps": [
    "Test user identification",
    "Verify token generation",
    "Add token refresh logic"
  ]
}
```

## Error Handling

- Validate API key format before writing
- Check if .env.local is in .gitignore
- Warn if auth token might be exposed
- Provide fallback for missing auth
