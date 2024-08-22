import React from "react";
import { useNavigate } from "react-router-dom";

const Blocked: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">You are blocked.</h1>
      <p className="text-lg text-gray-700 mb-6">
        Please contact support for more information
      </p>
      <button
        onClick={handleGoBack}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default Blocked;
