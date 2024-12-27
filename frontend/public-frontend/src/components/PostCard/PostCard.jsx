import './PostCard.css';

export default function PostCard({ post, onClick }) {
  return (
    <div className='post-card' onClick={() => onClick(post.id)}>
      <img src={post.imageUrl} alt={post.title} className='post-card-image' />
      <h2 className='post-card-title'>{post.title}</h2>
    </div>
  )
}
