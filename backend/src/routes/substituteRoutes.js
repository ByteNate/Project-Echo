const express = require('express');
const router = express.Router();
const substituteController = require('../controllers/substituteController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Update TA availability
router.put('/availability', authMiddleware, substituteController.updateAvailability);

// Get available substitutes
router.get('/available', authMiddleware, substituteController.getAvailableSubstitutes);

// Assign a substitute
router.post('/assign', authMiddleware, substituteController.assignSubstitute);

module.exports = router;