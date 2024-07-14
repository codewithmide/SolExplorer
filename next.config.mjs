/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DEVNET_API_BASE_URL: process.env.DEVNET_API_BASE_URL,
    MAINNET_API_BASE_URL: process.env.MAINNET_API_BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'arweave.net',
      },
      {
        protocol: 'https',
        hostname: 'static.jup.ag',
      },
      {
        protocol: 'https',
        hostname: 'wormhole.com',
      },
    ],
  },
};

export default nextConfig;
