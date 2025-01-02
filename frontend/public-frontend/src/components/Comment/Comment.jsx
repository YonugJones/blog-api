import { useContext, useState, useEffect } from 'react';
import { CommentsContext } from '../../context/CommentsContext';
import './Comment.css';

export default function Comment({ postId, comment }) {
  const { likeComment, unlikeComment } = useContext(CommentsContext);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const existingLike = comment.CommentLike?.find((like) => like.userId === userId);
    setLiked(!!existingLike);
  }, [comment])

  const handleLike = () => {
    if (liked) {
      unlikeComment(postId, comment.id)
    } else {
      likeComment(postId, comment.id)
    }
    setLiked(!liked);
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
          </button>
          <p className='comment-likes-count'>{comment._count.CommentLike}</p>
        </div>
      </div> 
    </div>
  )
}

