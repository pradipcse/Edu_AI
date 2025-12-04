import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect if not logged in
    }
  }, [user, navigate]);

  if (!user) return null; // Prevent flash before redirect

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        {/* Profile Icon */}
        <FaUserCircle className="text-indigo-600 text-7xl mx-auto mb-4" />

        {/* User Info */}
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h1>
        <p className="text-gray-500 mb-6">{user.email}</p>

        {/* User Details Card */}
        <div className="text-left space-y-3 border-t pt-4">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Name:</span>
            <span className="text-gray-600">{user.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="text-gray-600">{user.email}</span>
          </div>
          {user.role && (
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Role:</span>
              <span className="text-gray-600 capitalize">{user.role}</span>
            </div>
          )}
          {user.createdAt && (
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Joined:</span>
              <span className="text-gray-600">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Edit Profile Button (optional) */}
        <button
          onClick={() => alert("Edit feature coming soon!")}
          className="mt-6 px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
