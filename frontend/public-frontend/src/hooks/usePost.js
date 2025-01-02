import { useState, useEffect } from 'react';
import { fetchPostById as apiFetchPost } from '../api/api';
import useErrorHandling from './useErrorHandling';

const usePost = (postId) => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const { error, handleError, clearError } = useErrorHandling();

  useEffect(() => {
    const loadPost = async() => {
      try {
        clearError();
        const fetchedPost = await apiFetchPost(postId);
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