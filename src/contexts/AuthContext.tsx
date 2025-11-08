import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

const AUTH_KEY = '@event_explorer_user';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem(AUTH_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    // Mock authentication - replace with real API call
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: '1',
        email: email,
        name: email.split('@')[0],
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=6366f1&color=fff`,
      };
      
      setUser(mockUser);
      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid credentials');
    }
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string) => {
    // Mock signup - replace with real API call
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Date.now().toString(),
        email: email,
        name: name,
        avatar: `https://ui-avatars.com/api/?name=${name}&background=6366f1&color=fff`,
      };
      
      setUser(mockUser);
      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(mockUser));
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error('Signup failed');
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem(AUTH_KEY);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: user !== null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
