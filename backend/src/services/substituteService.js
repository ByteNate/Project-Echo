const Substitute = require('../models/substitute');
const User = require('../models/user');
const ClassSchedule = require('../models/classSchedule');
const Pairing = require('../models/pairing');

// Create a new substitute
exports.createSubstitute = async (substituteData) => {
  try {
    const substitute = new Substitute(substituteData);
    await substitute.save();
    return substitute;
  } catch (error) {
    throw new Error('Failed to create substitute');
  }
};

// Get all substitutes
exports.getAllSubstitutes = async () => {
  try {
    const substitutes = await Substitute.find();
    return substitutes;
  } catch (error) {
    throw new Error('Failed to retrieve substitutes');
  }
};

// Get a substitute by ID
exports.getSubstituteById = async (substituteId) => {
  try {
    const substitute = await Substitute.findById(substituteId);
    if (!substitute) {
      throw new Error('Substitute not found');
    }
    return substitute;
  } catch (error) {
    throw new Error('Failed to retrieve substitute');
  }
};

// Update a substitute
exports.updateSubstitute = async (substituteId, updatedData) => {
  try {
    const substitute = await Substitute.findByIdAndUpdate(substituteId, updatedData, {
      new: true,
    });
    if (!substitute) {
      throw new Error('Substitute not found');
    }
    return substitute;
  } catch (error) {
    throw new Error('Failed to update substitute');
  }
};

// Delete a substitute
exports.deleteSubstitute = async (substituteId) => {
  try {
    const substitute = await Substitute.findByIdAndDelete(substituteId);
    if (!substitute) {
      throw new Error('Substitute not found');
    }
    return substitute;
  } catch (error) {
    throw new Error('Failed to delete substitute');
  }
};

// Search for available substitutes
exports.substituteSearch = async (classScheduleId, date) => {
  try {
    // Find the class schedule
    const classSchedule = await ClassSchedule.findById(classScheduleId);
    if (!classSchedule) {
      throw new Error('Class schedule not found');
    }

    // Find the pairing for the given class schedule and date
    const pairing = await Pairing.findOne({
      classSchedule: classScheduleId,
      date: date,
    });

    if (!pairing) {
      throw new Error('Pairing not found');
    }

    // Find available TAs who are not assigned to the pairing
    const availableSubstitutes = await User.find({
      role: 'TA',
      available: true,
      _id: { $ne: pairing.ta },
    });

    return availableSubstitutes;
  } catch (error) {
    throw new Error('Failed to search for substitutes');
  }
};