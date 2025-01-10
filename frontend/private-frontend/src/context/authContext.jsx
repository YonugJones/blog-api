import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode'; 
import { login as loginAPI, logout as logoutAPI } from '../api/authAPI';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token); 
        setUser({
          id: decoded.id,
          username: decoded.username,
          isAdmin: decoded.isAdmin,
          token,
        });
      } catch (err) {
        console.error('Invalid token:', err);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setError(null);
    setLoading(true);

    try {
      const { user, token } = await loginAPI(credentials);
      localStorage.setItem('token', token);
      setUser({
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin,
        token,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutAPI();
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.isAdmin || false,
        isLoggedIn: !!user,
        loading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
