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
        hostname: 's3-images-idealcoachingfargate.s3.eu-central-1.amazonaws.com'
      }
    ]
  }
}

// module.exports = withHydrationOverlay()(nextConfig)
module.exports = nextConfig
