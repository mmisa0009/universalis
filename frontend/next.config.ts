import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'universalis-files-934007005909-eu-central-1-an.s3.eu-central-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
