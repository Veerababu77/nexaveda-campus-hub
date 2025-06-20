import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Award,
  BookOpen,
  Calendar,
  Edit2,
  Save,
  X,
  Phone,
  MapPin,
  Heart
} from 'lucide-react';

const Profile = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<any>({});
  const accessToken = localStorage.getItem("accessToken"); // ✅ Fixed key

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!accessToken) {
        console.error("No access token. Please login to view your profile.");
        return;
      }

      try {
        const response = await fetch("https://13.49.65.169/nexaveda/student_profile/", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        const result = await response.json();
        if (result.success) {
          setProfileData(result.data);
          setEditedData({
            name: result.data.name,
            email: result.data.email,
            phone_number: result.data.phone_number,
            parent_phone_number: result.data.parent_phone_number,
            address: result.data.address,
            date_of_birth: result.data.date_of_birth,
            emergency_contact: result.data.emergency_contact,
            emergency_contact_phone: result.data.emergency_contact_phone
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [accessToken]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData(prev => ({ ...prev, [name]: value }));
  };

  // Save updated data
  const handleSave = async () => {
    if (!accessToken) {
      console.error("No access token");
      return;
    }

    try {
      const response = await fetch("https://13.49.65.169/nexaveda/student_profile/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(editedData)
      });

      if (!response.ok) throw new Error("Update failed");
      const result = await response.json();
      setIsEditing(false);
      setProfileData(prev => ({ ...prev, ...editedData }));
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ ...profileData });
  };

  if (!profileData) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-6">
          <img
            src={profileData.profile_pic_url}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />
          <div>
            <h1 className="text-2xl font-bold">{profileData.name}</h1>
            <p className="text-gray-500">{profileData.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <StatBlock label="Total Courses" value={profileData.total_courses} icon={BookOpen} bg="blue" />
          <StatBlock label="Completed" value={profileData.total_completed_courses} icon={Award} bg="green" />
          <StatBlock label="Attendance" value={`${profileData.total_attendance}%`} icon={User} bg="purple" />
          <StatBlock label="Certificates" value={profileData.total_cetificates} icon={Calendar} bg="orange" />
        </div>

        {/* Editable Info */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <Edit2 size={16} className="mr-2" /> Edit
              </button>
            )}
          </div>

          {isEditing ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "name", label: "Full Name", icon: User },
                  { name: "email", label: "Email", icon: Mail },
                  { name: "phone_number", label: "Phone Number", icon: Phone },
                  { name: "parent_phone_number", label: "Parent Phone", icon: Phone },
                  { name: "date_of_birth", label: "Date of Birth", icon: Calendar, type: "date" },
                  { name: "emergency_contact", label: "Emergency Contact", icon: Heart },
                  { name: "emergency_contact_phone", label: "Emergency Phone", icon: Phone },
                  { name: "address", label: "Address", icon: MapPin }
                ].map(field => (
                  <div key={field.name}>
                    <label className="text-sm font-medium text-gray-700">{field.label}</label>
                    <input
                      type={field.type || "text"}
                      name={field.name}
                      value={editedData[field.name] || ""}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                ))}
              </div>

              <div className="flex space-x-4 mt-4">
                <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center">
                  <Save size={16} className="mr-2" /> Save
                </button>
                <button onClick={handleCancel} className="bg-gray-600 text-white px-4 py-2 rounded-md flex items-center">
                  <X size={16} className="mr-2" /> Cancel
                </button>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow label="Phone Number" value={profileData.phone_number} icon={Phone} />
              <InfoRow label="Parent Phone" value={profileData.parent_phone_number} icon={Phone} />
              <InfoRow label="Date of Birth" value={profileData.date_of_birth} icon={Calendar} />
              <InfoRow label="Emergency Contact" value={profileData.emergency_contact} icon={Heart} />
              <InfoRow label="Emergency Phone" value={profileData.emergency_contact_phone} icon={Phone} />
              <InfoRow label="Address" value={profileData.address} icon={MapPin} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

// Reusable stat block
const StatBlock = ({ label, value, icon: Icon, bg }: any) => {
  const colors: any = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600"
  };

  return (
    <div>
      <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${colors[bg]}`}>
        <Icon size={18} />
      </div>
      <p className="text-lg font-bold">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
};

// Reusable info row
const InfoRow = ({ label, value, icon: Icon }: any) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="flex items-center mt-1 space-x-2 bg-gray-100 p-2 rounded-md">
      <Icon size={16} className="text-gray-500" />
      <span>{value}</span>
    </div>
  </div>
);
