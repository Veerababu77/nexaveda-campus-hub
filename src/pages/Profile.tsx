
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Award, BookOpen, Calendar, Edit2, Save, X } from 'lucide-react';

const Profile = () => {
  const { user, courses, certificates } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedEmail, setEditedEmail] = useState(user?.email || '');

  const handleSave = () => {
    // In a real app, this would update the user data
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(user?.name || '');
    setEditedEmail(user?.email || '');
    setIsEditing(false);
  };

  const totalCourses = courses.length;
  const completedCourses = courses.filter(course => course.progress === 100).length;
  const averageProgress = courses.reduce((acc, course) => acc + course.progress, 0) / courses.length || 0;
  const totalCertificates = certificates.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="text-2xl font-bold bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg px-4 py-2 text-white placeholder-blue-100"
                      placeholder="Full Name"
                    />
                    <input
                      type="email"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      className="block bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg px-4 py-2 text-white placeholder-blue-100"
                      placeholder="Email Address"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-1"
                      >
                        <Save size={16} />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-1"
                      >
                        <X size={16} />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ) : (
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
                )}
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

        {/* Account Information */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <User size={20} className="text-gray-400" />
                <span className="text-gray-900">{user?.name}</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail size={20} className="text-gray-400" />
                <span className="text-gray-900">{user?.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            {certificates.map((cert, index) => (
              <div key={cert.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="bg-green-100 rounded-full p-2 mr-4">
                  <Award size={20} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    Earned certificate for {cert.courseTitle}
                  </p>
                  <p className="text-sm text-gray-600">Score: {cert.score}% • {cert.issueDate}</p>
                </div>
              </div>
            ))}
            
            {courses.slice(0, 3).map((course) => (
              <div key={course.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 rounded-full p-2 mr-4">
                  <BookOpen size={20} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    Progress in {course.title}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{course.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
