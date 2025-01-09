import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: API_BASE
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const login = (credentials) => 
  apiClient.post('/auth/login', credentials).then((res) => {
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('userId', user.id);
    return res.data
  });
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  window.location.reload();
};