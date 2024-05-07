const Pairing = require('../models/pairing');
const pairingAlgorithm = require('../services/pairingAlgorithm');

// Generate TA-student pairings
exports.generatePairings = async (req, res) => {
  try {
    const generatedPairings = await pairingAlgorithm();
    res.status(200).json(generatedPairings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate pairings' });
  }
};

// Get all pairings
exports.getAllPairings = async (req, res) => {
  try {
    const pairings = await Pairing.find().populate('student').populate('ta').populate('classSchedule');
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
    res.status(500).json({ error: 'Failed to update pairing' });
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
    res.status(500).json({ error: 'Failed to delete pairing' });
  }
};