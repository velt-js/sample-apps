/** @type {import('next').NextConfig} */
const path = require('path');

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
}

module.exports = nextConfig
