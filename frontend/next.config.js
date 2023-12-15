const {
  withHydrationOverlay
} = require('@builder.io/react-hydration-overlay/next')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**'
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com'
      }
    ]
  }
}

if (process.env.NODE_ENV === 'development') {
  module.exports = withHydrationOverlay({})(nextConfig)
} else {
  module.exports = nextConfig
}
