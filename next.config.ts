import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "https://cdnjs.cloudflare.com/ajax/libs/flag-icons/7.2.3/flags/4x3/",
      },
    ],
  },
};

export default nextConfig;
