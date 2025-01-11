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





/*

## Comments

| Method | Endpoint | Description | Authentication |
| --- | --- | --- | --- |
| GET | /posts/:postId/comments | Fetch all comments from single blog post | Yes |
| POST | /posts/:postId/comments | Create a comment to a blog post | Yes |
| PUT | /posts/:postId/comments/:commentId | Update a comment to a blog post | Yes(author) |
| POST | /posts/:postId/comments/:commentId/like | Likes a comment | Yes |
| POST | /posts/:postId/comments/:commentId/unlike | Unlikes a comment | Yes |
| DELETE | /posts/:postId/comments/:commentId | Soft deletes a comment | Yes(author) |

*/