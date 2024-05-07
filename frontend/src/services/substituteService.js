import axios from 'axios';
import authHeader from './authHeader';
import { config } from '../config/frontend';

const API_URL = config.apiBaseUrl + '/substitutes';

const updateAvailability = async (availability) => {
  try {
    const response = await axios.put(`${API_URL}/availability`, { availability }, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error('Failed to update availability:', error);
    throw error;
  }
};

const substituteService = {
  updateAvailability,
};

export default substituteService;