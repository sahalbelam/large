import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        pathname: '/**', // You can be more specific about the path if needed
      },
    ]
  },
};

export default nextConfig;
