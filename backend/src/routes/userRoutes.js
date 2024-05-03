const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validateBody } = require('../utils/validation');
const { userRegistrationSchema, userLoginSchema } = require('../utils/validation');

// User registration
router.post('/register', validateBody(userRegistrationSchema), userController.registerUser);

// User login
router.post('/login', validateBody(userLoginSchema), userController.loginUser);

// Get user profile
router.get('/profile', authMiddleware, userController.getUserProfile);

// Update user profile
router.put('/profile', authMiddleware, userController.updateUserProfile);

// Update user availability
router.put('/availability', authMiddleware, userController.updateUserAvailability);

// Update user preferences
router.put('/preferences', authMiddleware, userController.updateUserPreferences);

module.exports = router;