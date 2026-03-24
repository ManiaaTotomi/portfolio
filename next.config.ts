import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    imageSizes: [32, 48, 64, 96, 128, 132, 148, 170, 192, 224, 256, 320, 384, 404, 448, 512],
    qualities: [58, 60, 75],
  },
};

export default nextConfig;
