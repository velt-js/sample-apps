/** @type {import('next').NextConfig} */
const path = require('path');

// Helper to get package directory from main entry
const getPackageDir = (packageName) => {
  try {
    // Try resolving the main entry and get its directory
    const resolved = require.resolve(packageName);
    // Walk up to find the package root (contains node_modules or is in node_modules)
    let dir = path.dirname(resolved);
    while (dir !== '/' && !dir.endsWith(`node_modules/${packageName}`) && !dir.endsWith(`node_modules\\${packageName}`)) {
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
    return dir;
  } catch {
    return packageName;
  }
};

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
  transpilePackages: ['@veltdev/react', '@veltdev/tiptap-crdt-react', '@veltdev/tiptap-crdt'],
  webpack: (config) => {
    // Resolve packages to single instances to prevent duplicate package issues
    config.resolve.alias = {
      ...config.resolve.alias,
      // Ensure single instances of Yjs packages
      'yjs': getPackageDir('yjs'),
      'y-prosemirror': getPackageDir('y-prosemirror'),
      'lib0': getPackageDir('lib0'),
    };
    return config;
  },
  experimental: {
    turbo: {
      resolveAlias: {
        'yjs': getPackageDir('yjs'),
        'y-prosemirror': getPackageDir('y-prosemirror'),
        'lib0': getPackageDir('lib0'),
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
