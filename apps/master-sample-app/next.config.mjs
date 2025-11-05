/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack(config, { isServer, webpack }) {
    // Add support for importing files with ?raw suffix
    // This intercepts files with ?raw query parameter and treats them as raw text
    config.module.rules.push({
      resourceQuery: /raw/,
      use: 'raw-loader',
    })
    
    return config
  },
}

export default nextConfig
