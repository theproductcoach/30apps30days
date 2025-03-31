/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.openfoodfacts.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.openfoodfacts.org',
        pathname: '/**',
      }
    ],
  },
};

module.exports = nextConfig; 