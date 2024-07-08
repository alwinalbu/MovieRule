
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Swal from "sweetalert2";
import "tailwindcss/tailwind.css";
import { AppDispatch, RootState } from "../../../redux/store";
import { logout } from "../../../redux/actions/user/userActions";

const UserHomePage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
   const navigate = useNavigate();

  const {user} = useSelector((state: RootState) => state.user);

  console.log(user, "userdata inside the homepage page ");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="relative">
        <img
          src="/src/assets/Furiosa Banner.jpg"
          alt="Movie Poster"
          className="w-full h-80 object-cover"
        />
        <div className="absolute top-4 left-4">
          <img
            src="/src/assets/logo-new.png"
            alt="Logo"
            className="w-15 h-10"
          />
        </div>
        <div className="absolute top-4 right-4 flex items-center space-x-4">
          <div className="text-right">
            <h1 className="text-lg font-bold">
              {user?.username ? user?.username : "Profile"}
            </h1>
            <p className="text-sm">{user?.email}</p>
          </div>
          <img
            src={user?.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-12 h-12 rounded-full"
            onClick={toggleMenu}
          />
        </div>
        <div className="absolute bottom-4 left-4">
          <h1 className="text-3xl font-bold">Furiosa: A Mad Max Saga</h1>
          <p className="text-lg">2024 - Action</p>
          <div className="flex space-x-4 mt-2">
            <button className="px-4 py-2 bg-red-600 rounded-lg">
              Book Tickets
            </button>
            <button className="px-4 py-2 bg-blue-600 rounded-lg">
              Play Trailer
            </button>
          </div>
        </div>
      </header>
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
      <main className="p-4">
        <h2 className="text-2xl font-bold mb-4">Streaming</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Map through your movie list here */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <img
              src="/path-to-movie.jpg"
              alt="Movie"
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-lg font-bold mt-2">Movie Title</h3>
            <p className="text-sm">3.5/5 - 1234 Votes</p>
          </div>
          {/* Repeat above block for each movie */}
        </div>
      </main>
    </div>
  );
};

export default UserHomePage;


