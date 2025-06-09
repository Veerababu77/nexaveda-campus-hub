
import React, { useState } from 'react';
import { X, User, Phone, BookOpen, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface EnrollmentModalProps {
  course: AllCourse;
  isOpen: boolean;
  onClose: () => void;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ course, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    courseName: course.title
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Show success message
    setShowSuccess(true);
    
    // Show toast notification
    toast({
      title: "Enrollment Request Submitted!",
      description: "Our admin will contact you soon to complete your enrollment.",
    });

    // Auto close after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      setFormData({ name: '', phone: '', courseName: course.title });
    }, 3000);
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full p-8 text-center">
          <div className="mb-4">
            <CheckCircle className="mx-auto text-green-500" size={64} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for your interest in <strong>{course.title}</strong>. 
            Our admin will contact you soon to complete your enrollment process.
          </p>
          <div className="text-sm text-gray-500">
            This window will close automatically...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Enroll in Course</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                <User size={16} className="inline mr-1" />
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                <Phone size={16} className="inline mr-1" />
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label htmlFor="courseName" className="block text-sm font-medium text-gray-700 mb-2">
                <BookOpen size={16} className="inline mr-1" />
                Course Name
              </label>
              <input
                type="text"
                id="courseName"
                name="courseName"
                value={formData.courseName}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Course Details:</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Price:</strong> ${course.price}</p>
                <p><strong>Duration:</strong> {course.duration}</p>
                <p><strong>Instructor:</strong> {course.instructor}</p>
                <p><strong>Difficulty:</strong> {course.difficulty}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Send Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentModal;
