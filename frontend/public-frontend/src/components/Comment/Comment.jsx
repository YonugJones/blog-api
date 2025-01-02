import { useCommentsContext } from '../../context/CommentsContext';
import './Comment.css'

export default function Comment({ postId, comment }) {
  const { likeComment, unlikeComment } = useCommentsContext();

  const handleLikeToggle = async () => {
    try {
      const updatedComment = 
    } catch (error) {
      
    }
  }
}