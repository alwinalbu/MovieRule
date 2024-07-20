import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import TheaterSidebar from "../../TheaterSidebar/TheaterSidebar";


const TheaterDashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Conditionally render Sidebar component */}
      {isOpen && <TheaterSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
          <button onClick={toggleSidebar} className="text-white">
            <GiHamburgerMenu />
          </button>
         
          <h1 className="text-xl">Theater Dashboard</h1>
          <img src="/src/assets/logo-new.png" alt="Logo" className="h-10" />
        </header>
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold">Today's Revenue</h2>
              <p className="mt-2 text-2xl">₹15,00,000</p>
              <p className="mt-1 text-sm text-green-500">
                ↑ 12% from yesterday
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold">Today's Tickets</h2>
              <p className="mt-2 text-2xl">7,506</p>
              <p className="mt-1 text-sm text-red-500">↓ 3% from yesterday</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold">Today's Bookings</h2>
              <p className="mt-2 text-2xl">17,058</p>
              <p className="mt-1 text-sm text-green-500">↑ 5% from yesterday</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold">Tickets Booked</h2>

              <div className="h-64">[Chart Component]</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold">Returns</h2>

              <div className="h-64">[Chart Component]</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TheaterDashboard;
