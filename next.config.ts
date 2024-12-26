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
        protocol: "https",
        hostname: "cdn.stratz.com",
        pathname: "/images/dota2/heroes/**",
      },
      {
        protocol: "https",
        hostname: "cdn.stratz.com",
        pathname: "/images/dota2/items/**",
      },
    ],
  },
};

export default nextConfig;
