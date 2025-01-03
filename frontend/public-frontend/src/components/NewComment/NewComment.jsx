import { useState } from 'react';
import { createComment } from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import './NewComment.css';

const NewComment = ({ postId }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { isLoggedIn } = useAuth();

  const handleChange = (e) => {
    setContent(e.target.value);
    setError(null); 
    setSuccess(false); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createComment(postId, { content });
      setContent('');
      setSuccess(true); 
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-comment">
      {isLoggedIn && 
        <>
          <h2>Add a Comment</h2>
          <form className="new-comment-form" onSubmit={handleSubmit}>
          <textarea
            name="content"
            value={content}
            onChange={handleChange}
            placeholder="Write your comment here..."
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Comment'}
          </button>
        </form>
        {success && <p className="success-message">Comment added successfully!</p>}
        {error && <p className="error-message">{error}</p>}
        </>
      }
    </div>
  );
};

export default NewComment;
