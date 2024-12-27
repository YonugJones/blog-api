import { useState, useEffect } from 'react';
import PostCard from './PostCard';
import './PostsList.css';

export default function PostsList({ onSelectPost }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Mock API call
    const mockPosts = [
      {
        id: 1,
        title: 'First Post',
        imageUrl: 'https://via.placeholder.com/300',
        excerpt: 'This is the first paragraph of the first post...',
      },
      {
        id: 2,
        title: 'Second Post',
        imageUrl: 'https://via.placeholder.com/300',
        excerpt: 'This is the first paragraph of the second post...',
      },
      {
        id: 3,
        title: 'Third Post',
        imageUrl: 'https://via.placeholder.com/300',
        excerpt: 'This is the first paragraph of the third post...',
      }
    ];
    setPosts(mockPosts);
  }, []);

  return (
    <div className="posts-list">
      {posts.map(post => (
        <PostCard key={post.id} post={post} onClick={onSelectPost} />
      ))}
    </div>
  );
}
