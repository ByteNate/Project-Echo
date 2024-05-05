// scripts/seed-data.js
const mongoose = require('mongoose');
const config = require('../config/backend');
const User = require('../backend/src/models/user');
const ClassSchedule = require('../backend/src/models/classSchedule');
const Pairing = require('../backend/src/models/pairing');
const logger = require('../backend/src/utils/logger');

mongoose.set('strictQuery', false);

// Connect to the database
mongoose
  .connect(config.db.url, config.db.options)
  .then(() => {
    logger.info('Connected to the database');
    // Seed initial data
    return seedData();
  })
  .catch((error) => {
    logger.error('Error connecting to the database:', error);
    process.exit(1);
  });

// Function to seed initial data
async function seedData() {
  try {
    // Drop existing collections
    await User.deleteMany({});
    await ClassSchedule.deleteMany({});
    await Pairing.deleteMany({});

    // Seed users
    const users = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password',
        role: 'ADMIN',
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        password: 'password',
        role: 'TA',
      },
      {
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike@example.com',
        password: 'password',
        role: 'STUDENT',
      },
    ];
    const seededUsers = await User.insertMany(users);
    logger.info('Users seeded successfully');

    // Seed class schedules
    const classSchedules = [
      {
        course: 'Math 101',
        startTime: '2023-06-01T09:00:00',
        endTime: '2023-06-01T10:30:00',
        location: 'Room 101',
      },
      {
        course: 'English 201',
        startTime: '2023-06-02T14:00:00',
        endTime: '2023-06-02T15:30:00',
        location: 'Room 202',
      },
    ];
    const seededClassSchedules = await ClassSchedule.insertMany(classSchedules);
    logger.info('Class schedules seeded successfully');

    // Seed pairings
    const pairings = [
      {
        classSchedule: seededClassSchedules[0]._id,
        ta: seededUsers[1]._id,
        student: seededUsers[2]._id,
      },
    ];
    await Pairing.insertMany(pairings);
    logger.info('Pairings seeded successfully');

    logger.info('Data seeding completed successfully');
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
    logger.error('Error seeding data:', error);
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