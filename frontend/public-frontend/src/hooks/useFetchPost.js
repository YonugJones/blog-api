import { useState, useEffect } from 'react';
import { fetchPostById } from '../api/api';
import useErrorHandling from './useErrorHandling';

export default function useFetchPost(postId) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { error, handleError, clearError } = useErrorHandling();

  useEffect(() => {
    const loadPost = async () => {
      try {
        clearError();
        const fetchedPost = await fetchPostById(postId);
        setPost(fetchedPost);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false)
      }
    };
    loadPost();
  }, [postId, clearError, handleError])

  return { post, loading, error }
}