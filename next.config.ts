import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['www.couchsurfing.com', 'i.pravatar.cc']
  }
};

export default nextConfig;
