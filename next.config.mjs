/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cheery-ermine-238.convex.cloud',
      },
    ],
  },
}

export default nextConfig
