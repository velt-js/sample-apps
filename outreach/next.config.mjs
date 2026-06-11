import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root: this app lives inside the sample-apps pnpm
  // monorepo, and Turbopack's root inference panics without it.
  turbopack: {
    root: path.join(import.meta.dirname, ".."),
  },
};

export default nextConfig;
