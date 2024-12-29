import { useState } from 'react';
import { signup } from '../../api/api';
import './Signup.css';

export default function Signup() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData((prevData) => ({
      ...prevData, 
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    console.log(`handleSubmit function run. formdata: ${formData}`); // handleSubmit function run. formdata: [object Object]
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await signup(formData);
      console.log(response);
      setMessage(response.message || 'Signup successful. You can now login.')
    } catch (error) {
      setError(error.message || 'Signup failed. Please try again.')
    }
  };

  return (
    <form className='signup-form' onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <label>
        Username:
        <input 
          type='text'
          name='username'
          value={formData.username}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input 
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password:
        <input 
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Confirm Password:
        <input 
          type='password'
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </label>
      <button type='submit'>Signup</button>
      {message && <p className='success'>{message}</p>}
      {error && <p className='error'>{error}</p>}
    </form>
  )
}