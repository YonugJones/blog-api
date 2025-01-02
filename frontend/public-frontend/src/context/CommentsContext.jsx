import { createContext, useContext } from 'react';
import useComments from '../hooks/useComments';
import { likeComment as apiLikeComment, unlikeComment as apiUnlikeComment } from '../api/api';

// Create PostContext
// eslint-disable-next-line react-refresh/only-export-components
export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  // Expose the useComments hook to fetch comments for specific posts
  const fetchComments = useComments;

  // Shared functions for actions on comments
  const likeComment = async (postId, commentId) => {
    const response = await apiLikeComment(postId, commentId);
    return response.comment;
  };

  const unlikeComment = async (postId, commentId) => {
    const response = await apiUnlikeComment(postId, commentId);
    return response.comment;
  };

  return (
    <CommentsContext.Provider value={{ fetchComments, likeComment, unlikeComment }}>
      {children}
    </CommentsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCommentsContext = () => useContext(CommentsContext);
