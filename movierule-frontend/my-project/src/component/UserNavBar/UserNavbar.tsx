import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { AppDispatch } from "../../redux/store";
import { logout } from "../../redux/actions/user/userActions";
import { UserSignupdata } from "../../interfaces/user/UserSignupdata";

interface NavbarProps {
  user: UserSignupdata;
}

const UserNavbar: React.FC<NavbarProps> = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
    Swal.fire({
      icon: "success",
      title: "Logged out successfully!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <header className="relative">
      <div className="absolute top-4 left-4">
        <img src="/src/assets/logo-new.png" alt="Logo" className="w-15 h-10" />
      </div>
      <div className="absolute top-4 right-4 flex items-center space-x-4">
        <div className="text-right">
          <h1 className="text-lg font-bold">{user?.username || "Profile"}</h1>
          <p className="text-sm">{user?.email}</p>
        </div>
        <img
          src={user?.profilePicture || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-12 h-12 rounded-full cursor-pointer"
          onClick={toggleMenu}
        />
      </div>

      {isMenuOpen && (
        <div className="absolute top-0 right-0 w-64 h-full bg-gray-800 rounded-lg shadow-lg z-10 p-4">
          <button
            className="absolute top-2 right-2 text-white"
            onClick={closeMenu}
          >
            &times;
          </button>
          <div className="flex flex-col items-center mt-8">
            <img
              src={user?.profilePicture || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
            <h1 className="mt-4 text-lg font-bold">{user?.username}</h1>
            <p className="text-sm">{user?.email}</p>
          </div>
          <ul className="mt-8 space-y-4">
            <li>
              <NavLink
                to="/profile"
                className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
                onClick={closeMenu}
              >
                Personal Info
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tickets"
                className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
                onClick={closeMenu}
              >
                Tickets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/book"
                className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
                onClick={closeMenu}
              >
                Book Movie
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/payment-method"
                className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
                onClick={closeMenu}
              >
                Payment Method
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/stream-library-plan"
                className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
                onClick={closeMenu}
              >
                Stream Library/Plan
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/chat"
                className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
                onClick={closeMenu}
              >
                Chat
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 px-4 hover:bg-gray-700 rounded-lg"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default UserNavbar;
