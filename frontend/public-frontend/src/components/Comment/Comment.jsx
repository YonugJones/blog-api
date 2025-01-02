import { useContext, useState, useEffect } from 'react';
import { CommentsContext } from '../../context/CommentsContext';
import useErrorHandling from '../../hooks/useErrorHandling';
import './Comment.css';

export default function Comment({ postId, comment }) {
  const { likeComment, unlikeComment } = useContext(CommentsContext);
  const { error, handleError, clearError } = useErrorHandling();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Check if the user has already liked the comment
    const userId = localStorage.getItem('userId'); // Get the user ID from localStorage
    const existingLike = comment.CommentLike?.find((like) => like.userId === userId);
    setLiked(!!existingLike);
  }, [comment]);

  const handleLike = async () => {
    try {
      clearError();
      if (liked) {
        await unlikeComment(postId, comment.id);
      } else {
        await likeComment(postId, comment.id);
      }
      setLiked(!liked);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className='comment'>
      <div className='comment-top'>
        <p className='comment-author'>{comment.user.username}</p>
        <p className='comment-date'>{new Date(comment.createdAt).toLocaleString()}</p>
      </div>
      <div className='comment-bottom'>
        <p className='comment-content'>{comment.content}</p>
        <div className='comment-likes'>
          <button onClick={handleLike} className='comment-likes-button'>
            {liked ? 'Liked' : 'Like'}
          </button>
          <p className='comment-likes-count'>{comment._count.CommentLike}</p>
        </div>
        {error && <p className='error-message'>{error}</p>}
      </div> 
    </div>
  )
}