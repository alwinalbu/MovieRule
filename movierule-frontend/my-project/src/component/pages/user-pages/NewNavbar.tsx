import React from "react";

const NewNavbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between p-6 bg-gray-800">
      <div className="text-red-500 text-3xl font-bold">Moviee</div>
      <div className="flex space-x-4">
        <a href="#" className="hover:text-red-500">
          Home
        </a>
        <a href="#" className="hover:text-red-500">
          Now Showing
        </a>
        <a href="#" className="hover:text-red-500">
          Upcoming
        </a>
        <a href="#" className="hover:text-red-500">
          About
        </a>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="bg-gray-700 p-2 rounded"
          placeholder="Search"
        />
        <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
      </div>
    </nav>
  );
};

export default NewNavbar;
