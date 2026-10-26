import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);
export const getMe = () => API.get('/auth/me');

// Employees
export const getEmployees = () => API.get('/employees');
export const addEmployee = (data) => API.post('/employees', data);
export const updateEmployee = (id, data) => API.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);

// Attendance
export const checkIn = () => API.post('/attendance/check-in');
export const checkOut = () => API.put('/attendance/check-out');
export const getMyAttendance = () => API.get('/attendance/my');
export const getAllAttendance = () => API.get('/attendance/all');
export const getTodayStatus = () => API.get('/attendance/today');

// Leaves
export const applyLeave = (data) => API.post('/leaves/apply', data);
export const getMyLeaves = () => API.get('/leaves/my');
export const getAllLeaves = () => API.get('/leaves/all');
export const updateLeaveStatus = (id, status) => API.put(`/leaves/${id}/status`, { status });

// Announcements
export const getAnnouncements = () => API.get('/announcements');
export const createAnnouncement = (data) => API.post('/announcements', data);
export const deleteAnnouncement = (id) => API.delete(`/announcements/${id}`);

// Trainings
export const getTrainings = () => API.get('/trainings');
export const createTraining = (data) => API.post('/trainings', data);
export const updateTraining = (id, data) => API.put(`/trainings/${id}`, data);
export const deleteTraining = (id) => API.delete(`/trainings/${id}`);

export default API;
