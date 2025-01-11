import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header>
      {user ? (
        <div>
          <h1>Admin Blog</h1>
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