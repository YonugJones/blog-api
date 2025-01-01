import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../../api/api';
import './Login.css';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

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
      const response = await apiLogin(credentials);
      setMessage(`Welcome back ${response.user.username}`);
      login(response.token, navigate);
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again');
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
      <button type='submit'>Login</button>
      {message && <p className='success'>{message}</p>}
      {error && <p className='error'>{error}</p>}
    </form>
  );
}