// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cấu hình CORS cho microfrontend architecture
  async headers() {
    const allowedOrigins = process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://app.edu.vn:3000';
    
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: allowedOrigins,
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

  // Tối ưu hóa production build
  swcMinify: true,
  
  // Cấu hình cho deployment
  trailingSlash: false,
  
  // Environment variables - centralized config
  env: {
    // App configuration
    APP_PORT: process.env.APP_PORT || '3001',
    APP_URL: process.env.APP_URL || `http://localhost:${process.env.APP_PORT || '3001'}`,
    
    // Identity Server configuration
    IDENTITY_SERVER_URL: process.env.IDENTITY_SERVER_URL || 'http://localhost:5001',
    IDENTITY_CLIENT_ID: process.env.IDENTITY_CLIENT_ID || 'hrm-client',
    IDENTITY_CLIENT_SECRET: process.env.IDENTITY_CLIENT_SECRET || '',
    IDENTITY_SCOPE: process.env.IDENTITY_SCOPE || 'openid profile email hrm',
    
    // Gateway configuration
    GATEWAY_URL: process.env.GATEWAY_URL || 'http://localhost:3000',
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://app.edu.vn:3000',
    
    // API configuration
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8000/api',
    API_TIMEOUT: process.env.API_TIMEOUT || '30000',
  },
};

module.exports = nextConfig;