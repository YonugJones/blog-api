import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <header>
      {user ? (
        <div>
          <p>Welcome, {user.username}</p>
          {isAdmin && <p>(Admin)</p>}
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <Link to='/login'>Please login</Link>
      )}
    </header>
  )
}

export default Header;