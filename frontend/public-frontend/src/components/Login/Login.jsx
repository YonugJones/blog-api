import { useState } from 'react';
import { login } from '../../api/api';
import './Login.css';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await login(credentials);
      setMessage(`Welcome back ${response.username}`);
      localStorage.setItem('token', response.token)
    } catch (error) {
      setError(error.message || 'Login failed. Please try again');
    }
  };

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        Email:
          <input 
            type='email' 
            name='email'
            value={credentials.email}
            onChange={handleChange}
            required
          />
      </label>
      <label>
        Password:
          <input 
            type='password' 
            name='password'
            value={credentials.password}
            onChange={handleChange}
            required
          />
      </label>
      {message && <p className='success'>{message}</p>}
      {error && <p className='error'>{error}</p>}
      <button type='submit'>Login</button>
    </form>
  )
}
