// This component handles loading, errors, and displaying the post information cleanly.

import { useParams } from 'react-router-dom';
import usePost from '../../hooks/usePost';
import CommentsList from '../CommentsList/CommentsList';
import './Post.css';

const Post = () => {
  const { postId } = useParams();
  const { post, loading, error } = usePost(postId); 


  if (loading) return <div>Loading post...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>No post found</div>;

  return (
    <div className='post'>
     {post && (
      <>
        <img src={post.imageUrl} alt={post.title} className='post-image' />
        <h1 className='post-title'>{post.title}</h1>
        <p className='post-content'>{post.content}</p>
        <p className='post-author'>Author: {post.author.username}</p>
        <p className='post-published'>Published: {new Date(post.createdAt).toLocaleString()}</p>
        <div className='comments-header'>
          <h2>Comments</h2>
        </div>
        <CommentsList postId={postId} />
      </>
     )}
    </div>
  );
}

export default Post;