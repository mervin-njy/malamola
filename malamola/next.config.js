/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "imgur.com" },
      { protocol: "https", hostname: "drive.google.com" },
      { hostname: "lh3.googleusercontent.com" },
    ],
  },
};

module.exports = nextConfig;
