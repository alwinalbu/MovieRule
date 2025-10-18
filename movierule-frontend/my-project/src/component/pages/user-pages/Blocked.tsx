

import React from "react";
import { useNavigate } from "react-router-dom";

const Blocked: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-center px-4">
      <h1 className="text-5xl font-extrabold text-red-600 mb-4">Blocked</h1>
      <p className="text-xl text-white mb-2">Your account has been blocked.</p>
      <p className="text-gray-400 mb-6">
        Please contact support for more information.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default Blocked;

