import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/auth/is-authentacited`,
          {
            withCredentials: true,
          }
        );
        if (!response.data.success) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        if (error.response?.status === 401) {
          // If server returns 401 Unauthorized, navigate to login
          navigate("/login");
        }
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="text-center bg-white shadow-xl rounded-2xl p-10 max-w-md w-full animate-fade-in">
        <div className="flex justify-center mb-4 text-indigo-600">
          <Clock size={48} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Coming Soon 🚧</h1>
        <p className="text-gray-600 text-md">
          We're working hard to bring this feature to you. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default Home;
