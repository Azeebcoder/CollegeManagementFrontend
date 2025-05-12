import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const sendOtp = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/auth/send-email`);
        if (!response.data.success) {
          toast.error(response.data.message);
        } else {
          toast.success('OTP has been sent to your email.');
        }
      } catch (error) {
        console.error('Error sending OTP:', error);
      }
    };
    sendOtp();
  }, []);

  const handleOtpVerify = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.post(
        `${backendUrl}/api/auth/verify-otp`,
        { otp },
        { withCredentials: true }
      );

      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }

      toast.success('OTP Verified Successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Error verifying OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-200 via-purple-200 to-pink-200 px-4">
      <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10 relative">

        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Verify OTP</h2>

        <form onSubmit={(e) => e.preventDefault()} className="grid gap-4">
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
            Enter the OTP sent to your email
          </label>
          <input
            id="otp"
            type="text"
            maxLength={6}
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="button"
            onClick={handleOtpVerify}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
