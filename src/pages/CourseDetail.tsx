import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Clock, User, CheckCircle, XCircle, Calendar, Award, BookOpen } from 'lucide-react';
import { authFetch } from '../utils/authFetch';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId) return;

    const fetchCourseDetail = async () => {
      try {
        setLoading(true);
        const res = await authFetch(`https://nexaveda.duckdns.org/nexaveda/student_courses/${courseId}/`);
        
        if (res.ok) {
          const result = await res.json();
          setCourse(result.data);
        } else {
          setError('Unauthorized or course not found');
        }
      } catch (err) {
        console.error(err);
        setError('Something went wrong while fetching course data');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [courseId]);

  if (loading) {
    return <div className="text-center p-10 text-gray-500">Loading course details...</div>;
  }

  if (error || !course) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Course Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-gray-600 mb-6">{course.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <User size={20} className="mr-2" />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={20} className="mr-2" />
                  <span>{course.duration} days</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BookOpen size={20} className="mr-2" />
                  <span>{course.topics.length} Topics</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Course Progress</span>
                  <span className="text-sm text-gray-500">{course.progress}%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              {course.progress === 100 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Award className="text-green-600 mr-2" size={20} />
                    <span className="text-green-800 font-medium">Course Completed!</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {[
                { id: 'overview', label: 'Overview', icon: BookOpen },
                { id: 'topics', label: 'Topics', icon: BookOpen },
                { id: 'examinations', label: 'Examinations', icon: Award },
                { id: 'attendance', label: 'Attendance', icon: Calendar }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Average Score</h3>
                  <p className="text-3xl font-bold text-blue-600">{course.avg_marks}%</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Attendance Rate</h3>
                  <p className="text-3xl font-bold text-green-600">{course.attendence_percentage}%</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Completion</h3>
                  <p className="text-3xl font-bold text-purple-600">{course.progress}%</p>
                </div>
              </div>
            )}

            {/* Topics */}
            {activeTab === 'topics' && (
              <div className="space-y-4">
                {course.topics.map((topic: string, index: number) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-medium text-sm">{index + 1}</span>
                    </div>
                    <span className="text-gray-900 font-medium">{topic}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Examinations */}
            {activeTab === 'examinations' && (
              <div className="space-y-4">
                {course.exminations.map((exam: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-medium text-gray-900">{exam[0]}</h4>
                      <span className="text-sm text-gray-500">{exam[1]}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-gray-900 mr-2">{exam[2]}</span>
                        <span className="text-gray-500">/ {exam[3]}</span>
                      </div>
                      <div className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {exam[4]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Attendance */}
            {activeTab === 'attendance' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {course.attendance.map((row: any[], index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row[0]}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row[1]}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center">
                            {row[2] === 'Present' ? (
                              <>
                                <CheckCircle className="text-green-500 mr-2" size={18} />
                                <span className="text-green-700 font-medium">{row[2]}</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="text-red-500 mr-2" size={18} />
                                <span className="text-red-700 font-medium">{row[2]}</span>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
