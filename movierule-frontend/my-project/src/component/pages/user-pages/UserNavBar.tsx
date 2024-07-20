// NavBar.tsx

import React from "react";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="container mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img src="/src/assets/logo-new.png" alt="Logo" className="h-10" />
        <ul className="flex space-x-4">
          <li>
            <NavLink to="/" className="hover:text-gray-300">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/stream" className="hover:text-gray-300">
              Stream
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="hover:text-gray-300">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="hover:text-gray-300">
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
      <NavLink
        to="/login"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
      >
        Login
      </NavLink>
    </nav>
  );
};

export default NavBar;
