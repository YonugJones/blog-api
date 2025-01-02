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

export const signup = (userData) => 
  apiClient.post('/auth/signup', userData).then((res) => res.data);
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

export const fetchPosts = () =>
  apiClient.get('/posts').then((res) => res.data.posts);
export const fetchPostById = (postId) =>
  apiClient.get(`/posts/${postId}`).then((res) => res.data.post);
export const fetchCommentsByPostId = (postId) =>
  apiClient.get(`/posts/${postId}/comments`).then((res) => res.data.comments);
export const createComment = (postId, commentData) => 
  apiClient.post(`/posts/${postId}/comments`, commentData).then((res) => res.data.comment);
export const likeComment = (postId, commentId) =>
  apiClient.post(`/posts/${postId}/comments/${commentId}/like`).then((res) => res.data.comment);
export const unlikeComment = (postId, commentId) =>
  apiClient.post(`/posts/${postId}/comments/${commentId}/unlike`).then((res) => res.data.comment);
export const editComment = (postId, commentId, commentData) =>
  apiClient.put(`/posts/${postId}/comments/${commentId}`, commentData).then((res) => res.data.comment);
export const softDeleteComment = (postId, commentId) =>
  apiClient.delete(`/posts/${postId}/comments/${commentId}`).then((res) => res.data.comment)