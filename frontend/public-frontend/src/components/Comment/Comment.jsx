const Comment = (comment) => {
  
  return (
    <div className='comment'>
      <div className='comment-top'>
        <p className='comment-author'>{comment.user.username}</p>
        <p className='comment-date'>{new Date(comment.createdAt).toLocaleString()}</p>
      </div>
      <div className='comment-bottom'>
        <p className='comment-content'>{comment.content}</p>
        <div className='comment-likes'>
          <button onClick={handleLikeToggle} className='comment-likes-button'>
            {liked ? 'Liked' : 'Like'}
          </button>
          <p className='comment-likes-count'>{comment._count.CommentLike}</p>
        </div>
      </div>
    </div>
  );
}