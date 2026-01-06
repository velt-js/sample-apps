/** @type {import('next').NextConfig} */
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
}

module.exports = nextConfig
