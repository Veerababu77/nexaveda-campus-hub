
import { Certificate, ApiResponse } from '../types';

// Mock data - replace with real API calls
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

export const certificateService = {
  // Replace with actual API call
  getUserCertificates: async (userId: string): Promise<ApiResponse<Certificate[]>> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        data: mockCertificates,
        success: true
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        message: 'Failed to fetch certificates'
      };
    }
  },

  // Replace with actual API call
  downloadCertificate: async (certificateId: string): Promise<ApiResponse<{ downloadUrl: string }>> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        data: { downloadUrl: `#certificate_${certificateId}` },
        success: true,
        message: 'Certificate download prepared'
      };
    } catch (error) {
      return {
        data: null as any,
        success: false,
        message: 'Failed to download certificate'
      };
    }
  }
};
