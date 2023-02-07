/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  modularizeImports: {
    "@heroicons/react/24/outline": {
      transform: "@heroicons/react/24/outline/{{member}}",
    },
  },
  env: {
    MONGO_URI: process.env.MONGO_URI,
    MONGO_USERNAME: process.env.MONGO_USERNAME,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_DB: process.env.MONGO_DB,
  },
};

module.exports = nextConfig;
