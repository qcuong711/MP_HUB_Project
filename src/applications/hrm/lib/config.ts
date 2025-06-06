// Centralized configuration for HRM Application
export const APP_CONFIG = {
  // Application settings
  app: {
    name: 'HRM System',
    version: '1.0.0',
    port: process.env.APP_PORT || '3001',
    url: process.env.APP_URL || `http://localhost:${process.env.APP_PORT || '3001'}`,
  },

  // Identity Server configuration  
  identityServer: {
    authority: process.env.IDENTITY_SERVER_URL || 'http://localhost:5001',
    clientId: process.env.IDENTITY_CLIENT_ID || 'hrm-client',
    clientSecret: process.env.IDENTITY_CLIENT_SECRET || '', // For confidential clients
    scope: process.env.IDENTITY_SCOPE || 'openid profile email hrm',
  },

  // OAuth endpoints
  oauth: {
    authorizeEndpoint: '/connect/authorize',
    tokenEndpoint: '/connect/token', 
    userInfoEndpoint: '/connect/userinfo',
    endSessionEndpoint: '/connect/endsession',
  },

  // Gateway/Shell application
  gateway: {
    url: process.env.GATEWAY_URL || 'http://localhost:3000',
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || [
      'http://localhost:3000',
      'http://app.edu.vn:3000'
    ],
  },

  // API endpoints (for future use)
  api: {
    baseUrl: process.env.API_BASE_URL || 'http://localhost:8000/api',
    timeout: parseInt(process.env.API_TIMEOUT || '30000'),
  },

  // Environment
  env: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

// Helper functions
export const getIdentityServerUrl = (endpoint: string = '') => {
  return `${APP_CONFIG.identityServer.authority}${endpoint}`;
};

export const getAppUrl = (path: string = '') => {
  return `${APP_CONFIG.app.url}${path}`;
};

export const getGatewayUrl = (path: string = '') => {
  return `${APP_CONFIG.gateway.url}${path}`;
};