import React, { createContext, useContext, useEffect, useState } from 'react';
import { appwriteService } from './appwrite';

interface User {
  $id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await appwriteService.getCurrentUser();
      if (currentUser) {
        setUser({
          $id: currentUser.$id,
          email: currentUser.email,
          name: currentUser.name
        });
      }
    } catch (error) {
      console.log('No user session found');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await appwriteService.login(email, password);
      const currentUser = await appwriteService.getCurrentUser();
      if (currentUser) {
        setUser({
          $id: currentUser.$id,
          email: currentUser.email,
          name: currentUser.name
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      await appwriteService.loginWithGoogle();
      // The OAuth flow will redirect to the success URL
      // User data will be set when the page reloads and checkUser() runs
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      await appwriteService.createUser(email, password, name);
      await login(email, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await appwriteService.logout();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    loginWithGoogle,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};