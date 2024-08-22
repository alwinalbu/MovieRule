// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import Swal from "sweetalert2";
// import "tailwindcss/tailwind.css";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { AppDispatch, RootState } from "../../../redux/store";
// import { logout } from "../../../redux/actions/user/userActions";
// import { config } from "../../../config/constants";
// import { commonRequest } from "../../../config/api";
// import RowPost from "./RowPost";


// const UserHomePage: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [movies, setMovies] = useState<any[]>([]);
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { user } = useSelector((state: RootState) => state.user);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await commonRequest("GET", "/get-Movies", config);
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
//                 className="w-full h-100 object-cover"
//               />
//               <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 p-4 rounded-lg">
//                 <h1 className="text-3xl font-bold">{movie.title}</h1>
//                 <p className="text-lg">
//                   {movie.releaseDate} - {movie.rating}
//                   <span className="text-yellow-400">★</span>
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
//         <h2 className="text-2xl font-bold mb-4">Running</h2>
//         <RowPost heading="Latest Movies" endpoint="/get-Movies" />
//       </main>
//     </div>
//   );
// };

// export default UserHomePage;




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import Swal from "sweetalert2";
// import "tailwindcss/tailwind.css";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { AppDispatch, RootState } from "../../../redux/store";
// import { logout } from "../../../redux/actions/user/userActions";
// import { config } from "../../../config/constants";
// import { commonRequest } from "../../../config/api";
// import RowPost from "./RowPost";
// import Navbar from "./NavBar";



// const UserHomePage: React.FC = () => {
//   const [movies, setMovies] = useState<any[]>([]);
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { user } = useSelector((state: RootState) => state.user);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await commonRequest("GET", "/get-Movies", config);
//         setMovies(response.data.data);
//       } catch (error) {
//         console.error("Failed to fetch movies", error);
//       }
//     };
//     fetchMovies();
//   }, [user]);

//   const handleLogout = () => {
//     dispatch(logout());
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
//     <div className="min-h-screen bg-gray-950 text-white">
//       <Navbar user={user} onLogout={handleLogout} />
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
//                 className="w-full h-100 object-cover"
//               />
//               <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 p-4 rounded-lg">
//                 <h1 className="text-3xl font-bold">{movie.title}</h1>
//                 <p className="text-lg">
//                   {movie.releaseDate} - {movie.rating}
//                   <span className="text-yellow-400">★</span>
//                 </p>
//               </div>
//             </div>
//           ))}
//         </Carousel>
//       </header>
//       <main className="p-4">
//         <h2 className="text-2xl font-bold mb-4">Running</h2>
//         <RowPost heading="Latest Movies" endpoint="/get-Movies" />
//       </main>
//     </div>
//   );
// };

// export default UserHomePage;


// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import Swal from "sweetalert2";
// import "tailwindcss/tailwind.css";
// import { AppDispatch, RootState } from "../../../redux/store";
// import { logout } from "../../../redux/actions/user/userActions";
// import { config } from "../../../config/constants";
// import { commonRequest } from "../../../config/api";
// import RowPost from "./RowPost";
// import Navbar from "./NavBar";
// import "../../../styles.css";
// import YouTube from "react-youtube";


