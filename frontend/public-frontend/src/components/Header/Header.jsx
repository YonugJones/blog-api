import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import './Header.css';

export default function Header() {
  const [isLoggedIn, logout] = useAuth();

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
          {isLoggedIn ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <Link to='/login'>Login</Link>
          )}
          <Link to='/signup'>Signup</Link>
        </ul>
      </nav>
    </header>
  )
}