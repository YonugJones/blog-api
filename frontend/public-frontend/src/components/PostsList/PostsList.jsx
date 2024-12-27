import { useState, useEffect } from 'react';
import PostCard from '../PostCard/PostCard';
import './PostsList.css';
import { fetchPosts } from '../api/api';

export default function PostsList({ onSelectPost }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await fetchPosts(); 
        setPosts(posts);
      } catch (error) {
        setError(error.message);
      }
    };
    loadPosts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!posts.length) {
    return <div>Loading posts...</div>;
  }

  return (
    <div className='posts-list'>
      {posts.map(post => (
        <PostCard key={post.id} post={post} onClick={onSelectPost} />
      ))}
    </div>
  );
}