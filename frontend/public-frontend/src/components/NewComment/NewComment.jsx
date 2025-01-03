import { useState  } from 'react';
import { createComment } from '../../api/api';
import useErrorHandling from '../../hooks/useErrorHandling';
import './NewComment.css';

const NewComment = ({ postId }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const { error, handleError, clearError } = useErrorHandling();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      clearError();
      const response = await createComment(postId, content);
      setContent(response.content)
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
        <input 
          type='text' 
          name='content'
          value={commentData.content}
          onChange={handleChange}
          required
        />
      </label>
      <button type='submit'>Add Comment</button>
      {message && <p className='success'>{message}</p>}
      {error && <p className='error'>{error}</p>}
    </form>
  );
}