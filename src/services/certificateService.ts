import { Certificate, ApiResponse } from '../types';

export const certificateService = {
  getUserCertificates: async (): Promise<ApiResponse<Certificate[]>> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return {
        data: [],
        success: false,
        message: 'Access token not found. Please log in.'
      };
    }

    try {
      const response = await fetch('https://nexaveda.duckdns.org/nexaveda/student_certificate/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const data: Certificate[] = result.data.map((item: any) => ({
          id: item.id,
          certificate_name: item.certificate_name,
          issued_date: item.issued_date,
          score: parseFloat(item.score),
          grade: item.grade,
          certificate_url: item.certificate_url
        }));

        return {
          data,
          success: true
        };
      } else {
        return {
          data: [],
          success: false,
          message: result.message || 'Failed to fetch certificates'
        };
      }
    } catch (err) {
      return {
        data: [],
        success: false,
        message: 'Error connecting to the server'
      };
    }
  },

  downloadCertificate: async (certificateUrl: string): Promise<ApiResponse<{ downloadUrl: string }>> => {
    try {
      // You could prepare for server-verified signed download links if needed
      return {
        data: { downloadUrl: certificateUrl },
        success: true,
        message: 'Certificate ready to download'
      };
    } catch (err) {
      return {
        data: null as any,
        success: false,
        message: 'Download failed'
      };
    }
  }
};
