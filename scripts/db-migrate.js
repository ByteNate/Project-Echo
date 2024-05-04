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

    // Migration step 1: Create a new collection
    await mongoose.connection.createCollection('newCollection', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['name', 'age'],
          properties: {
            name: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            age: {
              bsonType: 'int',
              minimum: 0,
              maximum: 120,
              description: 'must be an integer in [ 0, 120 ] and is required',
            },
          },
        },
      },
    });
    logger.info('Migration step 1 completed: Created new collection');

    // Migration step 2: Modify an existing collection
    await mongoose.connection.collection('existingCollection').updateMany(
      {},
      {
        $set: {
          updatedField: true,
        },
      }
    );
    logger.info('Migration step 2 completed: Modified existing collection');

    // Migration step 3: Add an index
    await mongoose.connection
      .collection('existingCollection')
      .createIndex({ name: 1 }, { unique: true });
    logger.info('Migration step 3 completed: Added an index');

    // Migration step 4: Update data
    await mongoose.connection.collection('existingCollection').updateMany(
      { age: { $exists: false } },
      {
        $set: {
          age: 0,
        },
      }
    );
    logger.info('Migration step 4 completed: Updated data');

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