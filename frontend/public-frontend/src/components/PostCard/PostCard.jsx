import './PostCard.css';
import { useNavigate } from 'react-router-dom';

export default function PostCard({ post }) {
  const navigate = useNavigate()

  return (
    <div className='post-card' onClick={() => navigate(`/posts/${post.id}`)}>
      <img src={post.imageUrl} alt={post.title} className='post-card-image' />
      <h2 className='post-card-title'>{post.title}</h2>
    </div>
  )
}
