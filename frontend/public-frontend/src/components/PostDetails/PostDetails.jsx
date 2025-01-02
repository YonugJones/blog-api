import { useParams } from 'react-router-dom';
import CommentsList from '../CommentsList/CommentsList';
import NewComment from '../NewComment/NewComment';
import useFetchPost from '../../hooks/useFetchPost';
import useFetchComments from '../../hooks/useFetchComments';
import './PostDetails.css';

export default function PostDetails() {
  const { postId } = useParams();
  const { post, loading: postLoading, error: postError } = useFetchPost(postId);
  const { comments, error: commentsError } = useFetchComments(postId);

  if (postLoading) {
    return <div>Loading post...</div>;
  }

  if (postError) {
    return <div>Error loading post: {postError}</div>;
  }

  return (
    <div className='post-details'>
      <img src={post.imageUrl} alt={post.title} className='post-image'/>
      <h1 className='post-title'>{post.title}</h1>
      <p className='post-content'>{post.content}</p>
      <p className='post-author'>Author: {post.author.username}</p>
      <p className='post-published'>Published: {new Date(post.createdAt).toLocaleString()}</p>
      <div className='comments-header'>
        <h2>Comments</h2>
      </div>
      {commentsError ? (
        <div>Error loading comments: {commentsError}</div>
      ) : (
        <CommentsList postId={postId} comments={comments} />
      )}
      <NewComment postId={postId} />
    </div>
  );
}