export default function Comment({ comment }) {
  return (
    <div className='comment'>
      <p>{comment.content}</p>
      <p>Likes: {comment._count.CommentLike}</p>
      <p>Author: {comment.user.username}</p>
    </div>
  )
}