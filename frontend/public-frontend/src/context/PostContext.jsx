import { createContext, useContext } from 'react';
import usePosts from '../hooks/usePosts';
import usePost from '../hooks/usePost';

// Create PostContext
// eslint-disable-next-line react-refresh/only-export-components
export const PostContext = createContext();

// PostProvider integrates hooks for posts and single post
export const PostProvider = ({ children }) => {
  const postsState = usePosts();
  const usePostById = usePost; // Provide hook for fetching individual posts

  return (
    <PostContext.Provider value={{ ...postsState, usePostById }}>
      {children}
    </PostContext.Provider>
  );
};

// Hook for consuming PostContext
// eslint-disable-next-line react-refresh/only-export-components
export const usePostContext = () => useContext(PostContext);
