import { useState, useEffect } from 'react';
import { fetchPosts as apiFetchPosts } from '../api/api';
import useErrorHandling from './useErrorHandling';

const usePosts = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const { error, handleError, clearError } = useErrorHandling();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        clearError();
        setLoading(true);
        const response = await apiFetchPosts();
        setPosts(response.data);
      } catch (error) {
        handleError(error)
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, [clearError, handleError])

  return { posts, loading, error };
}

export default usePosts;