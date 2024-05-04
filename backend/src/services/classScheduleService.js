const ClassSchedule = require('../models/classSchedule');

// Create a new class schedule
exports.createClassSchedule = async (classScheduleData) => {
  try {
    const classSchedule = new ClassSchedule(classScheduleData);
    await classSchedule.save();
    return classSchedule;
  } catch (error) {
    throw new Error('Failed to create class schedule');
  }
};

// Get all class schedules
exports.getAllClassSchedules = async () => {
  try {
    const classSchedules = await ClassSchedule.find();
    return classSchedules;
  } catch (error) {
    throw new Error('Failed to retrieve class schedules');
  }
};

// Get a class schedule by ID
exports.getClassScheduleById = async (classScheduleId) => {
  try {
    const classSchedule = await ClassSchedule.findById(classScheduleId);
    if (!classSchedule) {
      throw new Error('Class schedule not found');
    }
    return classSchedule;
  } catch (error) {
    throw new Error('Failed to retrieve class schedule');
  }
};

// Update a class schedule
exports.updateClassSchedule = async (classScheduleId, updatedData) => {
  try {
    const classSchedule = await ClassSchedule.findByIdAndUpdate(
      classScheduleId,
      updatedData,
      { new: true }
    );
    if (!classSchedule) {
      throw new Error('Class schedule not found');
    }
    return classSchedule;
  } catch (error) {
    throw new Error('Failed to update class schedule');
  }
};

// Delete a class schedule
exports.deleteClassSchedule = async (classScheduleId) => {
  try {
    const classSchedule = await ClassSchedule.findByIdAndDelete(classScheduleId);
    if (!classSchedule) {
      throw new Error('Class schedule not found');
    }
    return classSchedule;
  } catch (error) {
    throw new Error('Failed to delete class schedule');
  }
};