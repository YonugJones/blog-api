import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { login as loginAPI, logout as logoutAPI } from '../api/authAPI';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      setUser({ id: userId, token })
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    const { user, token } = await loginAPI(credentials);
    setUser({ id: user.id, isAdmin: user.isAdmin, token });
  };

  const logout = () => {
    logoutAPI();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.isAdmin || false, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};