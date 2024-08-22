// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import YouTube from "react-youtube";
// import { commonRequest } from "../../config/api";
// import { config } from "../../config/constants";

// const MovieDetail: React.FC = () => {
//   const { movieId } = useParams<{ movieId: string }>();
//   const [movie, setMovie] = useState<any>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [trailerKey, setTrailerKey] = useState<string | null>(null);
//   const [isAddMovieModalOpen, setIsAddMovieModalOpen] = useState(false);

//   useEffect(() => {
//     if (movieId) {
//       fetch(
//         `https://api.themoviedb.org/3/movie/${movieId}?api_key=2a1ba4f836ae838c2fe9a42ef94af264`
//       )
//         .then((res) => res.json())
//         .then((data) => setMovie(data))
//         .catch((err) => console.error("Error fetching movie details:", err));

//       fetch(
//         `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=2a1ba4f836ae838c2fe9a42ef94af264&language=en-US`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           const trailer = data.results.find(
//             (video: any) => video.type === "Trailer"
//           );
//           if (trailer) {
//             setTrailerKey(trailer.key);
//           }
//         })
//         .catch((err) => console.error("Error fetching movie videos:", err));
//     }
//   }, [movieId]);


//   console.log(movie,"movie");
  

//   if (!movie) {
//     return <div>Loading...</div>;
//   }

//   const handlePosterClick = () => {
//     if (trailerKey) {
//       setIsModalOpen(true);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const openAddMovieModal = () => {
//     setIsAddMovieModalOpen(true);
//   };

//   const closeAddMovieModal = () => {
//     setIsAddMovieModalOpen(false);
//   };

//   const handleAddMovie = async (type: "Theater" | "OTT") => {
//     const movieData = {
//       id: movie.id,
//       title: movie.title,
//       overview: movie.overview,
//       releaseDate: movie.release_date,
//       rating: movie.vote_average,
//       posterPath: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
//       backdrop_path: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
//       trailerKey: trailerKey,
//       type,
//     };

//     console.log(movieData,"movie data here ");
    
//     const endpoint =
//       type === "Theater" ? "admin/add-movie-theater" : "admin/add-movie-ott";

//     try {
//       const response = await commonRequest("POST", endpoint, config, movieData);

//       if (response.status === 200) {
//         console.log("Movie added successfully:", response.data);

//       } else {
//         console.error("Failed to add movie:", response.data);
        
//       }
//     } catch (error) {
//       console.error("Error adding movie:", error);
    
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-200 p-6 relative">
//       <div
//         className="absolute inset-0 w-screen h-screen bg-cover bg-center"
//         style={{
//           backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
//         }}
//       />

//       <div className="max-w-4xl mx-auto relative z-10">
//         <div className="bg-gray-800 rounded-lg shadow-md p-6 flex">
//           <div className="w-1/2 p-4">
//             <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
//             <p className="text-lg mb-4">{movie.overview}</p>
//             <p className="text-sm">Release Date: {movie.release_date}</p>
//             <p className="text-sm">Rating: {movie.vote_average}</p>
//             <button
//               onClick={openAddMovieModal}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
//             >
//               Add Movie
//             </button>
//           </div>

//           <div className="w-1/2 relative flex items-center justify-center">
//             <button
//               onClick={handlePosterClick}
//               className="relative bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center"
//               style={{
//                 backgroundImage: `url('https://image.tmdb.org/t/p/w200/${movie.poster_path}')`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6 mr-2"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 12l-8-4v8l8-4z"
//                 />
//               </svg>
//               Play Trailer
//             </button>
//           </div>
//         </div>
//       </div>

//       {isModalOpen && trailerKey && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//           <div className="bg-gray-800 p-4 rounded-lg relative">
//             <button
//               onClick={closeModal}
//               className="absolute top-0 right-0 mt-2 mr-2 text-white"
//             >
//               &times;
//             </button>
//             <YouTube videoId={trailerKey} />
//           </div>
//         </div>
//       )}

