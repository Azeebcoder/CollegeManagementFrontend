import React from "react";
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UserCard = ({ user,onDelete }) => {
  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      onDelete(user._id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 transition hover:shadow-lg space-y-4 relative">
      
      {/* Delete Button */}
      {user.role==='User' ?
        <button
        onClick={handleDeleteClick}
        className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm font-medium"
      >
        🗑 Delete
      </button>
      :<></>}

      {/* Avatar and Basic Info */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center rounded-full text-xl font-bold uppercase">
          {user.username?.charAt(0) || "U"}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{user.username}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${user.isVerified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
            {user.isVerified ? "Verified" : "Not Verified"}
          </span>
        </div>
      </div>

      {/* User Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
        <p><span className="font-medium">Role:</span> {user.role}</p>
        <p><span className="font-medium">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
        <p><span className="font-medium">College:</span> {user.college}</p>
        <p><span className="font-medium">Course:</span> {user.course}</p>
        <p><span className="font-medium">Semester:</span> {user.semester}</p>
        <p><span className="font-medium">Roll No:</span> {user.rollNo}</p>
        <p><span className="font-medium">City:</span> {user.city}</p>
        <p><span className="font-medium">Last Updated:</span> {new Date(user.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default UserCard;
