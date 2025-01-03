import useComments from '../../hooks/useComments';
import Comment from '../Comment/Comment';
import './CommentsList.css';

const CommentsList = ({ postId }) => {
  const{ comments, loading, error } = useComments(postId);
  
  if (loading) return <div>Loading comments...</div>
  if (error) return <div>{error}</div>

  return (
    <div className='comments-list'>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

export default CommentsList;