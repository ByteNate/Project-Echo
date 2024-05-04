module.exports = {
    // Backend server settings
    port: process.env.PORT || 3000,
    apiPrefix: '/api',
  
    // Database settings
    db: {
      url: process.env.MONGODB_URI || 'mongodb://localhost:27017/tapairing',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
  
    // JWT authentication settings
    jwt: {
      secret: process.env.JWT_SECRET || 'your-jwt-secret',
      expiresIn: '1h',
    },
  
    // CORS settings
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  
    // Logging settings
    logging: {
      level: process.env.LOG_LEVEL || 'info',
      format: process.env.LOG_FORMAT || 'combined',
    },
  
    // Email settings
    email: {
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      from: process.env.EMAIL_FROM,
    },
  };