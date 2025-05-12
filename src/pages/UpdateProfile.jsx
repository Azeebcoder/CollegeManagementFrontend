import React, { useState, useEffect } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    course: "",
    semester: "",
    city: "",
    college: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch current user data on mount (replace with your actual API route)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/user/info`, {
          withCredentials: true,
        });
        setFormData(res.data);
      } catch (err) {
        setMessage("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.put(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { withCredentials: true }
      );
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 flex items-center justify-center bg-gradient-to-tr from-indigo-200 via-purple-200 to-pink-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 pt-15 relative overflow-visible">
        {/* Profile Icon */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-full shadow-md border border-indigo-200">
          <FaUserCircle className="text-indigo-600 text-6xl" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Update Profile
        </h2>

        {message && (
          <div className="mb-4 text-sm text-center text-red-500">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">
          {[
            { name: "username", label: "Name" },
            { name: "course", label: "Course" },
            { name: "semester", label: "Semester" },
            { name: "city", label: "City" },
            { name: "college", label: "College" },
          ].map(({ name, label, type = "text" }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
