import { useState, useEffect } from 'react';
import { fetchPostById } from '../api/api';
import useErrorHandling from './useErrorHandling';

const usePost = (postId) => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const { error, handleError, clearError } = useErrorHandling();

  useEffect(() => {
    const loadPost = async() => {
      try {
        clearError();
        setLoading(true);
        const fetchedPost = await fetchPostById(postId);
        setPost(fetchedPost);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [postId, clearError, handleError])
  
  return { post, loading, error }
}

export default usePost;