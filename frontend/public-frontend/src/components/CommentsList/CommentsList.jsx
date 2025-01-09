import useComments from '../../hooks/useComments';
import Comment from '../Comment/Comment';
import NewComment from '../NewComment/NewComment';
import { useAuth } from '../../context/authContext';
import './CommentsList.css';

const CommentsList = ({ postId }) => {
  const { comments, loading, error, updateComments } = useComments(postId);
  const { isLoggedIn } = useAuth();

  const onUpdate = (updatedCommentId, updatedCommentData) => {
    updateComments(
      comments.map((comment) =>
        comment.id === updatedCommentId ? { ...comment, ...updatedCommentData } : comment
      )
    );
  };

  if (!isLoggedIn) return <div>Please login to view comments.</div>;
  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>{error}</div>;
  if (!comments.length) return <div>No comments yet! Be the first to add one!</div>;

  return (
    <div className='comments-list'>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} postId={postId} onUpdate={onUpdate} />
      ))}
      <NewComment postId={postId} updateComments={updateComments} />
    </div>
  );
};

export default CommentsList;
