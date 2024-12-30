import './Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
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
        </ul>
      </nav>
    </header>
  )
}