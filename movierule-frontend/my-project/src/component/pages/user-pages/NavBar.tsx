
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { logout } from "../../../redux/actions/user/userActions";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

    const handleLogoClick = () => {
      if (user) {
        navigate("/homepage");
      }
    };

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

  return (
    <header className="relative z-10">
      <div className="absolute top-4 left-4">
        <img
          src="/src/assets/logo-new.png"
          alt="Logo"
          className="w-15 h-10 cursor-pointer"
          onClick={handleLogoClick}
        />
      </div>
      <div className="absolute top-4 right-4 flex items-center space-x-4">
        <div className="text-right">
          <h1 className="text-lg font-bold">
            {user?.username ? user.username : "Profile"}
          </h1>
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
        <div className="fixed top-0 right-0 w-64 bg-gray-800 rounded-lg shadow-lg z-20 p-4">
          <button
            className="absolute top-2 right-2 text-white"
            onClick={closeMenu}
          >
            &times;
          </button>
          <div className="flex flex-col items-center ">
            <img
              src={user?.profilePicture || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
            <h1 className="mt-4 text-lg font-bold text-white">
              {user?.username}
            </h1>
            <p className="text-sm text-white">{user?.email}</p>
          </div>
          <ul className="mt-2 space-y-1">
            <li>
              <NavLink
                to="/profile"
                className="block py-2 px-4 hover:bg-gray-700 rounded-lg text-white"
                onClick={closeMenu}
              >
                Personal Info
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tickets"
                className="block py-2 px-4 hover:bg-gray-700 rounded-lg text-white"
                onClick={closeMenu}
              >
                Tickets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/homepage"
                className="block py-2 px-4 hover:bg-gray-700 rounded-lg text-white"
                onClick={closeMenu}
              >
                Book Movie
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/payment-method"
                className="block py-2 px-4 hover:bg-gray-700 rounded-lg text-white"
                onClick={closeMenu}
              >
                Payment Method
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/stream-library-plan"
                className="block py-2 px-4 hover:bg-gray-700 rounded-lg text-white"
                onClick={closeMenu}
              >
                Stream Library/Plan
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/chat"
                className="block py-2 px-4 hover:bg-gray-700 rounded-lg text-white"
                onClick={closeMenu}
              >
                Chat
              </NavLink>
            </li>
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="block w-full text-left py-2 px-4 hover:bg-gray-700 rounded-lg text-white"
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

export default Navbar;
