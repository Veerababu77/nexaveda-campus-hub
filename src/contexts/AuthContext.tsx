import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { courseService } from '../services/courseService';
import { authService } from '../services/authService';
import { certificateService } from '../services/certificateService';
import { User, LoginCredentials } from '../types';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  courses: any[];
  allCourses: any[];
  certificates: any[];
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    const res = await authService.login(credentials);
    if (res.success) {
      setUser(res.data);
      await loadAppData();
    }
    return res.success;
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem('accessToken');
    setUser(null);
    setCourses([]);
    setAllCourses([]);
    setCertificates([]);
  };

  const loadAppData = async () => {
    try {
      const courseRes = await courseService.getUserCourses();
      if (courseRes.success) setCourses(courseRes.data);

      const allCourseRes = await courseService.getAllCourses();
      if (allCourseRes.success) setAllCourses(allCourseRes.data);

      const certificateRes = await certificateService.getUserCertificates();
      if (certificateRes.success) setCertificates(certificateRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const res = await authService.getCurrentUser();
        if (res.success && res.data) {
          setUser(res.data);
          await loadAppData();
        }
      } catch (err) {
        console.error('Auto-login failed:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, courses, allCourses, certificates, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
