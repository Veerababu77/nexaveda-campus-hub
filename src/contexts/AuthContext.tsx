
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
  price: number;
  originalPrice?: number;
  rating: number;
  students: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
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

interface AllCourse {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  students: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  topics: string[];
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
  allCourses: AllCourse[];
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
    price: 99,
    originalPrice: 149,
    rating: 4.8,
    students: 2150,
    difficulty: 'Advanced',
    category: 'Frontend Development',
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
    price: 129,
    originalPrice: 199,
    rating: 4.6,
    students: 1850,
    difficulty: 'Intermediate',
    category: 'Full Stack Development',
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
    price: 79,
    originalPrice: 119,
    rating: 4.9,
    students: 3200,
    difficulty: 'Beginner',
    category: 'Design',
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

const mockAllCourses: AllCourse[] = [
  ...mockCourses.map(course => ({
    id: course.id,
    title: course.title,
    description: course.description,
    instructor: course.instructor,
    duration: course.duration,
    image: course.image,
    price: course.price,
    originalPrice: course.originalPrice,
    rating: course.rating,
    students: course.students,
    difficulty: course.difficulty,
    category: course.category,
    topics: course.topics
  })),
  {
    id: '4',
    title: 'Python for Data Science',
    description: 'Master Python programming for data analysis, visualization, and machine learning.',
    instructor: 'Dr. Alex Kumar',
    duration: '10 weeks',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
    price: 119,
    originalPrice: 179,
    rating: 4.7,
    students: 2800,
    difficulty: 'Intermediate',
    category: 'Data Science',
    topics: [
      'Python Fundamentals',
      'Data Analysis with Pandas',
      'Data Visualization',
      'Machine Learning Basics',
      'Real-world Projects'
    ]
  },
  {
    id: '5',
    title: 'Digital Marketing Mastery',
    description: 'Complete digital marketing course covering SEO, social media, and paid advertising.',
    instructor: 'Maria Rodriguez',
    duration: '8 weeks',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    price: 89,
    originalPrice: 139,
    rating: 4.5,
    students: 4100,
    difficulty: 'Beginner',
    category: 'Marketing',
    topics: [
      'SEO Fundamentals',
      'Social Media Marketing',
      'Google Ads',
      'Content Marketing',
      'Analytics & Reporting'
    ]
  },
  {
    id: '6',
    title: 'Cybersecurity Fundamentals',
    description: 'Learn essential cybersecurity concepts and protect digital assets.',
    instructor: 'James Wilson',
    duration: '12 weeks',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
    price: 149,
    originalPrice: 219,
    rating: 4.8,
    students: 1650,
    difficulty: 'Advanced',
    category: 'Cybersecurity',
    topics: [
      'Network Security',
      'Ethical Hacking',
      'Risk Assessment',
      'Security Policies',
      'Incident Response'
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
        allCourses: mockAllCourses,
        certificates: mockCertificates 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
