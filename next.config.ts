/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["media.dodostatic.net"],
  },
  transpilePackages: ['bcrypt'],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      tls: false,
      fs: false,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify'),
    };
    // Add this to ignore these modules in the browser
    config.resolve.alias = {
      ...config.resolve.alias,
      'bcrypt': false,
      'https-proxy-agent': false,
      '@mapbox/node-pre-gyp': false,
    };
    return config;
  },
};

module.exports = nextConfig;
