/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  output: "standalone", // Required for AWS Lambda
  images: {
    unoptimized: true, // Disable Next.js image optimization (use S3 instead)
    remotePatterns: [
      {
        hostname: isProd
          ? "s3.ap-southeast-1.amazonaws.com/blog.comaytime.store"
          : "localhost:3000",
        pathname: "/**",
      },
    ],
  },
  assetPrefix: process.env.NEXT_PUBLIC_ASSETS_PREFIX || "", // Use for S3 asset hosting
};

export default nextConfig;
