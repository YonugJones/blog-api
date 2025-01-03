import useComments from '../../hooks/useComments';
import Comment from '../Comment/Comment';
import { useAuth } from '../../context/AuthContext';
import './CommentsList.css';

const CommentsList = ({ postId }) => {
  const { comments, loading, error } = useComments(postId);
  const { isLoggedIn } = useAuth();
  
  if (!isLoggedIn) return <div>Please login to view comments.</div>
  if (loading) return <div>Loading comments...</div>
  if (error) return <div>{error}</div>
  if (!comments.length) return <div>No comments yet! Be the first to add one!</div>

  return (
    <div className='comments-list'>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

export default CommentsList;