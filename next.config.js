/** @type {import('next').NextConfig} */
const nextConfig = {
  turbo: {
    devMiddleware: {
      overlay: false,
    },
  },
};

module.exports = nextConfig; 