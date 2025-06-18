
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface Course {
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

export interface AllCourse {
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

export interface Certificate {
  id: string;
  courseTitle: string;
  issueDate: string;
  score: number;
  certificateUrl: string;
}

export interface LoginCredentials {
  emailOrPhone: string;
  password: string;
}

export interface EnrollmentData {
  courseId: string;
  studentName: string;
  studentPhone: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
