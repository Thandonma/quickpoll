// next.config.js
const withPWA = require("next-pwa")({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
  });
  
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    experimental: {
      appDir: true,
      pageExtensions: ['ts', 'tsx'],
    },
  };
  
  module.exports = withPWA(nextConfig);
  