import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Award, Users, TrendingUp, Star, Clock, User } from 'lucide-react';
import CourseDetailsModal from '../components/CourseDetailsModal';
import EnrollmentModal from '../components/EnrollmentModal';

const Home = () => {
  const { user, courses, certificates, allCourses } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);
  const [enrollmentCourse, setEnrollmentCourse] = useState(null);

  const [metrics, setMetrics] = useState({
    student_name: '',
    enrolled_courses: 0,
    certificates: 0,
    hours_learned: 0,
    active_students: 0
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error('No token found in localStorage');
          return;
        }

        const res = await axios.get('https://13.49.65.169/nexaveda/home_metrices/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMetrics(res.data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics();
  }, []);

  const stats = [
    { label: 'Enrolled Courses', value: metrics.enrolled_courses, icon: BookOpen, color: 'bg-blue-500' },
    { label: 'Certificates Earned', value: metrics.certificates, icon: Award, color: 'bg-green-500' },
    { label: 'Hours Learned', value: metrics.hours_learned, icon: TrendingUp, color: 'bg-purple-500' },
    { label: 'Active Students', value: metrics.active_students, icon: Users, color: 'bg-orange-500' }
  ];

  const recentCourses = courses.slice(0, 3);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleEnrollClick = (course) => {
    setEnrollmentCourse(course);
    setIsEnrollmentModalOpen(true);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const displayedCourses = showAllCourses ? allCourses : allCourses.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome back, {user?.name}!</h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">Continue your learning journey with NEXAVEDA</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              View My Courses
            </Link>
            <Link to="/certificates" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              My Certificates
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Learning */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Continue Learning</h2>
            <Link to="/courses" className="text-blue-600 hover:text-blue-700 font-medium">View All Courses →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentCourses.map((course) => (
              <Link key={course.id} to={`/course/${course.id}`} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">by {course.instructor}</span>
                    <span className="text-sm font-medium text-blue-600">{course.progress}% Complete</span>
                  </div>
                  <div className="mt-3">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Courses We Offer */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">All Courses We Offer</h2>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">{allCourses.length} courses available</span>
              {!showAllCourses && allCourses.length > 6 && (
                <button onClick={() => setShowAllCourses(true)} className="text-blue-600 hover:text-blue-700 font-medium">
                  View All Courses →
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 flex-1">{course.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${getDifficultyColor(course.difficulty)}`}>
                      {course.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <User size={16} className="mr-1" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={16} className="mr-1" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="text-yellow-500 mr-1" size={16} />
                      <span className="text-sm font-medium">{course.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({course.students})</span>
                    </div>
                    <span className="text-sm text-blue-600 font-medium">{course.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-green-600">₹{course.price}</span>
                      {course.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">₹{course.originalPrice}</span>
                      )}
                    </div>
                    <button
                      onClick={() => handleEnrollClick(course)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showAllCourses && (
            <div className="text-center mt-8">
              <button onClick={() => setShowAllCourses(false)} className="text-blue-600 hover:text-blue-700 font-medium">
                ← Show Less
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCourse(null);
          }}
          onEnroll={handleEnrollClick}
        />
      )}

      {/* Enrollment Modal */}
      {enrollmentCourse && (
        <EnrollmentModal
          course={enrollmentCourse}
          isOpen={isEnrollmentModalOpen}
          onClose={() => {
            setIsEnrollmentModalOpen(false);
            setEnrollmentCourse(null);
          }}
        />
      )}
    </div>
  );
};

export default Home;
