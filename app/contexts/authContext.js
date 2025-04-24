"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, logout as logoutApi } from '../services/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('getcurrentuser is being fired');
    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
