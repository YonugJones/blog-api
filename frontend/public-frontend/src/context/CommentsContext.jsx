import { createContext, useState } from 'react';
import { likeComment as apiLikeComment, unlikeComment as apiUnlikeComment } from '../api/api.js';

// eslint-disable-next-line react-refresh/only-export-components
export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const addComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  }; 

  const likeComment = async (postId, commentId) => {
    try {
      const response = await apiLikeComment(postId, commentId);
      if (response.success) {
        const updatedComment = response.comment
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId ? updatedComment : comment
          )
        );
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const unlikeComment = async (postId, commentId) => {
    try {
      const response = await apiUnlikeComment(postId, commentId);
      if (response.success) {
        const updatedComment = response.comment;
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId ? updatedComment : comment
          )
        );
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error('Error unliking comment:', error);
    }
  };

  return (
    <CommentsContext.Provider value={{ comments, setComments, addComment, likeComment, unlikeComment }}>
      {children}
    </CommentsContext.Provider>
  );
};
