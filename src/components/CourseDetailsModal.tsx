
import React from 'react';
import { X, Star, Users, Clock, Award, BookOpen } from 'lucide-react';

interface AllCourse {
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

interface CourseDetailsModalProps {
  course: AllCourse;
  isOpen: boolean;
  onClose: () => void;
  onEnroll: (course: AllCourse) => void;
}

const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({ course, isOpen, onClose, onEnroll }) => {
  if (!isOpen) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEnrollClick = () => {
    onEnroll(course);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <X size={24} className="text-gray-600" />
          </button>
          
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-64 object-cover rounded-t-xl"
          />
        </div>
        
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="text-yellow-500 mr-1" size={18} />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users size={18} className="mr-1" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={18} className="mr-1" />
                  <span>{course.duration}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(course.difficulty)}`}>
                  {course.difficulty}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {course.category}
                </span>
                <span className="text-gray-600">by {course.instructor}</span>
              </div>
            </div>
            
            <div className="text-right ml-8">
              <div className="mb-4">
                <div className="text-3xl font-bold text-green-600">${course.price}</div>
                {course.originalPrice && (
                  <div className="text-lg text-gray-500 line-through">${course.originalPrice}</div>
                )}
              </div>
              
              <button 
                onClick={handleEnrollClick}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full"
              >
                Enroll Now
              </button>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <BookOpen className="mr-2" size={20} />
              What You'll Learn
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course.topics.map((topic, index) => (
                <div key={index} className="flex items-center">
                  <Award className="text-green-500 mr-2 flex-shrink-0" size={16} />
                  <span className="text-gray-700">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsModal;
