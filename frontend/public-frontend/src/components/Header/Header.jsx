import './Header.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { logout } from '../../api/api';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLoutout = () => {
    logout();
  }

  return (
    <header className='header'>
      <h1 className='header-title'>My Blog</h1>
      <nav>
        <ul className='nav-links'>
          <Link className='home-link' to='/'>Home</Link>
          <Link className='about-link' to='/about'>About</Link>
          <Link className='contact-link' to='/contact'>Contact</Link>
        </ul>
        <ul className='auth-links'>
          <Link className='signup-link' to='/signup'>Signup</Link>
          <div className='login-logout'>
            {isLoggedIn ? (
              <button onClick={handleLoutout}>Logout</button>
            ) : (
              <button><Link className='signup-link' to='/login'>Login</Link></button>
            )}
          </div>
        </ul>
      </nav>
    </header>
  )
}