import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //TODO: read from .env
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "9000",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
