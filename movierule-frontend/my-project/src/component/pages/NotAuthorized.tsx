import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const NotAuthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
      {/* Icon */}
      <FaLock className="text-red-600 text-6xl mb-4" />

      {/* Title */}
      <h1 className="text-5xl font-bold text-red-600 mb-2">403</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Not Authorized
      </h2>

      {/* Message */}
      <p className="text-lg text-gray-600 mb-6">
        You do not have permission to access this page.
      </p>

      {/* Actions */}
      <div className="flex space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Go Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotAuthorized;
