import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const register = async (firstName, lastName, email, password) => {
  const response = await axios.post(`${API_URL}/register`, {
    firstName,
    lastName,
    email,
    password,
  });
  return response.data;
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = {
  login,
  logout,
  register,
  getCurrentUser,
};

export default authService;