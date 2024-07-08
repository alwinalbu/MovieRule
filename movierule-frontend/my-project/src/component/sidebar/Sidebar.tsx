import React from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-64 bg-gray-800 text-white transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300`}
    >
      <div className="p-4">
        <h2 className="text-xl mb-4">Personal Info</h2>
        <ul>
          <li>
            <Link to="/profile" className="block p-2 hover:bg-gray-700">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/tickets" className="block p-2 hover:bg-gray-700">
              Tickets
            </Link>
          </li>
          <li>
            <Link to="/payment" className="block p-2 hover:bg-gray-700">
              Payment Method
            </Link>
          </li>
          <li>
            <Link to="/stream-library" className="block p-2 hover:bg-gray-700">
              Stream Library/Plan
            </Link>
          </li>
          <li>
            <Link to="/chat" className="block p-2 hover:bg-gray-700">
              Chat
            </Link>
          </li>
          <li>
            <Link to="/logout" className="block p-2 hover:bg-gray-700">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
