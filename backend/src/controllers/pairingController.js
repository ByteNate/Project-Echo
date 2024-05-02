const Pairing = require('../models/pairing');
const User = require('../models/user');
const ClassSchedule = require('../models/classSchedule');
const pairingAlgorithm = require('../services/pairingAlgorithm');

// Generate TA-student pairings
exports.generatePairings = async (req, res) => {
  try {
    // Fetch all users (students and TAs)
    const users = await User.find();

    // Fetch all class schedules
    const classSchedules = await ClassSchedule.find();

    // Call the pairing algorithm to generate pairings
    const generatedPairings = await pairingAlgorithm(users, classSchedules);

    // Save the generated pairings to the database
    const savedPairings = await Pairing.insertMany(generatedPairings);

    res.status(200).json(savedPairings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all pairings
exports.getAllPairings = async (req, res) => {
  try {
    const pairings = await Pairing.find();
    res.status(200).json(pairings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a specific pairing by ID
exports.getPairingById = async (req, res) => {
  try {
    const pairing = await Pairing.findById(req.params.id);
    if (!pairing) {
      return res.status(404).json({ error: 'Pairing not found' });
    }
    res.status(200).json(pairing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a pairing
exports.updatePairing = async (req, res) => {
  try {
    const updatedPairing = await Pairing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPairing) {
      return res.status(404).json({ error: 'Pairing not found' });
    }
    res.status(200).json(updatedPairing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a pairing
exports.deletePairing = async (req, res) => {
  try {
    const deletedPairing = await Pairing.findByIdAndDelete(req.params.id);
    if (!deletedPairing) {
      return res.status(404).json({ error: 'Pairing not found' });
    }
    res.status(200).json({ message: 'Pairing deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};