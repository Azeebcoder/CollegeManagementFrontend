import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import the eye icons
import { FaUserCircle } from "react-icons/fa";


const backendUrl = import.meta.env.VITE_BACKEND_URL;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [city, setCity] = useState("");
  const [college, setCollege] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

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
        if (response.data.success) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.defaults.withCredentials = true;

    try {
      const response = await axios.post(
        `${backendUrl}/api/auth/register`,
        {
          email,
          username,
          password,
          rollNo,
          course,
          semester,
          city,
          college,
        },
        { withCredentials: true }
      );

      if (!response.data.success) {
        toast.error(response.data.message);
        setIsLoading(false);
        return;
      }
      navigate("/verify-otp");
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-tr from-indigo-200 via-purple-200 to-pink-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 pt-20 relative overflow-visible">
        {/* Profile Icon */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full shadow-md border border-indigo-200">
          <FaUserCircle className="text-indigo-600 text-6xl" />
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Sign Up</h2>
          <p className="text-gray-500 mt-2">
            Join us by filling in your details.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSignUp}>
          {/* Full Name */}
          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="YourEmail@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"} // Toggle password visibility
                id="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
              {/* Eye icon to toggle password visibility */}
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}{" "}
                {/* Show different icon based on visibility */}
              </span>
            </div>
          </div>

          {/* Roll No */}
          <div>
            <label
              htmlFor="rollNo"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Roll No
            </label>
            <input
              type="number"
              id="rollNo"
              placeholder="123456789"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {/* Course */}
          <div>
            <label
              htmlFor="course"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Course
            </label>
            <input
              type="text"
              id="course"
              placeholder="Your Course"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {/* Semester */}
          <div>
            <label
              htmlFor="semester"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Semester
            </label>
            <select
              id="semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none"
            >
              <option value="">Select Semester</option>
              {Array.from({ length: 8 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Semester {i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              placeholder="Your City"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {/* College */}
          <div>
            <label
              htmlFor="college"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              College
            </label>
            <input
              type="text"
              id="college"
              placeholder="Your College"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-xl font-semibold text-white transition duration-300 cursor-pointer ${
              isLoading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
