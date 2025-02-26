import usePosts from '../../hooks/usePosts';
import PostCard from '../PostCard/PostCard';
import './PostsList.css';

const PostsList = () => {
  const { posts, loading, error } = usePosts();

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>{error}</div>;
  if(!posts) return <div>Uh oh no posts!</div>

  return (
    <div className='posts-list'>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostsList;