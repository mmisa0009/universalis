'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  login: () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('auth_token');
    if (!saved) {
      setLoading(false);
      return;
    }
    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${saved}` } })
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setToken(saved);
          setUser(data.user);
        } else {
          localStorage.removeItem('auth_token');
        }
      })
      .catch(() => localStorage.removeItem('auth_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = (newToken: string, newUser: AuthUser) => {
    localStorage.setItem('auth_token', newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = async () => {
    if (token) {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
