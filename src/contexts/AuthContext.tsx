'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../services/api';
// import { User } from '../types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  // login: (email: string, password: string) => Promise<void>;
  login: (phone: string, password: string) => Promise<void>; // MODIFIED
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<any>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          // Optionally verify token with backend
          const response = await authAPI.getProfile();
          setUser(response.data.data);
        } catch (error) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // const login = async (email: string, password: string) => {
  //   try {
  //     const response = await authAPI.login({ email, password });
  //     const { user: userData, token } = response.data.data;

  //     localStorage.setItem('authToken', token);
  //     localStorage.setItem('user', JSON.stringify(userData));
  //     setUser(userData);
  //     toast.success('Login successful!');
  //   } catch (error: any) {
  //     const message = error.response?.data?.message || 'Login failed';
  //     toast.error(message);
  //     throw error;
  //   }
  // };
  const login = async (phone: string, password: string) => {
    try {
      const response = await authAPI.login({ phone, password });
      const { user: userData, token } = response.data.data;

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      toast.success('Login successful!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  };

  const register = async (data: any) => {
    try {
      const response = await authAPI.register(data);
      toast.success('Registration successful! Please login.');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateUser = (userData: Partial<any>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};