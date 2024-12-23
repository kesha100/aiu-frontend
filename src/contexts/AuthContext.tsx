import React, { createContext, useState, useContext, useEffect } from 'react';
import { setAuthToken } from '../utils/apiHelper';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
      // You might want to fetch user data here
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
    setIsAuthenticated(true);
    // You might want to fetch user data here
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken('');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

