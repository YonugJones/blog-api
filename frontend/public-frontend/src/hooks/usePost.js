// This hook ensures proper data fetching, error handling, and state management.

import { useState, useEffect } from 'react';
import { fetchPostById as apiFetchPost } from '../api/api';

const usePost = (postId) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) {
      setError('Post ID required');
      setLoading(false);
      return;
    };

    const loadPost = async () => {
      try {
        const response = await apiFetchPost(postId);
        setPost(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [postId])
  
  return { post, loading, error }
}

export default usePost;