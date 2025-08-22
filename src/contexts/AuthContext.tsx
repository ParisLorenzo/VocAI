import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, redirectTo?: string) => Promise<boolean>;
  logout: () => void;
  lastVisitedPath: string | null;
  setLastVisitedPath: (path: string) => void;
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
  const [user, setUser] = useState<User | null>(null);
  const [lastVisitedPath, setLastVisitedPath] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is authenticated on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('vocai_user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem('vocai_user');
    }
  }, []);

  // Save last visited path when location changes (except for auth pages)
  useEffect(() => {
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
    if (!isAuthPage && location.pathname !== '/') {
      setLastVisitedPath(location.pathname);
      localStorage.setItem('vocai_last_path', location.pathname);
    }
  }, [location.pathname]);

  const login = async (email: string, password: string, redirectTo?: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication logic
      if (email === "test@example.com" && password === "123456") {
        const mockUser: User = {
          id: '1',
          email: email,
          name: 'Usuario Demo'
        };
        
        setUser(mockUser);
        localStorage.setItem('vocai_user', JSON.stringify(mockUser));
        
        // Determine redirect path: explicit redirect > saved path > default
        let redirectPath = '/';
        
        if (redirectTo && redirectTo !== '/login' && redirectTo !== '/register') {
          redirectPath = redirectTo;
        } else {
          const savedPath = localStorage.getItem('vocai_last_path');
          if (savedPath && savedPath !== '/login' && savedPath !== '/register') {
            redirectPath = savedPath;
          }
        }
        
        navigate(redirectPath);
        localStorage.removeItem('vocai_last_path'); // Clear saved path after use
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vocai_user');
    localStorage.removeItem('vocai_last_path');
    navigate('/');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    lastVisitedPath,
    setLastVisitedPath: (path: string) => {
      setLastVisitedPath(path);
      localStorage.setItem('vocai_last_path', path);
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
