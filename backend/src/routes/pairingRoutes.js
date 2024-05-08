const express = require('express');
const router = express.Router();
const pairingController = require('../controllers/pairingController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Generate TA-student pairings
router.post('/', authMiddleware, pairingController.generatePairings);

// Get all pairings
router.get('/', authMiddleware, pairingController.getAllPairings);

// Get a specific pairing
router.get('/:id', authMiddleware, pairingController.getPairingById);

// Update a pairing
router.put('/:id', authMiddleware, pairingController.updatePairing);

// Delete a pairing
router.delete('/:id', authMiddleware, pairingController.deletePairing);

module.exports = router;