import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import { toast } from 'react-toastify';


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [city, setCity] = useState("");
  const [college, setCollege] = useState("");

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
        {withCredentials:true}
      );

      if (!response.data.success) {
        toast.error(response.data.message)
        return;
      }
      navigate("/verify-otp");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during signup.")
    }
  };

  
  return (
    <div className="bg-cyan-600 w-full h-screen flex justify-center items-center">
      <form
        className="custom-scroll bg-white p-8 rounded-xl shadow-lg w-full max-w-md overflow-y-auto max-h-[90vh]"
        onSubmit={handleSignUp}
      >
        <h2 className="text-3xl font-bold text-center text-cyan-700 mb-6">
          Sign Up
        </h2>

        <div className="space-y-4">
              <Input
                label="Full Name"
                value={username}
                onChange={setUsername}
                placeholder="John Doe"
              />
              <Input
                label="Email"
                value={email}
                onChange={setEmail}
                type="email"
                placeholder="you@example.com"
              />
              <Input
                label="Password"
                value={password}
                onChange={setPassword}
                type="password"
                placeholder="••••••••"
              />
              <Input
                label="Roll No"
                value={rollNo}
                onChange={setRollNo}
                type="number"
              />
              <Input label="Course" value={course} onChange={setCourse} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Semester
                </label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border"
                >
                  <option value="">Select Semester</option>
                  {Array.from({ length: 8 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Semester {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <Input label="City" value={city} onChange={setCity} />
              <Input label="College" value={college} onChange={setCollege} />

              <button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg transition"
              >
                Create Account
              </button>
            </div>

        <p className="text-sm text-center text-gray-600 mt-5">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-cyan-700 hover:underline font-medium"
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

// Reusable input component
const Input = ({ label, value, onChange, type = "text", placeholder = "" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-lg border"
    />
  </div>
);

export default SignUp;
