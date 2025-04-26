import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Login = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/auth/is-authentacited`,{
          withCredentials: true,
        });
        if (response.data.success) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuth();
  }
  , [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${backendUrl}/api/auth/login`,{
        email,
        password,
      },{
        withCredentials: true,
      })
      const { data } = response;
      if (!data.success) {
        alert(data.message);
        return;
      }
      alert('Login successful!');
      navigate("/");


    }
    catch (err) {
      console.error(err);
      alert('An error occurred during login.');
    }



  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Welcome Back</h2>
        
        <form className="space-y-5" onSubmit={(e)=>{handleLogin(e)}}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              required
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" onChange={(e)=>setShowPassword(!showPassword)} />
              Show Password
            </label>
            <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Log In
          </button>
        </form>
        
        <p className="text-sm text-center mt-6 text-gray-600">
          Don’t have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
