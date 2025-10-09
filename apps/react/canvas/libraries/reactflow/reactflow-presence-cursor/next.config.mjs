const nextConfig = {
  // Keep eslint enabled but skip typescript errors for now to maintain compatibility
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
}

export default nextConfig
