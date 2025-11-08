/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // if the header `x-authorized` is present and
      // contains a matching value, this redirect will be applied
      {
        source: '/',
        has: [
          {
            type: 'header',
            key: 'x-authorized',
            value: 'false',
          },
        ],
        permanent: false,
        destination: '/login',
      }
    ]
  },
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'mosaic.scdn.co',
        port: '',
        pathname: '/*/**',
      },
      {
        protocol: 'https',
        hostname: 'thisis-images.spotifycdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 't.scdn.co'
      },
      {
        protocol: 'https',
        hostname: 'charts-images.scdn.co'
      },
      {
        protocol: 'https',
        hostname: 'dailymix-images.scdn.co'
      },
      {
        protocol: 'https',
        hostname: 'newjams-images.scdn.co'
      },
      {
        protocol: 'https',
        hostname: 'image-cdn-ak.spotifycdn.com'
      },
      {
        protocol: 'https',
        hostname: 'image-cdn-fa.spotifycdn.com'
      },
    ],
  }
}

module.exports = nextConfig
