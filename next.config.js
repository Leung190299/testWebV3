// @ts-check
const { i18n } = require('./next-i18next.config.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  // i18n,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    });
    config.resolve.fallback = { fs: false };

    return config;
  },
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true
  },
  env: {
    API_URL: 'https://itel.dev/api/web/',
    URL: 'https://itel.dev/'

    // API_URL: 'https://itel.vn/api/web/',
    // URL:'https://itel.vn/'
  }

};

module.exports = nextConfig;