//       {isAddMovieModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//           <div className="bg-gray-800 p-6 rounded-lg relative">
//             <button
//               onClick={closeAddMovieModal}
//               className="absolute top-0 right-0 mt-2 mr-2 text-white"
//             >
//               &times;
//             </button>
//             <h2 className="text-2xl font-bold mb-4">Select Movie Type</h2>
//             <div className="flex justify-around">
//               <button
//                 onClick={() => {
//                   closeAddMovieModal();
//                   handleAddMovie("Theater");
//                 }}
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 To Theater
//               </button>
//               <button
//                 onClick={() => {
//                   closeAddMovieModal();
//                   handleAddMovie("OTT");
//                 }}
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 To OTT
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MovieDetail;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { commonRequest } from "../../config/api";
import { config } from "../../config/constants";
import toast, { Toaster } from "react-hot-toast";

const MovieDetail: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isAddMovieModalOpen, setIsAddMovieModalOpen] = useState(false);

  useEffect(() => {
    if (movieId) {
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=2a1ba4f836ae838c2fe9a42ef94af264`
      )
        .then((res) => res.json())
        .then((data) => setMovie(data))
        .catch((err) => console.error("Error fetching movie details:", err));

      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=2a1ba4f836ae838c2fe9a42ef94af264&language=en-US`
      )
        .then((res) => res.json())
        .then((data) => {
          const trailer = data.results.find(
            (video: any) => video.type === "Trailer"
          );
          if (trailer) {
            setTrailerKey(trailer.key);
          }
        })
        .catch((err) => console.error("Error fetching movie videos:", err));
    }
  }, [movieId]);

  

  if (!movie) {
    return <div>Loading...</div>;
  }

  const handlePosterClick = () => {
    if (trailerKey) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openAddMovieModal = () => {
    setIsAddMovieModalOpen(true);
  };

  const closeAddMovieModal = () => {
    setIsAddMovieModalOpen(false);
  };

  const handleAddMovie = async (type: "Theater" | "OTT") => {
    const movieData = {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
      posterPath: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
      backdrop_path: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
      trailerKey: trailerKey,
      type,
      runtime: movie.runtime,
      original_language:movie.original_language,
    };

    const endpoint =
      type === "Theater" ? "admin/add-movie-theater" : "admin/add-movie-ott";

    try {
      const response = await commonRequest("POST", endpoint, config, movieData);

      console.log(response,"response from backend ");
      

      if (response.status === 200) {
        toast.success("Movie added successfully!");
      } else {
        const errorMessage = response.response.data?.message || "Failed to add movie.";
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error("Error adding movie.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6 relative">
      <div
        className="absolute inset-0 w-screen h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-gray-800 rounded-lg shadow-md p-6 flex">
          <div className="w-1/2 p-4">
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
            <p className="text-lg mb-4">{movie.overview}</p>
            <p className="text-sm">Release Date: {movie.release_date}</p>
            <p className="text-sm">Rating: {movie.vote_average}</p>
            <button
              onClick={openAddMovieModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Add Movie
            </button>
          </div>

          <div className="w-1/2 relative flex items-center justify-center">
            <button
              onClick={handlePosterClick}
              className="relative bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center"
              style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/w200/${movie.poster_path}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12l-8-4v8l8-4z"
                />
              </svg>
              Play Trailer
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && trailerKey && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-4 rounded-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 mt-2 mr-2 text-white"
            >
              &times;
            </button>
            <YouTube videoId={trailerKey} />
          </div>
        </div>
      )}

      {isAddMovieModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg relative">
            <button
              onClick={closeAddMovieModal}
              className="absolute top-0 right-0 mt-2 mr-2 text-white"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Select Movie Type</h2>
            <div className="flex justify-around">
              <button
                onClick={() => {
                  closeAddMovieModal();
                  handleAddMovie("Theater");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                To Theater
              </button>
              <button
                onClick={() => {
                  closeAddMovieModal();
                  handleAddMovie("OTT");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                To OTT
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
};

export default MovieDetail;

