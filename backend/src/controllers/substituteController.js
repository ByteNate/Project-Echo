const substituteService = require('../services/substituteService');

// Create a new substitute
exports.createSubstitute = async (req, res) => {
  try {
    const substitute = await substituteService.createSubstitute(req.body);
    res.status(201).json(substitute);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create substitute' });
  }
};

// Update TA availability
// ... other code ...

exports.updateAvailability = async (req, res) => {
  try {
    const { userId, availability } = req.body;

    const updatedUser = await substituteService.updateAvailability(userId, availability);

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update availability' });
  }
};


// ... other code ...

// Get available substitutes
exports.getAvailableSubstitutes = async (req, res) => {
  try {
    const { classScheduleId, date } = req.query;

    const availableSubstitutes = await substituteService.getAvailableSubstitutes(classScheduleId, date);

    res.status(200).json(availableSubstitutes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve available substitutes' });
  }
};

// Assign a substitute
exports.assignSubstitute = async (req, res) => {
  try {
    const { pairingId, substituteId } = req.body;

    const updatedPairing = await substituteService.assignSubstitute(pairingId, substituteId);

    if (!updatedPairing) {
      return res.status(404).json({ error: 'Pairing not found' });
    }

    res.status(200).json(updatedPairing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to assign substitute' });
  }
};