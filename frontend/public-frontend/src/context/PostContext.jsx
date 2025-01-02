import { createContext, useContext } from 'react';
import { useFetchPosts } from '../hooks/useFetchPosts';

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


// OLD
// import { createContext, useState, useEffect, useContext } from 'react';
// import { fetchPosts, fetchPostById } from '../api/api';
// import useErrorHandling from '../hooks/useErrorHandling';

// const PostContext = createContext();

// export const PostProvider = ({ children }) => {
//   const [posts, setPosts] = useState([]);
//   const [post, setPost] = useState(null);
//   const { error, handleError, clearError } = useErrorHandling();

//   useEffect(() => {
//     const loadPosts = async () => {
//       try {
//         clearError();
//         const fetchedPosts = await fetchPosts();
//         setPosts(fetchedPosts);
//       } catch (error) {
//         handleError(error);
//       }
//     };
//     loadPosts();
//   }, [clearError, handleError]);

//   const getPostById = async (postId) => {
//     try {
//       clearError();
//       const fetchedPost = await fetchPostById(postId);
//       setPost(fetchedPost);
//     } catch (error) {
//       handleError(error);
//     }
//   };

//   return (
//     <PostContext.Provider value={{ posts, post, getPostById, error }}>
//       {children}
//     </PostContext.Provider>
//   );
// };

// // eslint-disable-next-line react-refresh/only-export-components
// export const usePost = () => useContext(PostContext);