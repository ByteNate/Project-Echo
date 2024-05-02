import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:3000/api/classSchedules';

const createClassSchedule = async (classScheduleData) => {
  const response = await axios.post(API_URL, classScheduleData, {
    headers: authHeader(),
  });
  return response.data;
};

const getAllClassSchedules = async () => {
  const response = await axios.get(API_URL, { headers: authHeader() });
  return response.data;
};

const getClassScheduleById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: authHeader(),
  });
  return response.data;
};

const updateClassSchedule = async (id, classScheduleData) => {
  const response = await axios.put(`${API_URL}/${id}`, classScheduleData, {
    headers: authHeader(),
  });
  return response.data;
};

const deleteClassSchedule = async (id) => {
  await axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const classScheduleService = {
  createClassSchedule,
  getAllClassSchedules,
  getClassScheduleById,
  updateClassSchedule,
  deleteClassSchedule,
};

export default classScheduleService;