import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "192.168.1.116", "192.168.2.5"],
  images: {
    imageSizes: [32, 48, 64, 96, 128, 132, 148, 170, 192, 224, 256, 320, 384, 404, 448, 512],
    qualities: [58, 60, 75],
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
