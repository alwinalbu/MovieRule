import React from "react";
import { NavLink } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { logoutTheater } from "../../redux/actions/theaters/theaterActions";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const TheaterSidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { theaterOwner } = useSelector((state: RootState) => state.theater);

  const handleLogoutClick = () => {
    dispatch(logoutTheater());
    Swal.fire({
      icon: "success",
      title: "Logged out successfully!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate("/theater/login");
    });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-64 bg-gray-800 h-full transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">Moverule</h1>
        <button onClick={toggleSidebar} className="text-white">
          <AiOutlineClose />
        </button>
      </div>
      <nav className="mt-10">
        <NavLink
          to="/theater/dashboard"
          className="flex items-center p-2"
          style={{ color: "#9CA3AF" }}
        >
          <FaHome className="mr-3" /> Dashboard
        </NavLink>
        <NavLink
          to="/movies"
          className="flex items-center p-2"
          style={{ color: "#9CA3AF" }}
        >
          <FaFilm className="mr-3" /> Movies
        </NavLink>
        <NavLink
          to="/show-booking"
          className="flex items-center p-2"
          style={{ color: "#9CA3AF" }}
        >
          <FaTicketAlt className="mr-3" /> Show Booking
        </NavLink>
        <NavLink
          to="/list-booking"
          className="flex items-center p-2"
          style={{ color: "#9CA3AF" }}
        >
          <FaListAlt className="mr-3" /> List of Booking
        </NavLink>
        <NavLink
          to="/theater/create-shows"
          className="flex items-center p-2"
          style={{ color: "#9CA3AF" }}
        >
          <FaFilm className="mr-3" /> Create-Shows
        </NavLink>
        <NavLink
          to="/theater/create-screen"
          className="flex items-center p-2"
          style={{ color: "#9CA3AF" }}
        >
          <FaFilm className="mr-3" /> Create-Screen
        </NavLink>
        {/* Logout button */}
        <button
          onClick={handleLogoutClick}
          className="absolute bottom-4 w-full text-left p-2 text-gray-400 hover:text-white"
        >
          <FaSignOutAlt className="mr-3" />
          Logout
        </button>
      </nav>
      <div className="absolute bottom-4 w-full flex justify-center">
        <NavLink
          to="/theater/theaterprofile"
          className="flex items-center p-2"
          style={{ color: "#9CA3AF" }}
        >
          <FaUserCircle className="mr-3 text-2xl" />
          <span>{theaterOwner?.username}</span>
        </NavLink>
      </div>
    </div>
  );
};

export default TheaterSidebar;
