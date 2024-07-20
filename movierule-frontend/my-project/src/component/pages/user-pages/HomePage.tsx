// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import Swal from "sweetalert2";
// import "tailwindcss/tailwind.css";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; 
// import { AppDispatch, RootState } from "../../../redux/store";
// import { logout } from "../../../redux/actions/user/userActions";
// import { commonRequest } from "../../../config/api"; 
// import { config } from "../../../config/constants";
// import { Link } from "react-router-dom";

// const UserHomePage: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [movies, setMovies] = useState<any[]>([]);
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const { user } = useSelector((state: RootState) => state.user);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await commonRequest("GET", "/get-Movies",config);
//         setMovies(response.data.data);
//       } catch (error) {
//         console.error("Failed to fetch movies", error);
//       }
//     };

//     fetchMovies();
//   }, [user]);


//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };


//   const handleLogout = () => {
//     dispatch(logout());
//     closeMenu();
//     Swal.fire({
//       icon: "success",
//       title: "Logged out successfully!",
//       showConfirmButton: false,
//       timer: 1500,
//     }).then(() => {
//       navigate("/");
//     });
//   };


//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <header className="relative">
//         <Carousel
//           autoPlay
//           infiniteLoop
//           showThumbs={false}
//           showStatus={false}
//           useKeyboardArrows
//           dynamicHeight
//         >
//           {movies.map((movie) => (
//             <div key={movie.id}>
//               <img
//                 src={movie.backdrop_path}
//                 alt={movie.title}
//                 className="w-full h-80 object-cover"
//               />
//               <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 p-4 rounded-lg">
//                 <h1 className="text-3xl font-bold">{movie.title}</h1>
//                 <p className="text-lg">
//                   {movie.genre} - {movie.releaseYear}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </Carousel>
//         <div className="absolute top-4 left-4">
//           <img
//             src="/src/assets/logo-new.png"
//             alt="Logo"
//             className="w-15 h-10"
//           />
//         </div>
//         <div className="absolute top-4 right-4 flex items-center space-x-4">
//           <div className="text-right">
//             <h1 className="text-lg font-bold">
//               {user?.username ? user?.username : "Profile"}
//             </h1>
//             <p className="text-sm">{user?.email}</p>
//           </div>
//           <img
//             src={user?.profilePicture || "https://via.placeholder.com/150"}
//             alt="Profile"
//             className="w-12 h-12 rounded-full"
//             onClick={toggleMenu}
//           />
//         </div>
//       </header>
//       {isMenuOpen && (
//         <div className="absolute top-0 right-0 w-64 h-full bg-gray-800 rounded-lg shadow-lg z-10 p-4">
//           <button
//             className="absolute top-2 right-2 text-white"
//             onClick={closeMenu}
//           >
//             &times;
//           </button>
//           <div className="flex flex-col items-center mt-8">
//             <img
//               src={user?.profilePicture || "https://via.placeholder.com/150"}
//               alt="Profile"
//               className="w-24 h-24 rounded-full"
//             />
//             <h1 className="mt-4 text-lg font-bold">{user?.username}</h1>
//             <p className="text-sm">{user?.email}</p>
//           </div>
//           <ul className="mt-8 space-y-4">
//             <li>
//               <NavLink
//                 to="/profile"
//                 className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
//                 onClick={closeMenu}
//               >
//                 Personal Info
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/tickets"
//                 className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
//                 onClick={closeMenu}
//               >
//                 Tickets
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/book-movies"
//                 className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
//                 onClick={closeMenu}
//               >
//                 Book Movie
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/payment-method"
//                 className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
//                 onClick={closeMenu}
//               >
//                 Payment Method
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/stream-library-plan"
//                 className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
//                 onClick={closeMenu}
//               >
//                 Stream Library/Plan
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/chat"
//                 className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
//                 onClick={closeMenu}
//               >
//                 Chat
//               </NavLink>
//             </li>
//             <li>
//               <button
//                 onClick={handleLogout}
//                 className="block w-full text-left py-2 px-4 hover:bg-gray-700 rounded-lg"
//               >
//                 Logout
//               </button>
//             </li>
//           </ul>
//         </div>
//       )}
//       <main className="p-4">
//         <h2 className="text-2xl font-bold mb-4">Streaming</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {movies.length > 0 ? (
//             movies.map((movie) => (
//               <Link to={`/movie/${movie.id}`} key={movie.id}>
//                 <div key={movie.id} className="bg-gray-800 p-4 rounded-lg">
//                   <img
//                     src={movie.posterPath}
//                     alt={movie.title}
//                     className="w-full h-48 object-cover rounded-lg"
//                   />
//                   <h3 className="text-lg font-bold mt-2">{movie.title}</h3>
//                   <p className="text-sm">
//                     {movie.rating}/5 - {movie.votes} Votes
//                   </p>
//                 </div>
//               </Link>
//             ))
//           ) : (
//             <p className="col-span-4 text-center">No movies available.</p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default UserHomePage;


import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import "tailwindcss/tailwind.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AppDispatch, RootState } from "../../../redux/store";
import { logout } from "../../../redux/actions/user/userActions";
import { config } from "../../../config/constants";
import { commonRequest } from "../../../config/api";
import RowPost from "./RowPost";


const UserHomePage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await commonRequest("GET", "/get-Movies", config);
        setMovies(response.data.data);
      } catch (error) {
        console.error("Failed to fetch movies", error);
      }
    };
    fetchMovies();
  }, [user]);

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
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          useKeyboardArrows
          dynamicHeight
        >
          {movies.map((movie) => (
            <div key={movie.id}>
              <img
                src={movie.backdrop_path}
                alt={movie.title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 p-4 rounded-lg">
                <h1 className="text-3xl font-bold">{movie.title}</h1>
                <p className="text-lg">
                  {movie.genre} - {movie.releaseYear}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
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
                to="/book-movies"
                className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
                onClick={closeMenu}
              >
                Book Movie
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
        <h2 className="text-2xl font-bold mb-4">Running</h2>
        <RowPost heading="Latest Movies" endpoint="/get-Movies"  />
      </main>
    </div>
  );
};

export default UserHomePage;
