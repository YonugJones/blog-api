import { createContext, useState } from 'react';
import { likeComment as apiLikeComment } from '../../api/api';

// eslint-disable-next-line react-refresh/only-export-components
export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const addComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  }; 

  const likeComment = async (commentId) => {
    try {
      const updatedComment = await apiLikeComment(commentId);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? updatedComment : comment
        )
      );
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  return (
    <CommentsContext.Provider value={{ comments, setComments, addComment, likeComment }}>
      {children}
    </CommentsContext.Provider>
  );
};
