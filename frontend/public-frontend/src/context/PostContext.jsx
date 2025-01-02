import { createContext, useContext } from 'react';
import useFetchPosts from '../hooks/usePosts';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const postsState = useFetchPosts();

  return (
    <PostContext.Provider value={postsState}>
      {children}
    </PostContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePosts = () => useContext(PostContext);