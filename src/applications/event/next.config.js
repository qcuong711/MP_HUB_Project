// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cấu hình cho Event subdomain deployment
  async headers() {
    return [
      {
        // Cho phép iframe embedding từ shell app và cross-domain
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://app.edu.vn:3000, http://localhost:3000',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, X-Requested-With',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
        ],
      },
    ];
  },

  // Cấu hình custom hostname nếu cần
  async rewrites() {
    return [
      // Có thể thêm API rewrites ở đây
    ];
  },
};

module.exports = nextConfig; 