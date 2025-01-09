import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode'; 

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userInfo = jwtDecode(token); 
      setUser(userInfo);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token, navigate) => {
    localStorage.setItem('token', token);
    const userInfo = jwtDecode(token);
    setUser(userInfo);
    setIsLoggedIn(true);
    if (navigate) {
      navigate('/posts');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};