import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaFilm,
  FaTicketAlt,
  FaListAlt,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { logoutTheater } from "../../redux/actions/theaters/theaterActions";
import axios from "axios";
import { config, URL } from "../../config/constants";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const TheaterSidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [theaterData, setTheaterData] = useState<any>(null);

  // ✅ Fetch full theater info on mount
  useEffect(() => {
    const fetchTheater = async () => {
      try {
        const { data } = await axios.get(`${URL}/theater/getTheater`, config);
        console.log(data, "✅ Theater data in Sidebar");
        if (data.success) setTheaterData(data.data);
      } catch (error) {
        console.error("❌ Error fetching theater:", error);
      }
    };
    fetchTheater();
  }, []);

  const handleLogoutClick = () => {
    dispatch(logoutTheater());
    Swal.fire({
      icon: "success",
      title: "Logged out successfully!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => navigate("/theater/login"));
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-[#141414] shadow-lg transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-red-600 tracking-wide">
          Moverule
        </h1>
        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white md:hidden"
        >
          <AiOutlineClose size={22} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex flex-col space-y-2">
        <NavLink
          to="/theater/dashboard"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 hover:bg-red-600 rounded-md transition ${
              isActive ? "bg-red-600 text-white" : "text-gray-400"
            }`
          }
        >
          <FaHome className="mr-3" /> Dashboard
        </NavLink>

        <NavLink
          to="/theater/movies"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 hover:bg-red-600 rounded-md transition ${
              isActive ? "bg-red-600 text-white" : "text-gray-400"
            }`
          }
        >
          <FaFilm className="mr-3" /> Movies
        </NavLink>

        <NavLink
          to="/theater/show-booking"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 hover:bg-red-600 rounded-md transition ${
              isActive ? "bg-red-600 text-white" : "text-gray-400"
            }`
          }
        >
          <FaTicketAlt className="mr-3" /> Show Booking
        </NavLink>

        <NavLink
          to="/theater/snacks"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 hover:bg-red-600 rounded-md transition ${
              isActive ? "bg-red-600 text-white" : "text-gray-400"
            }`
          }
        >
          <FaListAlt className="mr-3" /> Snacks & Beverages
        </NavLink>

        <NavLink
          to="/theater/create-shows"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 hover:bg-red-600 rounded-md transition ${
              isActive ? "bg-red-600 text-white" : "text-gray-400"
            }`
          }
        >
          <FaFilm className="mr-3" /> Create Shows
        </NavLink>

        <NavLink
          to="/theater/create-screen"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 hover:bg-red-600 rounded-md transition ${
              isActive ? "bg-red-600 text-white" : "text-gray-400"
            }`
          }
        >
          <FaFilm className="mr-3" /> Create Screen
        </NavLink>
      </nav>

      {/* Footer - Profile + Logout */}
      <div className="absolute bottom-0 w-full border-t border-gray-700">
        <NavLink
          to="/theater/theaterprofile"
          className="flex items-center px-4 py-3 text-gray-400 hover:bg-red-600 hover:text-white transition"
        >
          {theaterData?.profilePicture ? (
            <img
              src={theaterData.profilePicture}
              alt="Profile"
              className="w-8 h-8 rounded-full mr-3 border border-gray-500"
            />
          ) : (
            <FaUserCircle className="mr-3 text-2xl" />
          )}
          <span>{theaterData?.username || "Theater Owner"}</span>
        </NavLink>

        <button
          onClick={handleLogoutClick}
          className="flex items-center w-full px-4 py-3 text-gray-400 hover:bg-red-600 hover:text-white transition"
        >
          <FaSignOutAlt className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default TheaterSidebar;

