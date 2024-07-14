/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DEVNET_API_BASE_URL: process.env.DEVNET_API_BASE_URL,
    MAINNET_API_BASE_URL: process.env.MAINNET_API_BASE_URL,
  },
};

export default nextConfig;
