import { Course, ApiResponse } from '../types';
import { authFetch } from '../utils/authFetch';

const BASE_URL = 'https://nexaveda.duckdns.org/nexaveda';

export const courseService = {
  getUserCourses: async (): Promise<ApiResponse<Course[]>> => {
    try {
      const res = await authFetch(`${BASE_URL}/student_courses/`);
      const result = await res.json();

      const courses: Course[] = result.courses.map((c: any) => ({
        id: c.id,
        title: c.title,
        description: c.description,
        instructor: c.instructor,
        duration: `${c.duration} days`,
        progress: c.progress || 0,
        image: c.image,
        topics: c.topics || [],
        rating: c.rating || 5.0,
        students: c.students_count || 0,
        category: c.category || '',
        difficulty: c.priority || 'Beginner',
        price: c.price_after || 0,
        originalPrice: c.price_before || 0,
        attendance: Array.isArray(c.attendance)
          ? c.attendance.map((a: any) => ({
              date: a.date,
              topic: a.topic,
              status: a.status?.toLowerCase(),
            }))
          : [],
        examinations: Array.isArray(c.examinations)
          ? c.examinations.map((e: any) => ({
              title: e.title,
              date: e.date,
              score: e.score,
              maxScore: e.maxScore,
              remarks: e.remarks,
            }))
          : [],
      }));

      return { data: courses, success: true };
    } catch (error) {
      return { data: [], success: false, message: 'Failed to fetch user courses' };
    }
  },

  getAllCourses: async (): Promise<ApiResponse<Course[]>> => {
    try {
      const res = await authFetch(`${BASE_URL}/courses/`);
      const result = await res.json();

      const courses: Course[] = result.courses.map((c: any) => ({
        id: c.id,
        title: c.title,
        description: c.description,
        instructor: c.instructor,
        duration: `${c.duration} days`,
        image: c.image,
        rating: c.rating || 5.0,
        students: c.students_count || 0,
        category: c.category || '',
        difficulty: c.priority || 'Beginner',
        price: c.price_after || 0,
        originalPrice: c.price_before || 0,
      }));

      return { data: courses, success: true };
    } catch (error) {
      return { data: [], success: false, message: 'Failed to fetch all courses' };
    }
  },

  getStudentCourseById: async (courseId: string): Promise<ApiResponse<Course | null>> => {
    try {
      const response = await authFetch(`${BASE_URL}/student_courses/${courseId}/`);
      const result = await response.json();
      const c = result.data;

      const course: Course = {
        id: c.id,
        title: c.title,
        description: c.description,
        instructor: c.instructor,
        duration: `${c.duration} days`,
        image: c.image,
        progress: c.progress || 0,
        rating: c.rating || 5.0,
        students: c.students_count || 0,
        category: c.category || '',
        difficulty: c.priority || 'Beginner',
        price: c.price_after || 0,
        originalPrice: c.price_before || 0,
        topics: c.topics || [],
        examinations: Array.isArray(c.examinations)
          ? c.examinations.map((e: any) => ({
              title: e.title,
              date: e.date,
              score: e.score,
              maxScore: e.maxScore,
              remarks: e.remarks,
            }))
          : [],
        attendance: Array.isArray(c.attendance)
          ? c.attendance.map((a: any) => ({
              date: a.date,
              topic: a.topic,
              status: a.status?.toLowerCase(),
            }))
          : [],
      };

      return { data: course, success: true };
    } catch (error) {
      return { data: null, success: false, message: 'Failed to fetch course details' };
    }
  },
};
