// backend/config/database.js
const mongoose = require('mongoose');
const config = require('../../config/backend');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.db.url, config.db.options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;