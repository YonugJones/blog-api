import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

export default function Header() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="header">
      <h1 className="header-title">My Blog</h1>
      <nav>
        <ul className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </ul> 
        <ul className="auth-links">
          {isLoggedIn ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <>
              <button><Link to='/login'>Login</Link></button>
              <button><Link to='/signup'>Signup</Link></button>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
