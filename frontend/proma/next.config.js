/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["promaproject.s3.ap-northeast-2.amazonaws.com"],
  },
};

module.exports = nextConfig;
