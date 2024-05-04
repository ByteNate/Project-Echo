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
    i