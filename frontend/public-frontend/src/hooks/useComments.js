import { useState, useEffect } from 'react';
import { fetchCommentsByPostId } from '../api/api';
import useErrorHandling from './useErrorHandling';

const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { error, handleError, clearError } = useErrorHandling();

  useEffect(() => {
    if (!postId) return;

    const loadComments = async () => {
      try {
        clearError();
        setLoading(true);
        const fetchedComments = await fetchCommentsByPostId(postId);
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