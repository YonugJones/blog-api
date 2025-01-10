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

export const fetchPostsAPI = () =>
  apiClient.get('/posts').then((res) => res.data);
export const fetchPostByIdAPI = (postId) =>
  apiClient.get(`/posts/${postId}`).then((res) => res.data);
export const createPostAPI = (postData) =>
  apiClient.post(`/posts`, postData).then((res) => res.data)
export const updatePostAPI = (postId, postData) =>
  apiClient.put(`/posts/${postId}`, postData).then((res) => res.data);
export const softDeletePostAPI = (postId) =>
  apiClient.delete(`/posts/${postId}`).then((res) => res.data);