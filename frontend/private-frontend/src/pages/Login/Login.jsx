import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData); 
      navigate('/admin');
    } catch (err) {
      console.error('Login error:', err);
    } 
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Admin Login</h2>
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
      <button type='submit' disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p className='error'>{error}</p>}
    </form>
  );
};

export default Login;