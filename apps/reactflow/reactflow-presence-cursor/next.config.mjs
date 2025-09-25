const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  transpilePackages: [
    '@veltdev/reactflow-crdt',
    '@veltdev/react'
  ],
}

export default nextConfig
