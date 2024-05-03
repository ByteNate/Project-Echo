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

      // Perform pairing algorithm
      // TODO: Implement pairing algorithm based on proximity and workload distribution

      // Example pairing logic (replace with actual algorithm)
      for (const student of availableStudents) {
        const ta = availableTAs.shift();
        if (ta) {
          pairings.push({
            classSchedule: classSchedule._id,
            ta: ta._id,
            student: student._id,
          });
        }
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

module.exports = generatePairings;