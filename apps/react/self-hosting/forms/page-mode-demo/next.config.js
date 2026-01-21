/** @type {import('next').NextConfig} */

// List of domains allowed to embed this app in an iframe
const allowList = [
  "'self'",
  "http://localhost:*",
  "https://*.vercel.app",
  "https://*.velt.dev",
  "https://*.mintlify.app",
].join(' ');

const EMBED_CSP = `frame-ancestors ${allowList}`;

const nextConfig = {
  serverExternalPackages: ['mongodb'],
  // Disable Turbopack for API routes that use native modules (MongoDB)
  experimental: {
    turbo: {
      resolveAlias: {
        // Force mongodb to be resolved as external
        'mongodb': 'mongodb',
      },
    },
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: EMBED_CSP,
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
