// import React from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../redux/store";
// import { useNavigate } from "react-router-dom";
// import DropdownButton from "../../dropdown/DropdownButton";


// const TheaterDashboard: React.FC = () => {
//   const navigate = useNavigate();
//   const { theaterOwner } = useSelector(
//     (state: RootState) => state.theater
//   );

//   // Redirect to login if no theater owner is logged in
//   React.useEffect(() => {
//     if (!theaterOwner) {
//       navigate("/theater/login");
//     }
//   }, [theaterOwner, navigate]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//       <DropdownButton /> 
//           <div className="px-4 py-5 sm:px-6">
//             <h3 className="text-lg leading-6 font-medium text-gray-900">
//               Theater Dashboard
//             </h3>
//             <p className="mt-1 max-w-2xl text-sm text-gray-500">
//               Welcome, {theaterOwner?.username}
//             </p>
//           </div>
//           <div className="border-t border-gray-200">
//             <dl>
//               <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <dt className="text-sm font-medium text-gray-500">Email</dt>
//                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                   {theaterOwner?.email}
//                 </dd>
//               </div>
//               {/* Add more fields if necessary */}
//             </dl>
//           </div>
//         </div>
//         <div className="mt-8">
//           <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
//             Manage Your Theater
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="bg-white shadow-md rounded-lg p-6">
//               <h4 className="text-xl font-bold mb-2">Movies</h4>
//               <p className="text-gray-600 mb-4">
//                 Add, edit, or remove movies playing at your theater.
//               </p>
//               <button
//                 onClick={() => navigate("/theater-movies")}
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//               >
//                 Manage Movies
//               </button>
//             </div>
//             <div className="bg-white shadow-md rounded-lg p-6">
//               <h4 className="text-xl font-bold mb-2">Bookings</h4>
//               <p className="text-gray-600 mb-4">
//                 View and manage theater bookings.
//               </p>
//               <button
//                 onClick={() => navigate("/theater-bookings")}
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//               >
//                 Manage Bookings
//               </button>
//             </div>
//             <div className="bg-white shadow-md rounded-lg p-6">
//               <h4 className="text-xl font-bold mb-2">Settings</h4>
//               <p className="text-gray-600 mb-4">
//                 Update your theater's settings and profile information.
//               </p>
//               <button
//                 onClick={() => navigate("/theater-settings")}
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//               >
//                 Theater Settings
//               </button>
//             </div>
//             {/* Add more cards as necessary */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TheaterDashboard;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaFilm,
  FaTicketAlt,
  FaListAlt,
  FaCog,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AppDispatch, RootState } from "../../../redux/store";
import { logoutTheater } from "../../../redux/actions/theaters/theaterActions";


const TheaterDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { theaterOwner } = useSelector((state: RootState) => state.theater);

  // Redirect to login if no theater owner is logged in
  //   React.useEffect(() => {
  //     if (!theaterOwner) {
  //       navigate("/theater/login");
  //     }
  //   }, [theaterOwner, navigate]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = () => {
    dispatch(logoutTheater());
    setIsOpen(false);
    Swal.fire({
      icon: "success",
      title: "Logged out successfully!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate("/theater/login");
    });
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Conditionally render sidebar based on isOpen state */}
      {isOpen && (
        <div
          className={`fixed top-0 left-0 w-64 bg-gray-800 h-full transition-transform transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-bold">Moverule</h1>
            <button onClick={toggleSidebar} className="text-white">
              <AiOutlineClose />
            </button>
          </div>
          <nav className="mt-10">
            <NavLink
              to="/theater/dashboard"
              className="flex items-center p-2"
              style={{ color: "#9CA3AF" }}
            >
              <FaHome className="mr-3" /> Dashboard
            </NavLink>
            <NavLink
              to="/movies"
              className="flex items-center p-2"
              style={{ color: "#9CA3AF" }}
            >
              <FaFilm className="mr-3" /> Movies
            </NavLink>
            <NavLink
              to="/show-booking"
              className="flex items-center p-2"
              style={{ color: "#9CA3AF" }}
            >
              <FaTicketAlt className="mr-3" /> Show Booking
            </NavLink>
            <NavLink
              to="/list-booking"
              className="flex items-center p-2"
              style={{ color: "#9CA3AF" }}
            >
              <FaListAlt className="mr-3" /> List of Booking
            </NavLink>
            <NavLink
              to="/settings"
              className="flex items-center p-2"
              style={{ color: "#9CA3AF" }}
            >
              <FaCog className="mr-3" /> Settings
            </NavLink>
            {/* Logout button */}
            <button
              onClick={handleLogoutClick}
              className="absolute bottom-4 w-full text-left p-2 text-gray-400 hover:text-white"
            >
              <FaSignOutAlt className="mr-3" />
              Logout
            </button>
          </nav>
          <div className="absolute bottom-4 w-full flex justify-center">
            <NavLink
              to="/theater/theaterprofile"
              className="flex items-center p-2"
              style={{ color: "#9CA3AF" }}
            >
              <FaUserCircle className="mr-3 text-2xl" />
              <span>{theaterOwner?.username}</span>
            </NavLink>
          </div>
        </div>
      )}

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

