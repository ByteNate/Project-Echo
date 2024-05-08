const User = require('../models/user');
const userService = require('../services/userService');
const authService = require('../services/authService');

// User registration
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const newUser = await userService.createUser({
      firstName,
      lastName,
      email,
      password,
    });

    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register user. Please try again.' });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.authenticateUser(email, password);
    const token = authService.generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    if (error.message === 'User not found' || error.message === 'Invalid password') {
      res.status(401).json({ error: 'Invalid email or password' });
    } else {
      res.status(500).json({ error: 'Failed to log in. Please try again.' });
    }
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve user profile. Please try again.' });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, profileImage } = req.body;

    const updatedUser = await userService.updateUser(req.user._id, {
      firstName,
      lastName,
      profileImage,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user profile. Please try again.' });
  }
};

// Update user availability
exports.updateUserAvailability = async (req, res) => {
  try {
    const { availability } = req.body;

    const updatedUser = await userService.updateUser(req.user._id, {
      availability,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user availability. Please try again.' });
  }
};

// Update user preferences
exports.updateUserPreferences = async (req, res) => {
  try {
    const { preferences } = req.body;

    const updatedUser = await userService.updateUser(req.user._id, {
      preferences,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user preferences. Please try again.' });
  }
};