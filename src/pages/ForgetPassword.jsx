import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      return toast.error("Please enter a valid email");
    }

    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/api/auth/reset-otp-send`, { email });
      if (res.data.success) {
        toast.success("OTP sent to your email");
        localStorage.setItem("reset-email", email);
        navigate("/reset-password");
      } else {
        toast.error(res.data.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-200 via-indigo-100 to-purple-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 pt-20 relative overflow-visible">
        {/* Envelope Icon */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-full shadow-md border border-indigo-200">
          <FaEnvelope className="text-blue-600 text-5xl" />
        </div>

        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Forgot Password</h2>
          <p className="text-gray-500 mt-2">We’ll send you an OTP to reset your password</p>
        </div>

        <form className="space-y-6" onSubmit={handleSendOtp}>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              autoComplete='email'
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-xl font-semibold text-white transition duration-300 cursor-pointer ${
              loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
