/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placeimg.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
};


module.exports = nextConfig

// const withNextra = require('nextra')({
//   theme: 'nextra-theme-blog',
//   themeConfig: './theme.config.jsx',
// })

// module.exports = withNextra({nextConfig})