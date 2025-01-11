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

export const fetchCommentsByPostIdAPI = (postId) => 
  apiClient.get(`/posts/${postId}/comments`).then((res) => res.data);
export const adminSoftDeleteCommentAPI = (postId, commentId) =>
  apiClient.delete(`/posts/admin/${postId}/comments/${commentId}`).then((res) => res.data);