// const UserHomePage: React.FC = () => {
//   const [movies, setMovies] = useState<any[]>([]);
//   const [error, setError] = useState<string>("");
//   const [currentMovieIndex, setCurrentMovieIndex] = useState<number>(0);
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { user } = useSelector((state: RootState) => state.user);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null); 

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await commonRequest(
//           "GET",
//           "/theater/get-Movies",
//           config
//         );
//         const moviesData = response.data.data;

//         // Fetch trailer keys for each movie
//         const moviesWithTrailers = await Promise.all(
//           moviesData.map(async (movie: any) => {
//             const trailerResponse = await fetch(
//               `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=2a1ba4f836ae838c2fe9a42ef94af264&language=en-US`
//             );
//             const trailerData = await trailerResponse.json();
//             const trailer = trailerData.results.find(
//               (video: any) => video.type === "Trailer"
//             );

//             return {
//               ...movie,
//               trailerKey: trailer ? trailer.key : null,
//             };
//           })
//         );

//         setMovies(moviesWithTrailers);
//       } catch (err) {
//         setError("Failed to fetch movies");
//         console.error("Failed to fetch movies", err);
//       }
//     };

//     fetchMovies();
//   }, [user]);

//   useEffect(() => {
//     if (movies.length > 0) {
//       intervalRef.current = setInterval(() => {
//         setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
//       }, 90000);

//       return () => {
//         if (intervalRef.current) {
//           clearInterval(intervalRef.current);
//         }
//       };
//     }
//   }, [movies]);

//   const handleNextMovie = () => {
//     setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
//   };

//   const currentMovie = movies[currentMovieIndex];

//   const onReady = (event: any) => {
//     event.target.playVideo();
//   };

//   const onEnd = () => {
//     handleNextMovie();
//   };


//   const handleLogout = () => {
//     dispatch(logout());
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
//     <div className="min-h-screen bg-gray-950 text-white">
//       <Navbar user={user} onLogout={handleLogout} />
//       {currentMovie && currentMovie.trailerKey ? (
//         <div className="relative video-container">
//           <YouTube
//             videoId={currentMovie.trailerKey}
//             opts={{
//               playerVars: {
//                 autoplay: 1,
//                 controls: 0, // Hide controls
//                 modestbranding: 1, // Hide YouTube logo
//                 fs: 0, // Disable fullscreen button
//                 iv_load_policy: 3, // Disable video annotations
//                 cc_load_policy: 0, // Disable captions
//               },
//             }}
//             onReady={onReady}
//             onEnd={onEnd}
//             className="absolute inset-0"
//           />
//           <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 p-4 rounded-lg">
//             <h1 className="text-3xl font-bold">{currentMovie.title}</h1>
//             <p className="text-lg">
//               {currentMovie.releaseDate} - {currentMovie.rating}
//               <span className="text-yellow-400">★</span>
//             </p>
//             <button
//               onClick={handleNextMovie}
//               className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-red-500"
//             >
//               Next Movie
//             </button>
//           </div>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//       <main className="p-4">
//         <h2 className="text-2xl font-bold mb-4">Running</h2>
//         <RowPost heading="Latest Movies" endpoint="/get-Movies" />
//       </main>
//       {error && <p className="text-red-500 mt-4">{error}</p>}
//     </div>
//   );
// };

// export default UserHomePage;

import React, { useState, useEffect, useRef } from "react";
import { useSelector} from "react-redux";
import "tailwindcss/tailwind.css";
import { config } from "../../../config/constants";
import { commonRequest } from "../../../config/api";
import RowPost from "./RowPost";
import Navbar from "./NavBar";
import "../../../styles.css";
import YouTube from "react-youtube";
import { RootState } from "../../../redux/store";

const UserHomePage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [currentMovieIndex, setCurrentMovieIndex] = useState<number>(0);
  const { user } = useSelector((state: RootState) => state.user);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await commonRequest(
          "GET",
          "/theater/get-Movies",
          config
        );
        const moviesData = response.data.data;

        // Fetch trailer keys for each movie
        const moviesWithTrailers = await Promise.all(
          moviesData.map(async (movie: any) => {
            const trailerResponse = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=2a1ba4f836ae838c2fe9a42ef94af264&language=en-US`
            );
            const trailerData = await trailerResponse.json();
            const trailer = trailerData.results.find(
              (video: any) => video.type === "Trailer"
            );

            return {
              ...movie,
              trailerKey: trailer ? trailer.key : null,
            };
          })
        );

        setMovies(moviesWithTrailers);
      } catch (err) {
        setError("Failed to fetch movies");
        console.error("Failed to fetch movies", err);
      }
    };

    fetchMovies();
  }, [user]);

  useEffect(() => {
    if (movies.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
      }, 90000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [movies]);

  const handleNextMovie = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const currentMovie = movies[currentMovieIndex];

  const onReady = (event: any) => {
    event.target.playVideo();
  };

  const onEnd = () => {
    handleNextMovie();
  };


  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      {currentMovie && currentMovie.trailerKey ? (
        <div className="relative video-container">
          <YouTube
            videoId={currentMovie.trailerKey}
            opts={{
              playerVars: {
                autoplay: 1,
                controls: 0, // Hide controls
                modestbranding: 1, // Hide YouTube logo
                fs: 0, // Disable fullscreen button
                iv_load_policy: 3, // Disable video annotations
                cc_load_policy: 0, // Disable captions
              },
            }}
            onReady={onReady}
            onEnd={onEnd}
            className="absolute inset-0"
          />
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 p-4 rounded-lg">
            <h1 className="text-3xl font-bold">{currentMovie.title}</h1>
            <p className="text-lg">
              {currentMovie.releaseDate} - {currentMovie.rating}
              <span className="text-yellow-400">★</span>
            </p>
            <button
              onClick={handleNextMovie}
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-red-500"
            >
              Next Movie
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <main className="p-4">
        <h2 className="text-2xl font-bold mb-4">Running</h2>
        <RowPost heading="Latest Movies" endpoint="/get-Movies" />
      </main>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default UserHomePage;