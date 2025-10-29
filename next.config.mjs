import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH === '/' ? '' : (process.env.NEXT_PUBLIC_BASE_PATH || ''),

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-navigation-menu'],
    turbo: {
      resolveAlias: {
        // Reduce module resolution overhead
        '@/*': './src/*',
      },
    },
  },

  // Reduce webpack overhead
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Faster builds in development
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },

  // Ignore eslint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
}
 
export default withPayload(nextConfig)