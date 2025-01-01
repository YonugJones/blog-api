import { useContext } from 'react';
import { CommentsContext } from '../../context/CommentsContext';
import './Comment.css';

export default function Comment({ postId, comment }) {
  const { likeComment } = useContext(CommentsContext);

  const handleLike = () => {
    likeComment(postId, comment.id);
  }

  return (
    <div className='comment'>
      <div className='comment-top'>
        <p className='comment-author'>{comment.user.username}</p>
        <p className='comment-date'>{new Date(comment.createdAt).toLocaleString()}</p>
      </div>
      <div className='comment-bottom'>
        <p className='comment-content'>{comment.content}</p>
        <div className='comment-likes'>
          <button onClick={handleLike} className='comment-likes-button'>Like</button>
          <p className='comment-likes-count'>{comment._count.CommentLike}</p>
        </div>
      </div> 
    </div>
  )
}

