const winston = require('winston');

// Create a Winston logger for error logging
const errorLogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log' }),
  ],
});

// Error handling middleware
exports.errorHandler = (err, req, res, next) => {
  // Log the error
  errorLogger.error({
    message: err.message,
    stack: err.stack,
    metadata: {
      url: req.url,
      method: req.method,
      body: req.body,
      params: req.params,
      query: req.query,
    },
  });

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((error) => error.message);
    return res.status(400).json({ error: 'Validation error', details: errors });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (err.name === 'NotFoundError') {
    return res.status(404).json({ error: 'Not found' });
  }

  res.status(500).json({ error: 'Internal server error' });
};