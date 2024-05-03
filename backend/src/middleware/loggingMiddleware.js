const winston = require('winston');

// Create a Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Logging middleware for requests
exports.requestLogger = (req, res, next) => {
  logger.info(`Request: ${req.method} ${req.originalUrl}`);
  next();
};

// Logging middleware for responses
exports.responseLogger = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (body) {
    logger.info(`Response: ${req.method} ${req.originalUrl} ${res.statusCode}`);
    originalSend.call(this, body);
  };

  next();
};

// Logging middleware for errors
exports.errorLogger = (err, req, res, next) => {
  logger.error(`Error: ${err.stack}`);
  next(err);
};