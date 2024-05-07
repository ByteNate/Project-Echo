const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const { errorHandler } = require('./middleware/errorMiddleware');
const { requestLogger, responseLogger, errorLogger } = require('./middleware/loggingMiddleware');
const config = require('../../config/backend');

// Load environment variables
require('dotenv').config();

// Create Express app
const app = express();

// Set strictQuery to false
mongoose.set('strictQuery', false);

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

// Logging middleware
app.use(requestLogger);
app.use(responseLogger);

// Ignore favicon request
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/classSchedules', require('./routes/classScheduleRoutes'));
app.use('/api/pairings', require('./routes/pairingRoutes'));
app.use('/api/substitutes', require('./routes/substituteRoutes'));

// Serve frontend files
app.use(express.static(path.join(__dirname, '../../frontend/build')));

// Catch-all route to serve frontend for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});

// Error logging middleware
app.use(errorLogger);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});