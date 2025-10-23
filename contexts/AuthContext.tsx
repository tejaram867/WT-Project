'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/lib/supabase';
import { signIn as authSignIn, signUp as authSignUp, getCurrentUser, decodeToken } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn: (mobile: string, password: string) => Promise<void>;
  signUp: (data: any) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      const decoded = decodeToken(storedToken);
      if (decoded && decoded.exp > Date.now()) {
        setToken(storedToken);
        getCurrentUser(decoded.id).then(userData => {
          setUser(userData);
          setLoading(false);
        }).catch(() => {
          localStorage.removeItem('auth_token');
          setLoading(false);
        });
      } else {
        localStorage.removeItem('auth_token');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const signIn = async (mobile: string, password: string) => {
    const { user: userData, token: authToken } = await authSignIn(mobile, password);
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('auth_token', authToken);
  };

  const signUp = async (data: any) => {
    const userData = await authSignUp(data);
    const { token: authToken } = await authSignIn(data.mobile, data.password);
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('auth_token', authToken);
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
