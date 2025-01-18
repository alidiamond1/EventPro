import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem('eventPlannerUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // In a real app, this would make an API call
    // For now, we'll simulate authentication with localStorage
    if (email && password) {
      const userData = {
        id: Date.now(),
        email,
        name: email.split('@')[0], // Simple way to generate a name
      };
      setUser(userData);
      localStorage.setItem('eventPlannerUser', JSON.stringify(userData));
      return true;
    }
    throw new Error('Invalid credentials');
  };

  const register = async (email, password) => {
    // In a real app, this would make an API call
    // For now, we'll simulate registration with localStorage
    const existingUsers = JSON.parse(localStorage.getItem('eventPlannerUsers') || '[]');
    const userExists = existingUsers.some(u => u.email === email);
    
    if (userExists) {
      throw new Error('User already exists');
    }

    const userData = {
      id: Date.now(),
      email,
      name: email.split('@')[0],
    };

    existingUsers.push({ email, password }); // Store credentials separately
    localStorage.setItem('eventPlannerUsers', JSON.stringify(existingUsers));
    
    // Auto login after registration
    setUser(userData);
    localStorage.setItem('eventPlannerUser', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eventPlannerUser');
  };

  const value = {
    user,
    login,
    logout,
    register,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};