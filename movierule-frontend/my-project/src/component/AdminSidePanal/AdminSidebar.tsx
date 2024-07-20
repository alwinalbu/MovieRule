import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AppDispatch, RootState } from "../../redux/store";
import { logoutAdmin } from "../../redux/actions/admin/adminActions";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const AdminSidebar: React.FC = () => {
  const { admin } = useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const adminEmail = admin?.email || "Unknown";

  const handleLogout = async () => {
    try {
      await dispatch(logoutAdmin()).unwrap();
      Swal.fire({
        icon: "success",
        title: "Logged out successfully!",
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout failed!",
        showConfirmButton: true,
      });
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Combined Header */}
      <header className="flex items-center justify-between bg-gray-800 p-4 rounded-md text-white">
        <button onClick={toggleSidebar} className="text-white">
          <FaBars />
        </button>
        <img src="/src/assets/logo-new.png" alt="Logo" className="h-10" />
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
          <FaUserCircle className="text-3xl text-red-500" />
        </div>
      </header>

      {/* Admin Sidebar */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-64 bg-gray-800 h-full transition-transform transform md:translate-x-0">
          <div className="flex items-center justify-between p-4">
            <img src="/src/assets/logo-new.png" alt="Logo" className="h-10" />
            <button onClick={handleCloseSidebar} className="text-white">
              <FaTimes />
            </button>
          </div>
          <nav className="mt-6">
            <NavLink
              to="/admin/home"
              className="block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-red-500 hover:text-white"
              onClick={handleCloseSidebar}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/theatre-movies"
              className="block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-red-500 hover:text-white"
              onClick={handleCloseSidebar}
            >
              Theatre Movies
            </NavLink>
            <NavLink
              to="/admin/OTT-movies"
              className="block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-red-500 hover:text-white"
              onClick={handleCloseSidebar}
            >
              Streaming Movies
            </NavLink>
            <NavLink
              to="/admin/users-list"
              className="block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-red-500 hover:text-white"
              onClick={handleCloseSidebar}
            >
              Users List
            </NavLink>
            <NavLink
              to="/admin/theatres-list"
              className="block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-red-500 hover:text-white"
              onClick={handleCloseSidebar}
            >
              Theatres List
            </NavLink>
            <NavLink
              to="/admin/available-Movie-list"
              className="block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-red-500 hover:text-white"
              onClick={handleCloseSidebar}
            >
              Available Movie List
            </NavLink>
          </nav>
          <div className="absolute bottom-4 left-4">
            {/* Display admin email */}
            <p className="text-sm text-gray-400">{adminEmail}</p>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 mt-2 text-sm font-medium text-gray-300 hover:bg-red-500 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Main content of admin dashboard */}
      <div className={`ml-${isOpen ? "64" : "0"} p-4`}>
        {/* Your admin dashboard content goes here */}
      </div>
    </div>
  );
};

export default AdminSidebar;

