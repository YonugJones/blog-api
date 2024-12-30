import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCommentsByPostId } from '../../api/apiOLD';
import Comment from '../Comment/Comment';
import './CommentsList.css';

export default function CommentsList() {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const fetchedComments = await fetchCommentsByPostId(postId);
        setComments(fetchedComments);
      } catch (error) {
        setError(error.message);
      }
    };
    loadComments(); 
  }, [postId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!comments) {
    return <div>No comments yet. Be the first to leave a comment!</div>;
  }


  return (
    <div className='comments-list'>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}