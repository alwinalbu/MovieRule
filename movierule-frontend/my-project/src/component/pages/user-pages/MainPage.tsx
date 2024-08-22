// import React, { useEffect, useState } from "react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import NavBar from "./UserNavBar";
// import { commonRequest } from "../../../config/api";
// import { config } from "../../../config/constants";
// import YouTube from "react-youtube";
// import RowPost from "./RowPost";

// const LandingPage: React.FC = () => {
//   const [movies, setMovies] = useState<any[]>([]);
//   const [error, setError] = useState<string>("");
//   const [selectedTrailer, setSelectedTrailer] = useState<string | null>(null);

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
//   }, []);

//   const handlePosterClick = (trailerKey: string | null) => {
//     if (trailerKey) {
//       setSelectedTrailer(trailerKey);
//     }
//   };

//   const closeTrailer = () => {
//     setSelectedTrailer(null);
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 text-white">
//       <NavBar />
//       {selectedTrailer ? (
//         <div className="relative bg-cover bg-center h-96">
//           <YouTube
//             videoId={selectedTrailer}
//             opts={{
//               playerVars: {
//                 autoplay: 1,
//                 fs: 1,
//               },
//             }}
//             className="absolute inset-0 w-full h-full"
//           />
//           <button
//             onClick={closeTrailer}
//             className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700"
//           >
//             Close
//           </button>
//         </div>
//       ) : (
//         <header className="relative">
//           <Carousel
//             showArrows={true}
//             infiniteLoop={true}
//             autoPlay={true}
//             interval={5000}
//             showIndicators={false}
//             showThumbs={false}
//             className="relative"
//             renderThumbs={() => []} // Return an empty array instead of null
//           >
//             {movies.map((movie) => (
//               <div
//                 key={movie.id}
//                 className="relative"
//                 onClick={() => handlePosterClick(movie.trailerKey)}
//               >
//                 <img
//                   src={movie.backdrop_path}
//                   alt={movie.title}
//                   className="w-full h-100 object-cover"
//                 />
//                 <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 p-4 rounded-lg">
//                   <h1 className="text-3xl font-bold">{movie.title}</h1>
//                   <p className="text-lg">
//                     {movie.releaseDate} - {movie.rating}
//                     <span className="text-yellow-400">★</span>
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </Carousel>
//         </header>
//       )}
//       <main className="p-4">
//         <h2 className="text-2xl font-bold mb-4">Running</h2>
//         <RowPost heading="Latest Movies" endpoint="/get-Movies" />
//       </main>
//       {error && <p className="text-red-500 mt-4">{error}</p>}
//     </div>
//   );
// };

// export default LandingPage;


import React, { useEffect, useState, useRef } from "react";
import NavBar from "./UserNavBar";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import YouTube from "react-youtube";
import RowPost from "./RowPost";
import "../../../styles.css"

const LandingPage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [currentMovieIndex, setCurrentMovieIndex] = useState<number>(0);
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
  }, []);

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
      <NavBar />
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

export default LandingPage;


