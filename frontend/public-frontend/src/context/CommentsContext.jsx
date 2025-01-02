import { createContext, useState } from 'react';
import { likeComment as apiLikeComment, unlikeComment as apiUnlikeComment } from '../api/api.js';
import useErrorHandling from '../hooks/useErrorHandling';

// eslint-disable-next-line react-refresh/only-export-components
export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const { error, handleError, clearError } = useErrorHandling();

  const addComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const likeComment = async (postId, commentId) => {
    try {
      clearError();
      const response = await apiLikeComment(postId, commentId);
      if (response.success) {
        const updatedComment = response.comment;
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId ? updatedComment : comment
          )
        );
      } else {
        handleError({ response });
      }
    } catch (error) {
      handleError(error);
    }
  };

  const unlikeComment = async (postId, commentId) => {
    try {
      clearError();
      const response = await apiUnlikeComment(postId, commentId);
      if (response.success) {
        const updatedComment = response.comment;
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId ? updatedComment : comment
          )
        );
      } else {
        handleError({ response });
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <CommentsContext.Provider value={{ comments, setComments, addComment, likeComment, unlikeComment, error }}>
      {children}
    </CommentsContext.Provider>
  );
};