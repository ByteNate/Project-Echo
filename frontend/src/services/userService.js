import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:3000/api/users';

const register = async (firstName, lastName, email, password) => {
  await axios.post(`${API_URL}/register`, {
    firstName,
    lastName,
    email,
    password,
  });
};

const updateProfile = async (userData) => {
  const response = await axios.put(`${API_URL}/profile`, userData, {
    headers: authHeader(),
  });
  return response.data;
};

const updateAvailability = async (availability) => {
  const response = await axios.put(`${API_URL}/availability`, availability, {
    headers: authHeader(),
  });
  return response.data;
};

const updatePreferences = async (preferences) => {
  const response = await axios.put(`${API_URL}/preferences`, preferences, {
    headers: authHeader(),
  });
  return response.data;
};

const userService = {
  register,
  updateProfile,
  updateAvailability,
  updatePreferences,
};

export default userService;