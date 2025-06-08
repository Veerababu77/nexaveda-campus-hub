
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Award, Download, Calendar, Star } from 'lucide-react';

const Certificates = () => {
  const { certificates } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                      <Calendar size={16} className="mr-2" />
                      <span className="text-sm">Issued on {certificate.issueDate}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Star size={16} className="mr-2" />
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

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                      <Download size={16} />
                      <span>Download</span>
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      View
                    </button>
                  </div>
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

        {/* Achievement Summary */}
        {certificates.length > 0 && (
          <div className="mt-12 bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievement Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Award size={24} className="text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{certificates.length}</p>
                <p className="text-gray-600">Certificates Earned</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Star size={24} className="text-green-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {(certificates.reduce((acc, cert) => acc + cert.score, 0) / certificates.length).toFixed(1)}%
                </p>
                <p className="text-gray-600">Average Score</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Calendar size={24} className="text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {new Date().getFullYear()}
                </p>
                <p className="text-gray-600">Latest Year</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificates;
