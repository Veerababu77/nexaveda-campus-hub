
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Clock, User, TrendingUp } from 'lucide-react';

const Courses = () => {
  const { courses } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Link 
              key={course.id} 
              to={`/course/${course.id}`}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg shadow-md">
                  <span className="text-sm font-medium text-blue-600">{course.progress}%</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <User size={16} className="mr-1" />
                  <span className="mr-4">{course.instructor}</span>
                  <Clock size={16} className="mr-1" />
                  <span>{course.duration}</span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-500">{course.progress}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Course Stats */}
                <div className="flex justify-between items-center text-sm mb-4">
                  <div className="flex items-center text-gray-500">
                    <TrendingUp size={16} className="mr-1" />
                    <span>{course.topics.length} Topics</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <span>{course.examinations.length} Exams</span>
                  </div>
                </div>

                {/* View Button */}
                <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-center font-medium hover:bg-blue-100 transition-colors">
                  View
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {courses.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <TrendingUp size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No courses yet</h3>
            <p className="text-gray-600">Start your learning journey by enrolling in courses</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
