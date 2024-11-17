import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pic.52112.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "aioseo.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
