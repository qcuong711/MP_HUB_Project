// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cấu hình cho subdomain deployment
  reactStrictMode: true,
  
  // Cho phép loading iframe từ subdomains
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' http://hrm.edu.vn:3001 http://event.edu.vn:3002 http://localhost:3001 http://localhost:3002;",
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*.edu.vn',
          },
          {
            key: 'Access-Control-Allow-Methods', 
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },

  // Cấu hình cho custom server (nếu cần)
  async rewrites() {
    return [
      // API routes có thể được proxy nếu cần
    ];
  },
};

module.exports = nextConfig; 