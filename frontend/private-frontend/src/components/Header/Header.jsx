import { useAuth } from '../../context/authContext';

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
        <p>Please login</p>
      )}
    </header>
  )
}

export default Header;