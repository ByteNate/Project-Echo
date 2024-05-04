const mongoose = require('mongoose');
const config = require('../config/backend');
const User = require('../backend/src/models/user');
const ClassSchedule = require('../backend/src/models/classSchedule');
const Pairing = require('../backend/src/models/pairing');

mongoose.set('strictQuery', false);

// Connect to the database
mongoose.connect(config.db.url, config.db.options)
  .then(() => {
    console.log('Connected to the database');
    // Seed initial data
    return seedData();
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  });

// Function to seed initial data
async function seedData() {
  try {
    // Seed users
    const users = [
      { name: 'John Doe', email: 'john@example.com', role: 'admin' },
      { name: 'Jane Smith', email: 'jane@example.com', role: 'TA' },
      { name: 'Mike Johnson', email: 'mike@example.com', role: 'student' },
    ];
    await User.insertMany(users);
    console.log('Users seeded successfully');

    // Seed class schedules
    const classSchedules = [
      { course: 'Math 101', startTime: '2023-06-01T09:00:00', endTime: '2023-06-01T10:30:00', location: 'Room 101' },
      { course: 'English 201', startTime: '2023-06-02T14:00:00', endTime: '2023-06-02T15:30:00', location: 'Room 202' },
    ];
    await ClassSchedule.insertMany(classSchedules);
    console.log('Class schedules seeded successfully');

    // Seed pairings
    const pairings = [
      { classSchedule: classSchedules[0]._id, ta: users[1]._id, student: users[2]._id },
    ];
    await Pairing.insertMany(pairings);
    console.log('Pairings seeded successfully');

    console.log('Data seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}