/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache.js");

const config = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["localhost", "*"],
  },
  reactStrictMode: true,
  // async headers() {
  //   return [
  //     {
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //         { key: "Access-Control-Allow-Origin", value: "*" },
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value:
  //             "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

const nextConfig = withPWA({
  dest: "public",
  // disable: !isProduction,
  // runtimeCaching: [],
  runtimeCaching: runtimeCaching,
})(config);

module.exports = nextConfig;
