// scripts/db-migrate.js
const mongoose = require('mongoose');
const config = require('../config/backend');

// Create a logger instance
const logger = require('../backend/src/utils/logger');

// Connect to the database
mongoose
  .connect(config.db.url, config.db.options)
  .then(() => {
    logger.info('Connected to the database');
    // Perform database migration
    return migrateDatabase();
  })
  .catch((error) => {
    logger.error('Error connecting to the database:', error);
    process.exit(1);
  });

// Function to migrate the database schema
async function migrateDatabase() {
  try {
    // Perform database migration steps
    // Example migration steps:
    // - Create new collections
    // - Modify existing collections
    // - Add indexes
    // - Update data

    // Migration step 1: Create indexes for User collection
    await mongoose.connection.collection('users').createIndex({ email: 1 }, { unique: true });
    logger.info('Migration step 1 completed: Created indexes for User collection');

    // Migration step 2: Create indexes for ClassSchedule collection
    await mongoose.connection.collection('classschedules').createIndex({ course: 1, startTime: 1, endTime: 1 });
    logger.info('Migration step 2 completed: Created indexes for ClassSchedule collection');

    // Migration step 3: Create indexes for Pairing collection
    await mongoose.connection.collection('pairings').createIndex({ classSchedule: 1, ta: 1, student: 1 });
    logger.info('Migration step 3 completed: Created indexes for Pairing collection');

    // Migration step 4: Add a new field to User collection
    await mongoose.connection.collection('users').updateMany(
      {},
      {
        $set: {
          resetPasswordToken: null,
          resetPasswordExpires: null,
        },
      }
    );
    logger.info('Migration step 4 completed: Added new fields to User collection');

    logger.info('Database migration completed successfully');
    mongoose
      .disconnect()
      .then(() => {
        logger.info('Disconnected from the database');
        process.exit(0);
      })
      .catch((error) => {
        logger.error('Error disconnecting from the database:', error);
        process.exit(1);
      });
  } catch (error) {
    logger.error('Error migrating the database:', error);
    mongoose
      .disconnect()
      .then(() => {
        logger.info('Disconnected from the database');
        process.exit(1);
      })
      .catch((error) => {
        logger.error('Error disconnecting from the database:', error);
        process.exit(1);
      });
  }
}