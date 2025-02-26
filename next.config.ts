import type { NextConfig } from "next";
import withPWA from "next-pwa";

// Define the Next.js configuration
const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

// Initialize the withPWA function and apply it to your nextConfig
const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
});

// Apply the withPWA function to your nextConfig
const finalConfig = pwaConfig(nextConfig);

export default finalConfig; 