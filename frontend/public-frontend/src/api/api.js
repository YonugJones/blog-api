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
})

export const signup = (userData) => 
  apiClient.post('/auth/signup', userData).then((res) => res.data)
export const login = (credentials) => 
  apiClient.post('/auth/login', credentials).then((res) => res.data)
export const logout = () => {
  localStorage.removeItem('token');
  window.location.reload();
}

export const fetchPosts = () =>
  apiClient.get('/posts').then((res) => res.data.posts)
export const fetchPostById = (postId) =>
  apiClient.get(`/posts/${postId}`).then((res) => res.data.post)
export const fetchCommentsByPostId = (postId) =>
  apiClient.get(`/posts/${postId}/comments`).then((res) => res.data.comments)