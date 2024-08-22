// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { IMovie } from "../Movies/IMovie";

// interface MovieCardProps {
//   movie: IMovie;
// }


// const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

//   const navigate = useNavigate();

//    const handlePosterClick = (movie_id: string, dbMovietype: string) => {
//      navigate(`/admin/movies-data/${movie_id}`, { state: dbMovietype });
//    };

 
//    console.log(movie,"inside the movie card");
   
  
//   return (
//     <div className="movie-card bg-black rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
//         <img
//           className="w-full h-64 object-cover"
//           src={movie.posterPath}
//           alt={`Poster for ${movie.title}`}
//           key={movie._id}
//           onClick={() => handlePosterClick(movie.id, movie.type)}
//         />
//       <div className="p-4">
//         <h3 className="text-xl font-semibold mb-2 text-white">{movie.title}</h3>
//         <div className="flex items-center">
//           <svg
//             className="w-5 h-5 mr-2 fill-current text-yellow-500"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path d="M9.047 7.548l-3.047 3.047 -0.707-0.707A5.001 5.001 0 0 1 4 10.045v-4.09a3.003 3.003 0 0 1 5.656-2.199l-0.707-0.707zM16 8.148v-4.09a3.003 3.003 0 0 1-5.656-2.199l-0.707-0.707A5.001 5.001 0 0 1 12 4.045v4.09a7 7 0 1 0 4 0z"></path>
//           </svg>
//           <span className="text-gray-300">{movie.rating}/10</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieCard;

import React from "react";
import { useNavigate } from "react-router-dom";
import { IMovie } from "../Movies/IMovie";

interface MovieCardProps {
  movie: IMovie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  const handlePosterClick = (movie: IMovie) => {
    navigate(`/admin/movies-data/${movie.id}`, { state: { movie } });
  };

  return (
    <div className="movie-card bg-black rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
      <img
        className="w-full h-64 object-cover"
        src={movie.posterPath}
        alt={`Poster for ${movie.title}`}
        key={movie._id}
        onClick={() => handlePosterClick(movie)}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-white">{movie.title}</h3>
        <div className="flex items-center">
          <svg
            className="w-5 h-5 mr-2 fill-current text-yellow-500"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.047 7.548l-3.047 3.047 -0.707-0.707A5.001 5.001 0 0 1 4 10.045v-4.09a3.003 3.003 0 0 1 5.656-2.199l-0.707-0.707zM16 8.148v-4.09a3.003 3.003 0 0 1-5.656-2.199l-0.707-0.707A5.001 5.001 0 0 1 12 4.045v4.09a7 7 0 1 0 4 0z"></path>
          </svg>
          <span className="text-gray-300">{movie.rating}/10</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
