import { useCommentsContext } from '../../context/CommentsContext';
import Comment from '../Comment/Comment';
import './CommentsList.css';

export default function CommentsList(postId) {
  const { fetchComments } = useCommentsContext();
  const { comments, loading, error } = fetchComments(postId)
  
  if (loading) return <div>Loading comments...</div>
  if (error) return <div>{error}</div>
  if (!comments.length) return <div>No comments yet. Be the first to leave a comment!</div>

  return (
    <div className='comments-list'>
      {comments.map((comment) => (
        <Comment key={comment.id} postId={postId} comment={comment} />
      ))}
    </div>
  )
}