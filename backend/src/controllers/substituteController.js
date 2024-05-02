const User = require('../models/user');
const Pairing = require('../models/pairing');
const substituteSearch = require('../services/substituteSearch');

// Update TA availability
exports.updateAvailability = async (req, res) => {
  try {
    const { userId, availability } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { availability },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get available substitutes
exports.getAvailableSubstitutes = async (req, res) => {
  try {
    const { classScheduleId, date } = req.query;

    const availableSubstitutes = await substituteSearch(classScheduleId, date);

    res.status(200).json(availableSubstitutes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Assign a substitute
exports.assignSubstitute = async (req, res) => {
  try {
    const { pairingId, substituteId } = req.body;

    const updatedPairing = await Pairing.findByIdAndUpdate(
      pairingId,
      { ta: substituteId },
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