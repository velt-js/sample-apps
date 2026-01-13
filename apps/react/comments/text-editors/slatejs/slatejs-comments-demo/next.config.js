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
  transpilePackages: ['@veltdev/react', '@veltdev/client', '@veltdev/slate-velt-comments'],
  webpack: (config) => {
    // Resolve @veltdev/react for peer dependencies when using npm
    const veltReactPath = path.dirname(require.resolve('@veltdev/react/package.json'));
    config.resolve.alias = {
      ...config.resolve.alias,
      '@veltdev/react': veltReactPath,
    };
    return config;
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
