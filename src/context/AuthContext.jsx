// src/context/AuthContext.jsx
// Manages login state across the entire app

import { createContext, useState, useContext } from 'react';

// Create the context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Check if user is already logged in (saved in localStorage)
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  const [token, setToken] = useState(
    localStorage.getItem('token') || null
  );

  // Called after successful login or register
  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    // Save to localStorage so user stays logged in after refresh
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', tokenData);
  };

  // Called when user clicks logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook — use this in any component to get user info
export function useAuth() {
  return useContext(AuthContext);
}