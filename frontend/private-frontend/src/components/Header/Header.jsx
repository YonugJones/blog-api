import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className='header'>
      <h1>Admin Blog</h1>
        {user ? (
          <div>
            <p>Welcome, {user.username}</p>
            <button>
              <Link to='/admin'>Home</Link>
            </button>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <Link to='/login'>Please login</Link>
        )}
    </header>
  )
}

export default Header;