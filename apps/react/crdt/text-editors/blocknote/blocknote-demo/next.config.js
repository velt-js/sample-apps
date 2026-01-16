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
  transpilePackages: ['@blocknote/core', '@blocknote/react', '@blocknote/mantine', 'y-prosemirror'],
  webpack: (config) => {
    // Ensure y-prosemirror is properly resolved to avoid duplicate instances
    config.resolve.alias = {
      ...config.resolve.alias,
      'y-prosemirror': require.resolve('y-prosemirror'),
    }
    return config
  },
  experimental: {
    turbo: {
      resolveAlias: {
        'y-prosemirror': require.resolve('y-prosemirror'),
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
