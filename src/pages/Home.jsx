import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/auth/is-authentacited`,
          { withCredentials: true }
        );
        if (!response.data.success) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.get(`${backendUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="text-center bg-white shadow-xl rounded-2xl p-10 max-w-md w-full animate-fade-in mb-4">
        <div className="flex justify-center mb-4 text-indigo-600">
          <Clock size={48} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Coming Soon 🚧
        </h1>
        <p className="text-gray-600 text-md mb-6">
          We're working hard to bring this feature to you. Stay tuned!
        </p>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl transition"
          >
            Logout
          </button>
          <button
            onClick={() => navigate("/users")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition"
          >
            Show All Users
          </button>
          <button
            onClick={() => navigate("/update-profile")}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl transition"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
