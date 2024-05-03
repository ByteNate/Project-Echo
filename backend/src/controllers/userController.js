const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const authService = require('../services/authService');

// User login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.authenticateUser(email, password);
    const token = authService.generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// User registration
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, profileImage } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, profileImage },
      { new: true }
    ).select('-password');

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user availability
exports.updateUserAvailability = async (req, res) => {
  try {
    const { availability } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { availability },
      { new: true }
    ).select('-password');

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user preferences
exports.updateUserPreferences = async (req, res) => {
  try {
    const { preferences } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { preferences },
      { new: true }
    ).select('-password');

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};