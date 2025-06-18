
import { EnrollmentData, ApiResponse } from '../types';

export const enrollmentService = {
  // Replace with actual API call
  enrollInCourse: async (enrollmentData: EnrollmentData): Promise<ApiResponse<{ enrollmentId: string }>> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Enrollment data:', enrollmentData);
      
      // Mock enrollment success
      return {
        data: { enrollmentId: `enroll_${Date.now()}` },
        success: true,
        message: 'Enrollment request submitted successfully'
      };
    } catch (error) {
      return {
        data: null as any,
        success: false,
        message: 'Failed to submit enrollment request'
      };
    }
  }
};
