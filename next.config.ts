import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  experimental: { globalNotFound: true },
  agentRules: false,
  images: { qualities: [75, 95] },
};
export default nextConfig;
