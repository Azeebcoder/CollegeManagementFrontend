import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/admin/get-one-user/${id}`, {
          withCredentials: true,
        });
        setUser(res.data.data);
      } catch (err) {
        console.error("Failed to load user", err);
      }
    };

    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${backendUrl}/api/admin/delete-user/${id}`, {
        withCredentials: true,
      });
      alert("User deleted successfully!");
      navigate('/'); // Adjust the route as needed
    } catch (err) {
      console.error("Failed to delete user", err);
      alert("Error deleting user");
    }
  };

  if (!user) return <div className="text-center mt-10">Loading user details...</div>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4">{user.name || user.email}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>

      <button
        onClick={handleDelete}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
      >
        Delete User
      </button>
    </div>
  );
};

export default UserDetails;
