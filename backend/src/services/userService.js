const User = require('../models/user');

// Create a new user
exports.createUser = async (userData) => {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  };
  
  // Get a user by ID
  exports.getUserById = async (userId) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Failed to retrieve user');
    }
  };
  
  // Update a user
  exports.updateUser = async (userId, updatedData) => {
    try {
      const user = await User.findByIdAndUpdate(userId, updatedData, {
        new: true,
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Failed to update user');
    }
  };
  
  // Delete a user
  exports.deleteUser = async (userId) => {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  };