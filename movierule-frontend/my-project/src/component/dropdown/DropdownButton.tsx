import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { logoutTheater } from "../../redux/actions/theaters/theaterActions";
import { AppDispatch } from "../../redux/store";

const DropdownButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileClick = () => {
    navigate("/theater/theaterprofile");
    setIsOpen(false);
  };

  const handleLogoutClick = () => {
    dispatch(logoutTheater());
    setIsOpen(false);
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
    <div className="relative">
      <button
        type="button"
        className="relative z-10 -m-1.5 flex items-center p-1.5"
        id="user-menu-button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        onClick={toggleDropdown}
      >
        <span className="sr-only">Open Theater menu</span>
        <img
          className="h-8 w-8 rounded-full bg-gray-50"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Profile"
        />
      </button>
      {/* Dropdown menu */}
      {isOpen && (
        <div
          id="dropdown-menu"
          className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg"
        >
          <button
            type="button"
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
            onClick={handleProfileClick}
          >
            Profile
          </button>
          <button
            type="button"
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
