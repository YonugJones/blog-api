import { useEffect, useContext } from 'react';
import { fetchCommentsByPostId } from '../api/api';
import useErrorHandling from './useErrorHandling';
import { CommentsContext } from '../context/CommentsContext';

export default function useFetchComments(postId) {
  const { comments, setComments } = useContext(CommentsContext);
  const { error, handleError, clearError } = useErrorHandling();

  useEffect(() => {
    const loadComments = async () => {
      try {
        clearError();
        const fetchedComments = await fetchCommentsByPostId(postId);
        setComments(fetchedComments);
      } catch (error) {
        handleError(error)
      }
    }
    loadComments();
  }, [postId, setComments, clearError, handleError])

  return { comments, error }
}