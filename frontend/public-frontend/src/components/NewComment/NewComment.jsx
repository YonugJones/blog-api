import { useState } from 'react';
import { createComment } from '../../api/api';
import './NewComment.css';

export default function NewComment({ postId }) {
  const [commentData, setCommentData] = useState({ content: '' })
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await createComment(postId, commentData);
      setMessage(response.message || 'Comment created.')
      setCommentData({ content: '' });
    } catch (error) {
      setError(error.response?.data?.message|| 'Comment creation failed. Please try again')
    }
  }

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
      <button type='submit'>Add</button>
      {message && <p className='success'>{message}</p>}
      {error && <p className='error'>{error}</p>}
    </form>
  )
}