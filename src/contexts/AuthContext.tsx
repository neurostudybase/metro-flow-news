import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'user' | 'administrator' | 'super_admin';

interface User {
  name: string;
  email: string;
  phone: string;
  city: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: Record<string, { password: string; user: User }> = {
  'info@tyumen.info': {
    password: 'admin123',
    user: {
      name: 'Администратор',
      email: 'info@tyumen.info',
      phone: '+7 (345) 000-00-01',
      city: 'Тюмень',
      role: 'administrator',
    },
  },
};

const defaultDemoUser: User = {
  name: 'Иван Иванов',
  email: 'ivan@tyumen.info',
  phone: '+7 (345) 123-45-67',
  city: 'Тюмень',
  role: 'user',
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string): boolean => {
    const found = mockUsers[email];
    if (found) {
      setUser(found.user);
    } else {
      setUser({ ...defaultDemoUser, email });
    }
    return true;
  };

  const register = (name: string, email: string, _password: string) => {
    setUser({ ...defaultDemoUser, name, email });
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = user?.role === 'administrator';

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
