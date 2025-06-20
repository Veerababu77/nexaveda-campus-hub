import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number;
  image: string;
  price: number;
  originalPrice: number;
}

const AllCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('https://nexaveda.duckdns.org/nexaveda/courses/');
        setCourses(res.data.data);
      } catch (error) {
        console.error('Failed to fetch all courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;

    try {
      const res = await axios.post(
        `https://nexaveda.duckdns.org/nexaveda/student_courses/${selectedCourse.id}/enroll/`,
        {
          full_name: fullName,
          email: email,
        }
      );
      alert('✅ Enrollment successful!');
      setSelectedCourse(null);
      setFullName('');
      setEmail('');
    } catch (err) {
      alert('❌ Enrollment failed!');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center p-10 text-gray-500">Loading all courses...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Courses</h1>
          <p className="text-gray-600">Explore and enroll in available courses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition-all"
            >
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                <p className="text-gray-600 mt-2 line-clamp-2">{course.description}</p>

                <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                  <span>{course.instructor}</span>
                  <span>{course.duration} days</span>
                </div>

                <div className="mt-4">
                  <p className="text-blue-600 font-bold text-lg">₹{course.price}</p>
                  {course.originalPrice && (
                    <p className="text-sm text-gray-500 line-through">₹{course.originalPrice}</p>
                  )}
                </div>

                <button
                  onClick={() => setSelectedCourse(course)}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white w-full text-center px-4 py-2 rounded-lg font-medium"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-16 text-gray-500">No courses found</div>
        )}
      </div>

      {/* ENROLLMENT MODAL */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Enroll in {selectedCourse.title}
            </h2>
            <form onSubmit={handleEnroll}>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                required
                className="w-full border p-2 rounded mb-4"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full border p-2 rounded mb-4"
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedCourse(null)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCourses;
