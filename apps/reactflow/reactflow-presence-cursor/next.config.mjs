const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  transpilePackages: [
    '@veltdev/reactflow-crdt',
    '@veltdev/react'
  ],
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['@veltdev/reactflow-crdt'] = '@veltdev/reactflow-crdt/esm';
    return config;
  },
}

export default nextConfig
