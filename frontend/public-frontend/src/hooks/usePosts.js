import { useState, useEffect } from 'react';
import { fetchPosts } from '../api/api';
import useErrorHandling from './useErrorHandling';

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { error, handleError, clearError } = useErrorHandling();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        clearError();
        setLoading(true);
        const fetchedPosts = await fetchPosts();
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