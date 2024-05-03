const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require('./config/database');
const { errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
require('dotenv').config();

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/classSchedules', require('./routes/classScheduleRoutes'));
app.use('/api/pairings', require('./routes/pairingRoutes'));
app.use('/api/substitutes', require('./routes/substituteRoutes'));

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});