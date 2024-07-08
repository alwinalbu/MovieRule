import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AppDispatch } from "../../redux/store";
import { logout } from "../../redux/actions/user/userActions";
import { UserSignupdata } from "../../interfaces/user/UserSignupdata";

interface UserDropdownProps {
  user: UserSignupdata | null;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    Swal.fire({
      icon: "success",
      title: "Logged out successfully!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate("/");
    });
  };

  const handleProfileClick = () => {
    navigate("/profile"); // Navigate to the profile page
    setIsOpen(false); // Close the dropdown after navigation
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {user && (
        <button
          className="text-lg bg-red-600 font-semibold px-4 py-2 rounded-lg shadow-md text-white"
          onClick={toggleDropdown}
        >
          {user?.username ? user?.username : "Profile"}
        </button>
      )}

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
          <button
            onClick={handleProfileClick}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
          >
            Profile
          </button>
          <a
            href="/settings"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
          >
            Settings
          </a>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
