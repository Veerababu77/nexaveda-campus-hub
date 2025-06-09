
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Award, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Certificates = () => {
  const { certificates } = useAuth();
  const { toast } = useToast();

  const handleDownload = (certificateTitle: string) => {
    toast({
      title: "Certificate Downloaded!",
      description: `${certificateTitle} certificate has been downloaded successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Certificates</h1>
          <p className="text-gray-600">Your achievements and completed courses</p>
        </div>

        {/* Certificates Grid */}
        {certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((certificate) => (
              <div key={certificate.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Certificate Preview */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">
                  <div className="text-center">
                    <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Award size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Certificate of Completion</h3>
                    <p className="text-blue-100 text-sm">NEXAVEDA</p>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{certificate.courseTitle}</h4>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <span className="text-sm">Issued on {certificate.issueDate}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="text-sm">Score: {certificate.score}%</span>
                    </div>
                  </div>

                  {/* Score Badge */}
                  <div className="mb-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      certificate.score >= 90 
                        ? 'bg-green-100 text-green-800' 
                        : certificate.score >= 80 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {certificate.score >= 90 ? 'Outstanding' : certificate.score >= 80 ? 'Excellent' : 'Good'}
                    </div>
                  </div>

                  {/* Download Action */}
                  <button 
                    onClick={() => handleDownload(certificate.courseTitle)}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download size={16} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <Award size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No certificates yet</h3>
            <p className="text-gray-600 mb-6">Complete courses to earn certificates</p>
            <a 
              href="/courses"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Courses
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificates;
