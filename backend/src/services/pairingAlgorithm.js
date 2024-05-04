const Pairing = require('../models/pairing');
const User = require('../models/user');
const ClassSchedule = require('../models/classSchedule');

const generatePairings = async () => {
  try {
    // Get all available TAs and students
    const tas = await User.find({ role: 'TA', available: true });
    const students = await User.find({ role: 'student', available: true });

    // Get all class schedules
    const classSchedules = await ClassSchedule.find();

    // Initialize pairings array
    const pairings = [];

    // Iterate over class schedules
    for (const classSchedule of classSchedules) {
      // Filter TAs and students based on class schedule
      const availableTAs = tas.filter(ta =>
        ta.classSchedules.includes(classSchedule._id)
      );
      const availableStudents = students.filter(student =>
        student.classSchedules.includes(classSchedule._id)
      );

      // Sort TAs based on their workload (number of assigned pairings)
      availableTAs.sort((a, b) => a.pairings.length - b.pairings.length);

      // Iterate over available students
      for (const student of availableStudents) {
        // Find the closest available TA to the student
        const closestTA = availableTAs.reduce((closest, ta) => {
          const taDistance = calculateDistance(student.location, ta.location);
          const closestDistance = calculateDistance(student.location, closest.location);
          return taDistance < closestDistance ? ta : closest;
        });

        // Create a new pairing
        pairings.push({
          classSchedule: classSchedule._id,
          ta: closestTA._id,
          student: student._id,
        });

        // Update the workload of the assigned TA
        closestTA.pairings.push(pairings[pairings.length - 1]);
      }
    }

    // Save pairings to the database
    await Pairing.insertMany(pairings);

    return pairings;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to generate pairings');
  }
};

// Helper function to calculate the distance between two locations
const calculateDistance = (location1, location2) => {
  // Implement the distance calculation logic based on the location format
  // For simplicity, let's assume locations are represented as [x, y] coordinates
  const [x1, y1] = location1;
  const [x2, y2] = location2;
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

module.exports = generatePairings;