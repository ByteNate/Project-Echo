export const config = {
  // Base URL for the backend API
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000/api',

  // Frontend app settings
  appName: 'TA Pairing System',
  appLogo: '/path/to/app-logo.png',
  appFavicon: '/path/to/app-favicon.ico',

  // Authentication settings
  authSettings: {
    tokenKey: 'access_token',
    tokenExpiresKey: 'expires_at',
    refreshTokenKey: 'refresh_token',
    userKey: 'user',
  },

  // Route settings
  routeSettings: {
    home: '/',
    login: '/login',
    register: '/register',
    dashboard: '/dashboard',
    profile: '/profile',
    classSchedule: '/class-schedule',
    pairing: '/pairing',
    substitute: '/substitute',
  },

  // Styling and theming
  theme: {
    primaryColor: '#007bff',
    secondaryColor: '#6c757d',
    backgroundColor: '#f8f9fa',
    textColor: '#212529',
    fontFamily: 'Arial, sans-serif',
  },

  // Pagination settings
  paginationSettings: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50],
  },

  // Localization settings
  localizationSettings: {
    defaultLocale: 'en',
    supportedLocales: ['en', 'es', 'fr'],
  },

  // Analytics settings
  analyticsSettings: {
    enabled: process.env.ANALYTICS_ENABLED === 'true',
    trackingId: process.env.ANALYTICS_TRACKING_ID || 'UA-123456789-0',
  },
};