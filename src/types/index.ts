// types.ts

// User info after login
export interface User {
  id: string;                 // This maps to "student_id" from the login API
  name: string;               // You can populate this later from profile API
  email: string;              // Optional for now if not returned
  phone?: string;
  avatar?: string;
}

// Course data for enrolled users
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

// All available courses (public view)
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

// Certificate data
export interface Certificate {
  id: string;
  courseTitle: string;
  issueDate: string;
  score: number;
  certificateUrl: string;
}

// Login credentials
export interface LoginCredentials {
  emailOrPhone: string;   // This maps to "username" field in your backend
  password: string;
}

// Enrollment payload
export interface EnrollmentData {
  courseId: string;
  studentName: string;
  studentPhone: string;
}

// Generic API response wrapper
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  status?: number;       // Optional: maps to HTTP status like 200, 400, etc.
}

// Login token structure
export interface AuthTokenData {
  access: string;
  refresh: string;
}
