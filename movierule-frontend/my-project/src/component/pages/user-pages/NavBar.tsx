import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { logout } from "../../../redux/actions/user/userActions";
import { Menu, X } from "lucide-react";
import axios from "axios";
import { config, URL } from "../../../config/constants";
import { waitForCookies } from "../../../utlis/waitForCookies";


const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { user } = useSelector((state: RootState) => state.user); 
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // ✅ Fetch full user info for Navbar display
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const { data } = await axios.get(`${URL}/getUser`, config);
  //       console.log(data, "✅ Full user data from backend");
  //       setCurrentUser(data);
  //     } catch (error) {
  //       console.error("❌ Error fetching user details:", error);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  useEffect(() => {
    if (currentUser) return; 

    const fetchUser = async () => {
      
      await waitForCookies();
      
      try {
        const { data } = await axios.get(`${URL}/getUser`, config);
        setCurrentUser(data);
      } catch (error) {
        console.error("❌ Error fetching user details:", error);
      }
    };

    fetchUser();
  }, [currentUser]);


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // ✅ Use Redux `user` just to check login before redirect
  const handleLogoClick = () => {
    if (user) navigate("/homepage");
  };

  const handleLogout = () => {
    dispatch(logout());
    Swal.fire({
      icon: "success",
      title: "Logged out successfully!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => navigate("/"));
  };

  return (
    <header className="fixed top-0 left-0 w-full z-20 bg-black/70 backdrop-blur-sm">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img
            src="/logo-new.png"
            alt="Logo"
            className="h-10 cursor-pointer"
            onClick={handleLogoClick}
          />

          {/* Desktop NavLinks */}
          <nav className="hidden md:flex space-x-6">
            <NavLink to="/homepage" className="text-white hover:text-red-500">
              Home
            </NavLink>
            <NavLink to="/tickets" className="text-white hover:text-red-500">
              Tickets
            </NavLink>
            <NavLink
              to="/stream-library-plan"
              className="text-white hover:text-red-500"
            >
              Stream
            </NavLink>
            <NavLink to="/my-list" className="text-white hover:text-red-500">
              My List
            </NavLink>
            <NavLink to="/wallet" className="text-white hover:text-red-500">
              Wallet
            </NavLink>
          </nav>
        </div>

        {/* Right Profile */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:block text-right">
            <h1 className="text-sm font-bold text-white">
              {currentUser?.username || "Guest"}
            </h1>
            <p className="text-xs text-gray-400">{currentUser?.email}</p>
          </div>
          <img
            src={currentUser?.profilePicture || "/user.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer border border-gray-500"
            onClick={toggleMenu}
          />

          {/* Mobile Hamburger */}
          <button className="md:hidden text-white ml-2" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Dropdown / Sidebar */}
      {isMenuOpen && (
        <div className="absolute top-0 right-0 w-64 h-screen bg-black p-6 shadow-lg z-30">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={closeMenu}
          >
            <X size={28} />
          </button>

          <div className="flex flex-col items-center mt-8">
            <img
              src={currentUser?.profilePicture || "/user.png"}
              alt="Profile"
              className="w-20 h-20 rounded-full mb-4"
            />
            <h1 className="text-lg font-bold text-white">
              {currentUser?.username}
            </h1>
            <p className="text-sm text-gray-400">{currentUser?.email}</p>
          </div>

          <ul className="mt-6 space-y-3">
            <li>
              <NavLink
                to="/profile"
                className="block py-2 px-3 rounded hover:bg-gray-800 text-white"
                onClick={closeMenu}
              >
                Personal Info
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tickets"
                className="block py-2 px-3 rounded hover:bg-gray-800 text-white"
                onClick={closeMenu}
              >
                Tickets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/stream-library-plan"
                className="block py-2 px-3 rounded hover:bg-gray-800 text-white"
                onClick={closeMenu}
              >
                Stream Library
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-list"
                className="block py-2 px-3 rounded hover:bg-gray-800 text-white"
                onClick={closeMenu}
              >
                My List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/wallet"
                className="block py-2 px-3 rounded hover:bg-gray-800 text-white"
                onClick={closeMenu}
              >
                Wallet
              </NavLink>
            </li>
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="w-full text-left py-2 px-3 rounded hover:bg-gray-800 text-white"
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

