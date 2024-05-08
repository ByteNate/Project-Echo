import axios from 'axios';
import authHeader from './authHeader';
import { config } from '../config/frontend';

const API_URL = config.apiBaseUrl + '/pairings';

const getAllPairings = async () => {
  try {
    const response = await axios.get(API_URL, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error('Failed to retrieve pairings:', error);
    throw error;
  }
};

const pairingService = {
  getAllPairings,
};

export default pairingService;