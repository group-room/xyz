/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["localhost", "*"],
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/chat",
        destination: "https://xyz-gen.com/",
      },
    ];
  },
};

module.exports = nextConfig;
