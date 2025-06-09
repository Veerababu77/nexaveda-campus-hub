
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Award, BookOpen, Calendar, Edit2, Save, X, Phone, MapPin, GraduationCap, Heart } from 'lucide-react';

const Profile = () => {
  const { user, courses, certificates } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    parentPhone: '+1 (555) 987-6543',
    address: '123 Main Street, City, State 12345',
    dateOfBirth: '1995-05-15',
    emergencyContact: 'Jane Doe',
    emergencyPhone: '+1 (555) 456-7890'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // In a real app, this would update the user data
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+1 (555) 123-4567',
      parentPhone: '+1 (555) 987-6543',
      address: '123 Main Street, City, State 12345',
      dateOfBirth: '1995-05-15',
      emergencyContact: 'Jane Doe',
      emergencyPhone: '+1 (555) 456-7890'
    });
    setIsEditing(false);
  };

  const totalCourses = courses.length;
  const completedCourses = courses.filter(course => course.progress === 100).length;
  const averageProgress = courses.reduce((acc, course) => acc + course.progress, 0) / courses.length || 0;
  const totalCertificates = certificates.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-12">
            <div className="flex items-center">
              <div className="bg-white rounded-full p-1">
                <img
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=2563eb&color=fff&size=128`}
                  alt={user?.name}
                  className="w-24 h-24 rounded-full"
                />
              </div>
              <div className="ml-6 text-white">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
                  <p className="text-blue-100 mb-4">{user?.email}</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg hover:bg-opacity-30 transition-colors flex items-center space-x-2"
                  >
                    <Edit2 size={16} />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <BookOpen size={20} className="text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{totalCourses}</p>
              <p className="text-gray-600 text-sm">Total Courses</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <Award size={20} className="text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{completedCourses}</p>
              <p className="text-gray-600 text-sm">Completed</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <User size={20} className="text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{averageProgress.toFixed(0)}%</p>
              <p className="text-gray-600 text-sm">Avg Progress</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <Calendar size={20} className="text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{totalCertificates}</p>
              <p className="text-gray-600 text-sm">Certificates</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Edit2 size={16} />
                <span>Edit</span>
              </button>
            )}
          </div>
          
          {isEditing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editedData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={editedData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editedData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parent Phone Number</label>
                  <input
                    type="tel"
                    name="parentPhone"
                    value={editedData.parentPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={editedData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={editedData.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Phone</label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={editedData.emergencyPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={editedData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Save size={16} />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                >
                  <X size={16} />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <User size={20} className="text-gray-400" />
                  <span className="text-gray-900">{editedData.name}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail size={20} className="text-gray-400" />
                  <span className="text-gray-900">{editedData.email}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Phone size={20} className="text-gray-400" />
                  <span className="text-gray-900">{editedData.phone}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Parent Phone Number</label>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Phone size={20} className="text-gray-400" />
                  <span className="text-gray-900">{editedData.parentPhone}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar size={20} className="text-gray-400" />
                  <span className="text-gray-900">{editedData.dateOfBirth}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Heart size={20} className="text-gray-400" />
                  <span className="text-gray-900">{editedData.emergencyContact}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Phone</label>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Phone size={20} className="text-gray-400" />
                  <span className="text-gray-900">{editedData.emergencyPhone}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin size={20} className="text-gray-400" />
                  <span className="text-gray-900">{editedData.address}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
