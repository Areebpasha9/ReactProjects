import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('lms_user');
    const storedToken = localStorage.getItem('lms_token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    // Mock API call - in real app, this would be a fetch request
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: Date.now(),
          email,
          name: email.split('@')[0],
          role: role || 'student',
          avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
          joined: new Date().toISOString(),
        };
        
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        setUser(mockUser);
        localStorage.setItem('lms_user', JSON.stringify(mockUser));
        localStorage.setItem('lms_token', mockToken);
        
        resolve({ success: true, user: mockUser });
      }, 500);
    });
  };

  const signup = async (userData) => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: Date.now(),
          ...userData,
          avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=random`,
          joined: new Date().toISOString(),
        };
        
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        setUser(newUser);
        localStorage.setItem('lms_user', JSON.stringify(newUser));
        localStorage.setItem('lms_token', mockToken);
        
        resolve({ success: true, user: newUser });
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lms_user');
    localStorage.removeItem('lms_token');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('lms_user', JSON.stringify(updatedUser));
  };

  const isAuthenticated = !!user;
  const isStudent = user?.role === 'student';
  const isInstructor = user?.role === 'instructor';
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{user,loading,isAuthenticated,isStudent,isInstructor,isAdmin, login,
        signup, logout, updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};