// This hook ensures proper data fetching, error handling, and state management of comments for single post

import { useState, useEffect } from 'react';
import { fetchCommentsByPostId as apiFetchComments } from '../api/api';

const useComments = (postId) => {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!postId) {
      setLoading(false);
      return
    };

    const loadComments = async () => {
      try {
        const fetchedComments = await apiFetchComments(postId);
        setComments(fetchedComments.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load comments');
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [postId]);

  return { comments, loading, error };
};

export default useComments;