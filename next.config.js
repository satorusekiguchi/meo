/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // appDir: true, // appDirを削除しました
  },
  images: {
    domains: ["example.com", "meo-sod.vercel.app"],
  },
};

module.exports = nextConfig;
