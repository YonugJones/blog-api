import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData.email);
    console.log(formData.password);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { email, password } = formData;

    try {
      if (!email && !password) throw new Error('Email and password are required for login');
      await login({ email, password });

      if (!isAdmin) throw new Error('Access denied: Admin only')
    
      navigate('/'); // need to create dashboard component still
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed')
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='login-page'>
      <h1>Admin Login</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        {error && <p className='error-message'>{error}</p>}
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input 
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}          
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input 
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}   
            required
            disabled={loading}        
          />
        </div>
        <button type='submit' disabled={loading}>
          {loading ? 'Logging In' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login;