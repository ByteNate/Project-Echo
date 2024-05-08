const Pairing = require('../models/pairing');
const User = require('../models/user');
const ClassSchedule = require('../models/classSchedule');

const generatePairings = async () => {
  try {
    // Get all available TAs and students
    const tas = await User.find({ role: 'TA', 'availability.0': { $exists: true } });
    const students = await User.find({ role: 'STUDENT', 'availability.0': { $exists: true } });

    // Get all class schedules
    const classSchedules = await ClassSchedule.find();

    // Initialize pairings array
    const pairings = [];

    // Iterate over class schedules
    for (const classSchedule of classSchedules) {
      // Filter TAs and students based on class schedule
      const availableTAs = tas.filter(ta =>
        ta.availability.some(avl =>
          avl.day === classSchedule.day &&
          avl.startTime <= classSchedule.startTime &&
          avl.endTime >= classSchedule.endTime
        )
      );
      const availableStudents = students.filter(student =>
        student.availability.some(avl =>
          avl.day === classSchedule.day &&
          avl.startTime <= classSchedule.startTime &&
          avl.endTime >= classSchedule.endTime
        )
      );

      // Sort TAs based on their workload (number of assigned pairings)
      availableTAs.sort((a, b) => a.pairings.length - b.pairings.length);

      // Iterate over available students
      for (const student of availableStudents) {
        // Find the first available TA
        const availableTA = availableTAs.find(ta =>
          ta.availability.some(avl =>
            avl.day === classSchedule.day &&
            avl.startTime <= classSchedule.startTime &&
            avl.endTime >= classSchedule.endTime
          )
        );

        if (availableTA) {
          // Create a new pairing
          const pairing = new Pairing({
            classSchedule: classSchedule._id,
            ta: availableTA._id,
            student: student._id,
          });
          pairings.push(pairing);

          // Update the workload of the assigned TA
          availableTA.pairings.push(pairing._id);
        } else {
          console.warn(`No available TA found for student ${student._id} in class schedule ${classSchedule._id}`);
        }
      }
    }

    // Save pairings to the database
    await Pairing.insertMany(pairings);

    return pairings;
  } catch (error) {
    console.error('Failed to generate pairings:', error);
    throw new Error('Failed to generate pairings');
  }
};

module.exports = generatePairings;