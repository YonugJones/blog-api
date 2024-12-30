
import Comment from '../Comment/Comment';
import './CommentsList.css';

export default function CommentsList({ comments }) {
  if (!comments.length) {
    return <div>No comments yet. Be the first to leave a comment!</div>;
  }

  return (
    <div className='comments-list'>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}