import axios from 'axios';
import authHeader from './authHeader';
import { config } from '../config/frontend';

const API_URL = config.apiBaseUrl + '/users';

const register = async (firstName, lastName, email, password) => {
  try {
    await axios.post(`${API_URL}/register`, {
      firstName,
      lastName,
      email,
      password,
    });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Registration failed. Please try again.');
    }
  }
};

const updateProfile = async (userData) => {
  try {
    const response = await axios.put(`${API_URL}/profile`, userData, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Failed to update profile. Please try again.');
    }
  }
};

const updateAvailability = async (availability) => {
  try {
    const response = await axios.put(`${API_URL}/availability`, availability, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Failed to update availability. Please try again.');
    }
  }
};

const updatePreferences = async (preferences) => {
  try {
    const response = await axios.put(`${API_URL}/preferences`, preferences, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Failed to update preferences. Please try again.');
    }
  }
};

const userService = {
  register,
  updateProfile,
  updateAvailability,
  updatePreferences,
};

export default userService;