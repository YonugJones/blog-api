import { useState  } from 'react';
import { createComment } from '../../api/api';
import useErrorHandling from '../../hooks/useErrorHandling';
import './NewComment.css';

const NewComment = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { error, handleError, clearError } = useErrorHandling();

  const handleChange = (e) => setContent(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      clearError();
      const newComment = await createComment(postId, { content });
      setContent('')
      onCommentAdded(newComment)
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className='new-comment-form' onSubmit={handleSubmit}>
      <h2>New Comment</h2>
      <label>
        <textarea 
          name='content'
          value={content}
          onChange={handleChange}
          required
        />
      </label>
      <button type='submit' disabled={loading}>Add Comment</button>
      {loading ? 'Adding...' : 'Add comment'}
      {error && <p className='error'>{error}</p>}
    </form>
  );
}

export default NewComment;