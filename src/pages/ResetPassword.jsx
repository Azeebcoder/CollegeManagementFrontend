import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("reset-email");
    if (!email) return toast.error("Email not found. Please retry forget password.");

    if (password !== confirmPassword) return toast.error("Passwords do not match.");

    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/api/auth/verify-reset-otp`, {
        email,
        otp,
        password,
        confirmPassword
      });

      if (res.data.success) {
        toast.success("Password reset successfully");
        localStorage.removeItem("reset-email");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-200 via-indigo-100 to-purple-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 pt-20 relative overflow-visible">
        {/* Lock Icon */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-full shadow-md border border-indigo-200">
          <FaLock className="text-purple-500 text-5xl" />
        </div>

        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Reset Password</h2>
          <p className="text-gray-500 mt-2">Enter the OTP sent to your email and set a new password</p>
        </div>

        <form className="space-y-6" onSubmit={handleReset}>
          <div>
            <label htmlFor="otp" className="block mb-1 text-sm font-medium text-gray-700">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Enter OTP"
              autoComplete="one-time-code"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="New Password"
              autoComplete="new-password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              autoComplete="new-password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-xl font-semibold text-white transition duration-300 cursor-pointer ${
              loading ? 'bg-purple-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
