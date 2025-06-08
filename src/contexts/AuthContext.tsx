
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  progress: number;
  image: string;
  topics: string[];
  examinations: {
    title: string;
    score: number;
    maxScore: number;
    date: string;
  }[];
  attendance: {
    date: string;
    status: 'present' | 'absent';
    topic: string;
  }[];
}

interface Certificate {
  id: string;
  courseTitle: string;
  issueDate: string;
  score: number;
  certificateUrl: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  courses: Course[];
  certificates: Certificate[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
};

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Advanced React Development',
    description: 'Master modern React concepts including hooks, context, and performance optimization.',
    instructor: 'Sarah Wilson',
    duration: '8 weeks',
    progress: 75,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    topics: [
      'React Hooks Deep Dive',
      'Context API & State Management',
      'Performance Optimization',
      'Testing React Applications',
      'Advanced Patterns'
    ],
    examinations: [
      { title: 'Hooks Assessment', score: 85, maxScore: 100, date: '2024-05-15' },
      { title: 'Context API Quiz', score: 92, maxScore: 100, date: '2024-05-22' }
    ],
    attendance: [
      { date: '2024-05-01', status: 'present', topic: 'Introduction to Advanced React' },
      { date: '2024-05-08', status: 'present', topic: 'React Hooks Deep Dive' },
      { date: '2024-05-15', status: 'absent', topic: 'Context API Fundamentals' },
      { date: '2024-05-22', status: 'present', topic: 'Performance Optimization' }
    ]
  },
  {
    id: '2',
    title: 'Full Stack JavaScript',
    description: 'Complete guide to building full-stack applications with Node.js and React.',
    instructor: 'Mike Johnson',
    duration: '12 weeks',
    progress: 60,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
    topics: [
      'Node.js Fundamentals',
      'Express.js Framework',
      'Database Integration',
      'API Development',
      'Authentication & Security'
    ],
    examinations: [
      { title: 'Backend Fundamentals', score: 78, maxScore: 100, date: '2024-04-20' }
    ],
    attendance: [
      { date: '2024-04-01', status: 'present', topic: 'Node.js Introduction' },
      { date: '2024-04-08', status: 'present', topic: 'Express.js Setup' },
      { date: '2024-04-15', status: 'present', topic: 'Database Basics' }
    ]
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    description: 'Learn design thinking and create beautiful, user-friendly interfaces.',
    instructor: 'Emily Chen',
    duration: '6 weeks',
    progress: 100,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
    topics: [
      'Design Thinking Process',
      'User Research Methods',
      'Wireframing & Prototyping',
      'Visual Design Principles',
      'Usability Testing'
    ],
    examinations: [
      { title: 'Design Theory', score: 95, maxScore: 100, date: '2024-03-15' },
      { title: 'Final Project', score: 88, maxScore: 100, date: '2024-03-30' }
    ],
    attendance: [
      { date: '2024-03-01', status: 'present', topic: 'Design Thinking Introduction' },
      { date: '2024-03-08', status: 'present', topic: 'User Research Workshop' },
      { date: '2024-03-15', status: 'present', topic: 'Wireframing Session' },
      { date: '2024-03-22', status: 'present', topic: 'Visual Design Lab' },
      { date: '2024-03-29', status: 'present', topic: 'Final Presentations' }
    ]
  }
];

const mockCertificates: Certificate[] = [
  {
    id: '1',
    courseTitle: 'UI/UX Design Principles',
    issueDate: '2024-04-01',
    score: 91,
    certificateUrl: '#'
  },
  {
    id: '2',
    courseTitle: 'JavaScript Fundamentals',
    issueDate: '2024-02-15',
    score: 87,
    certificateUrl: '#'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    // Mock authentication - accept any email/password for demo
    if (email && password) {
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        courses: mockCourses, 
        certificates: mockCertificates 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
