import React from "react";
import { FaUserCircle } from "react-icons/fa";

const AdminHeader: React.FC = () => {
  return (
    <header className="flex items-center justify-between bg-gray-800 p-4 rounded-md">
      <h1 className="text-2xl font-semibold">Theatre Movies</h1>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400"
        />
        <FaUserCircle className="text-3xl text-red-500" />
      </div>
    </header>
  );
};

export default AdminHeader;
