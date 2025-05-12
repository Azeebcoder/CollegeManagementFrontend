import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaUserCircle } from 'react-icons/fa';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/auth/is-authentacited`, {
          withCredentials: true,
        });
        if (response.data.success) navigate('/');
      } catch (error) {
        console.log('Not authenticated');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      const { data } = response;

      if (!data.success) {
        toast.error(data.message || 'Login failed');
        setLoading(false);
        return;
      }

      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error('Login error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-200 via-purple-200 to-pink-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 pt-20 relative overflow-visible">
        {/* Profile Icon */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full shadow-md border border-indigo-200">
          <FaUserCircle className="text-indigo-600 text-6xl" />
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Log In</h2>
          <p className="text-gray-500 mt-2">Good to see you again! Let's log you in.</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              aria-label="Email"
              placeholder="YourEmail@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Extras */}
          <div className="flex justify-between items-center text-sm text-gray-60">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
                disabled={loading}
                checked={showPassword}
              />
              Show Password
            </label>
            <Link to="/forget-password" className="text-indigo-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-xl font-semibold text-white transition duration-300 cursor-pointer ${
              loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-sm mt-6 text-gray-600">
          Don’t have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
