import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   reactCompiler:true,
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
