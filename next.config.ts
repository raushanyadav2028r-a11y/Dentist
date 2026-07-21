import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Serve modern formats. Next automatically falls back to the original
    // format for browsers that don't support them.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
