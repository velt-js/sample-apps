/** @type {import('next').NextConfig} */

const path = require('path');

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
  // Strict mode off avoids Chart.js double-initialization in dev
  reactStrictMode: false,
  // Pin the Turbopack root to the monorepo root; auto-inference fails at this
  // workspace depth and crashes the dev server
  turbopack: {
    root: path.join(__dirname, '..', '..', '..', '..', '..', '..'),
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
