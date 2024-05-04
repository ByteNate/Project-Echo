import axios from 'axios';
import authHeader from './authHeader';
import { config } from '../config/frontend';

const API_URL = config.apiBaseUrl + '/classSchedules';

const createClassSchedule = async (classScheduleData) => {
  try {
    const response = await axios.post(API_URL, classScheduleData, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Failed to create class schedule. Please try again.');
    }
  }
};

const getAllClassSchedules = async () => {
  try {
    const response = await axios.get(API_URL, { headers: authHeader() });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Failed to retrieve class schedules. Please try again.');
    }
  }
};

const getClassScheduleById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Failed to retrieve class schedule. Please try again.');
    }
  }
};

const updateClassSchedule = async (id, classScheduleData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, classScheduleData, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Failed to update class schedule. Please try again.');
    }
  }
};

const deleteClassSchedule = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Failed to delete class schedule. Please try again.');
    }
  }
};

const classScheduleService = {
  createClassSchedule,
  getAllClassSchedules,
  getClassScheduleById,
  updateClassSchedule,
  deleteClassSchedule,
};

export default classScheduleService;