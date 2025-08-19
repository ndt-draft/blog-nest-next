import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "export", // Required for AWS Lambda
  images: {
    unoptimized: true, // Disable Next.js image optimization (use S3 instead)
  },
  assetPrefix: process.env.NEXT_PUBLIC_ASSETS_PREFIX || "", // Use for S3 asset hosting
};

export default nextConfig;
