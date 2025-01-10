import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import PropTypes from 'prop-types';

const ProtectedRoute = ({ adminOnly = false, redirectPath = '/login' }) => {
  const { isLoggedIn, isAdmin, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>
  };

  console.log('isLoggedIn:', isLoggedIn, 'isAdmin:', isAdmin, 'adminOnly:', adminOnly);


  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace/>
  };

  if (adminOnly && !isAdmin) {
    return <Navigate to='/' replace/>
  }

  return <Outlet />
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  adminOnly: PropTypes.bool,
  redirectPath: PropTypes.string
}