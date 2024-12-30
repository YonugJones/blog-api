import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: API_BASE
});

export const signup = (userData) => 
  apiClient.post('/auth/signup', userData).then((res) => res.data)
export const login = (credentials) => 
  apiClient.post('/auth/login', credentials).then((res) => res.data)
export const logout = () => {
  localStorage.removeItem('token');
  window.location.reload();
}

export const fetchPosts = () =>
  apiClient.get('/posts').then((res) => res.data)
export const fetchPostById = (postId) =>
  apiClient.get(`/posts/${postId}`).then((res) => res.data)
export const fetchCommentsByPostId = (postId) =>
  apiClient.get(`/posts/${postId}/comments`).then((res) => res.data)