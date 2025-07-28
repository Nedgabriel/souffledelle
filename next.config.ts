// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.cdnlogo.com", // pour Facebook, Instagram, LinkedIn
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com", // si tu veux utiliser icons8 pour un logo spécifique
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
