import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
      }, {
        protocol: "https",
        hostname: "img.neotalks.org",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
