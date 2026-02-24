import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../redux/store";
import { loginAdmin } from "../../../redux/actions/admin/adminActions";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { admin, loading, error } = useSelector(
    (state: RootState) => state.admin
  );

  useEffect(() => {
    if (admin) {
      navigate("/admin/home");
    }
  }, [admin, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginAdmin({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.01]">
        {/* Website Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo-new.png" 
            alt="Website Logo"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-extrabold text-center text-red-600 mb-2">
          Admin Panel
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Sign in to manage the dashboard
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Feedback */}
          {loading && (
            <div className="text-center text-sm text-gray-600">Loading...</div>
          )}
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          {/* Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 rounded-lg shadow-md text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
