/** @type {import('next').NextConfig} */
const nextConfig = {
  turbo: {
    devMiddleware: {
      overlay: false,
    },
  },
  images: {
    domains: ['pgsabofajdqaeyjpqeet.supabase.co'],
  },
};

module.exports = nextConfig; 