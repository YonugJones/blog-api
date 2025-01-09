// This hook ensures proper data fetching, error handling, and state management of comments for single post

import { useState, useEffect } from 'react';
import { fetchCommentsByPostId } from '../api/api';

const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!postId) {
      setLoading(false);
      return
    };

    const loadComments = async () => {
      try {
        const fetchedComments = await fetchCommentsByPostId(postId);
        setComments(fetchedComments.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load comments');
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [postId]);

  const updateComments = (newComments) => {
    setComments(newComments)
  }

  return { comments, loading, error, updateComments };
};

export default useComments;