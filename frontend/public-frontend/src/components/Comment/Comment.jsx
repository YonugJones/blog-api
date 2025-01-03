import { useState, useEffect } from 'react';
import { likeComment as apiLikeComment, unlikeComment as apiUnlikeComment } from '../../api/api';
import './Comment.css';

const Comment = ({ comment }) => {
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState(null);
  const [likeCount, setLikeCount] = useState(comment._count.CommentLike);

  useEffect(() => {
    setLiked(comment.isLiked);
    setLikeCount(comment._count.CommentLike);
  }, [comment]);

  const handleLike = async () => {
    try {
      console.log(comment.id);
      if (liked) {
        const response = await apiUnlikeComment(comment.postId, comment.id);
        setLikeCount(response.data._count.CommentLike); 
      } else {
        const response = await apiLikeComment(comment.postId, comment.id);
        setLikeCount(response.data._count.CommentLike); 
      }
      setLiked(!liked); 
    } catch (err) {
      setError(err.response?.data?.message || 'Not able to handle comment like');
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
          <p className='comment-likes-count'>{likeCount}</p>
        </div>
        {error && <p className='error'>{error}</p>}
      </div>
    </div>
  );
};

export default Comment;
