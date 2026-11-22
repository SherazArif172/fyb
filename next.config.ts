import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a second preview server build into its own folder without clobbering `npm run dev`'s .next
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
