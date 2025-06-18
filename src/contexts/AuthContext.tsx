
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Course, AllCourse, Certificate, LoginCredentials } from '../types';
import { authService } from '../services/authService';
import { courseService } from '../services/courseService';
import { certificateService } from '../services/certificateService';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  courses: Course[];
  allCourses: AllCourse[];
  certificates: Certificate[];
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [allCourses, setAllCourses] = useState<AllCourse[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize app data
  useEffect(() => {
    initializeApp();
  }, []);

  // Load user data when user changes
  useEffect(() => {
    if (user) {
      loadUserData();
    } else {
      setCourses([]);
      setCertificates([]);
    }
  }, [user]);

  const initializeApp = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if user is already logged in
      const userResponse = await authService.getCurrentUser();
      if (userResponse.success && userResponse.data) {
        setUser(userResponse.data);
      }

      // Load all courses (public data)
      const allCoursesResponse = await courseService.getAllCourses();
      if (allCoursesResponse.success) {
        setAllCourses(allCoursesResponse.data);
      }
    } catch (err) {
      setError('Failed to initialize app');
      console.error('App initialization error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadUserData = async () => {
    if (!user) return;

    try {
      const [coursesResponse, certificatesResponse] = await Promise.all([
        courseService.getUserCourses(user.id),
        certificateService.getUserCertificates(user.id)
      ]);

      if (coursesResponse.success) {
        setCourses(coursesResponse.data);
      }

      if (certificatesResponse.success) {
        setCertificates(certificatesResponse.data);
      }
    } catch (err) {
      console.error('Failed to load user data:', err);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setError(null);
      const response = await authService.login(credentials);
      
      if (response.success && response.data) {
        setUser(response.data);
        localStorage.setItem('isLoggedIn', 'true');
        return true;
      } else {
        setError(response.message || 'Login failed');
        return false;
      }
    } catch (err) {
      setError('Login failed');
      console.error('Login error:', err);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
      setUser(null);
      setCourses([]);
      setCertificates([]);
      localStorage.removeItem('isLoggedIn');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        courses, 
        allCourses,
        certificates,
        loading,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
