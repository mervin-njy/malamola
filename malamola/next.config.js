/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "drive.google.com" }],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
