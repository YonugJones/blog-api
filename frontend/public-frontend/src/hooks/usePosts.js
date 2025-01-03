// This hook ensures proper data fetching, error handling, and state management of all posts

import { useState, useEffect } from 'react';
import { fetchPosts as apiFetchPosts } from '../api/api';

const usePosts = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await apiFetchPosts();
        setPosts(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, [])

  return { posts, loading, error };
}

export default usePosts;