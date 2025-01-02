import { usePostContext } from '../../context/PostContext';
import PostCard from '../PostCard/PostCard';
import './PostsList.css';

export default function PostsList() {
  const { posts, loading, error } = usePostContext(); // fetch from context

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>{error}</div>;
  if (!posts.length) return <div>No posts available.</div>;

  return (
    <div className='posts-list'>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}