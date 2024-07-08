import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../redux/store";
import Swal from "sweetalert2";
import { logoutAdmin } from "../../../redux/actions/admin/adminActions";

const Adminhome: React.FC = () => {
  const { admin } = useSelector((state: RootState) => state.admin);


  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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
  return (
    <div className="min-h-screen flex bg-gray-900 text-gray-200">
      <aside className="w-64 bg-gray-800 text-gray-400 flex flex-col">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-red-500">MOVERULE</h1>
          <p className="text-sm text-gray-400 mt-1">{adminEmail}</p>{" "}
        </div>
        <nav className="flex-1 px-2 space-y-1">
          <NavLink
            to="/admin/dashboard"
            className="block px-2 py-1 text-sm font-medium hover:bg-red-500 hover:text-white"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/theatre-movies"
            className="block px-2 py-1 text-sm font-medium hover:bg-red-500 hover:text-white"
          >
            Theatre Movies
          </NavLink>
          <NavLink
            to="/admin/streaming-movies"
            className="block px-2 py-1 text-sm font-medium hover:bg-red-500 hover:text-white"
          >
            Streaming Movies
          </NavLink>
          <NavLink
            to="/admin/users-list"
            className="block px-2 py-1 text-sm font-medium hover:bg-red-500 hover:text-white"
          >
            Users List
          </NavLink>
          <NavLink
            to="/admin/theatres-list"
            className="block px-2 py-1 text-sm font-medium hover:bg-red-500 hover:text-white"
          >
            Theatres List
          </NavLink>
        </nav>
        <div className="px-2 py-4 space-y-1">
          <NavLink
            to="/admin/settings"
            className="block px-2 py-1 text-sm font-medium hover:bg-red-500 hover:text-white"
          >
            Settings
          </NavLink>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-2 py-1 text-sm font-medium hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>
        </div>
      </aside>
      {/* Main content section */}
      <main className="flex-1 p-6 bg-gray-900">
        <header className="flex items-center justify-between bg-gray-800 p-4 rounded-md">
          <h1 className="text-2xl font-semibold">Theatre Movies</h1>
          <div className="flex items-center space-x-4">
            {/* Search input */}
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
            {/* User icon */}
            <FaUserCircle className="text-3xl text-red-500" />
          </div>
        </header>
        {/* Movie section */}
        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Sample movie cards */}
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 shadow rounded-lg overflow-hidden"
            >
              <img
                src={`https://via.placeholder.com/300x400?text=Movie+${
                  index + 1
                }`}
                alt={`Movie ${index + 1}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-white">
                <h2 className="text-lg font-semibold">Movie {index + 1}</h2>
                <p className="mt-1 text-sm">Details about the movie.</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Adminhome;
