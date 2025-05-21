import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UserCard from "../components/UserCard.jsx";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ShowAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [forbidden, setForbidden] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      
      fetchUsers();
    }, []);
    
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/api/admin/get-all-users`, {
          withCredentials: true,
        });

        if (!response.data.success) {
          setForbidden(true);
          toast.error(response.data.message || "Forbidden");
        } else {
          setUsers(response.data.users);
          setForbidden(false);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        if (error.response?.status === 403) {
          setForbidden(true);
          toast.error("❌ Forbidden: Admins only");
        } else {
          toast.error("Error fetching users");
        }
      } finally {
        setLoading(false);
      }
    };
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${backendUrl}/api/admin/delete-user/${userId}`, {
        withCredentials: true,
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      alert("User deleted successfully!");
    } catch (err) {
      console.error("Failed to delete user", err);
      alert("Error deleting user");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">👥 All Users</h2>

      {loading && (
        <p className="text-blue-500 font-medium mb-4">Loading users...</p>
      )}

      {forbidden && !loading && (
        <p className="text-red-500 font-semibold">
          ❌ Access Denied: You are not authorized to view this page.
        </p>
      )}

      {!loading && users.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {users.map((user) => (
            <UserCard
              key={user._id} user={user} onDelete={handleDeleteUser}
    >           
            </UserCard>
          ))}
        </div>
      )}

      {!loading && users.length === 0 && !forbidden && (
        <p className="text-gray-600 dark:text-gray-300">No users found.</p>
      )}
    </div>
  );
};

export default ShowAllUsers;
