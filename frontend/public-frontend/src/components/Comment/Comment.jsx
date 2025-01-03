import { useState } from 'react';
import { likeComment as apiLikeComment, unlikeComment as apiUnlikeComment } from '../../api/api';
import './Comment.css'

const Comment = (comment) => {
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState(null);

  const handleLike = async () => {
    try {
      if (liked) {
        await apiUnlikeComment(comment.postId, comment.id);
      } else {
        await apiLikeComment(comment.postId, comment.id);
      }
      setLiked(!liked);
    } catch (err) {
      setError(err.response?.data?.message || 'Not able to handle comment like')
    }
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
          <button onClick={handleLike} className='comment-likes-button'>
            {liked ? 'Liked' : 'Like'}
            {error && <p>{error}</p>}
          </button>
          <p className='comment-likes-count'>{comment._count.CommentLike}</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;