
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee';
  companyId: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('cabit_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  // Debug logging
  useEffect(() => {
    console.log('AuthProvider initialized, user:', user);
  }, []);
  
  const login = (userData: User) => {
    console.log('Logging in user:', userData);
    setUser(userData);
    localStorage.setItem('cabit_user', JSON.stringify(userData));
  };
  
  const logout = () => {
    console.log('Logging out user');
    setUser(null);
    localStorage.removeItem('cabit_user');
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout
    }}>
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
