import { useState, useEffect } from 'react';
import { fetchCommentsByPostId as apiFetchComments } from '../api/api';
import useErrorHandling from './useErrorHandling';

const useComments = (postId) => {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);
  const { error, handleError, clearError } = useErrorHandling();

  useEffect(() => {
    if (!postId) {
      setLoading(false);
      return
    };

    const loadComments = async () => {
      try {
        clearError();
        const fetchedComments = await apiFetchComments(postId);
        setComments(fetchedComments);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [postId, clearError, handleError]);

  return { comments, loading, error };
};

export default useComments;