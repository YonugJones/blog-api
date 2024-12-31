import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const addComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  }; 

  return (
    <CommentsContext.Provider value={{ comments, setComments, addComment }}>
      {children}
    </CommentsContext.Provider>
  );
};
