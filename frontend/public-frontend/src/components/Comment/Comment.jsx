import './Comment.css';

export default function Comment({ comment }) {
  return (
    <div className='comment'>
      <div className='comment-top'>
        <p className='comment-author'>Author: {comment.user.username}</p>
        <p className='comment-date'>{new Date(comment.createdAt).toLocaleString()}</p>
      </div>
      <div className='comment-bottom'>
        <p className='comment-content'>{comment.content}</p>
        <div className='comment-likes'>
          <button className='comment-likes-button'>Like</button>
          <p className='comment-likes-count'>{comment._count.CommentLike}</p>
        </div>
      </div> 
    </div>
  )
}