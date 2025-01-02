import { useState, useEffect } from 'react';
import { fetchPosts as apiFetchPosts } from '../api/api';
import useErrorHandling from './useErrorHandling';

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { error, handleError, clearError } = useErrorHandling();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        clearError();
        const fetchedPosts = await apiFetchPosts();
        setPosts(fetchedPosts);
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