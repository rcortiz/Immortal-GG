import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdnjs.cloudflare.com",
        pathname: "/ajax/libs/flag-icons/7.2.3/flags/4x3/*",
      },
      {
        protocol: "https",
        hostname: "avatars.steamstatic.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "cdn.dota2.com",
        pathname: "/apps/dota2/images/heroes/**",
      },
    ],
  },
};

export default nextConfig;
