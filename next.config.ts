import type { NextConfig } from "next";

const nextConfig:NextConfig = {
  turbo: {
    devMiddleware: {
      overlay: false, // Disables the error overlay
    },
  },
};


export default nextConfig;