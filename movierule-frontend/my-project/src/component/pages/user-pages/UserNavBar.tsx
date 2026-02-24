import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-20 transition-colors duration-300 ${
        isScrolled
          ? "bg-black"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-6">
          <img
            src="/logo-new.png"
            alt="Logo"
            className="h-8 md:h-10"
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          {["Home", "About", "Contact"].map((item) => (
            <li key={item}>
              <NavLink
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `hover:text-red-600 ${
                    isActive ? "text-red-600" : "text-white"
                  }`
                }
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Search + Login (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <input
            type="text"
            className="bg-gray-800 text-sm px-3 py-2 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Search"
          />
          <NavLink
            to="/login"
            className="bg-red-600 px-4 py-2 rounded font-semibold hover:bg-red-700 transition"
          >
            Login
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black px-6 py-4 space-y-4">
          {["Home","About", "Contact"].map((item) => (
            <NavLink
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="block text-white hover:text-red-600"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </NavLink>
          ))}
          <input
            type="text"
            className="w-full bg-gray-800 text-sm px-3 py-2 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Search"
          />
          <NavLink
            to="/login"
            className="block bg-red-600 text-center px-4 py-2 rounded font-semibold hover:bg-red-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Login
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
