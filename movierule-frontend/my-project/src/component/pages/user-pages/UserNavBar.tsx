

import React from "react";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="absolute bg-gray-600 top-0 left-0 w-full z-10 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/src/assets/logo-new.png" alt="Logo" className="h-10" />
          <ul className="flex space-x-4">
            <li>
              <NavLink to="/" className="text-white hover:text-red-500">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/stream" className="text-white hover:text-red-500">
                Stream
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="text-white hover:text-red-500">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="text-white hover:text-red-500">
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="bg-gray-700 p-2 rounded text-white"
            placeholder="Search"
          />
          <NavLink
            to="/login"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-red-500"
          >
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;


