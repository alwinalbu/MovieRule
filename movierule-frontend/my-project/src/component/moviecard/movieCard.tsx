
import React from 'react';
import { Link } from 'react-router-dom';
import { IMovie } from '../Movies/IMovie';

interface MovieCardProps {
  movie: IMovie
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="movie-card bg-black rounded-lg shadow-md overflow-hidden">
      <Link to={`/admin/movies-data/${movie._id}`}>
        <img
          className="w-full h-48 object-cover"
          src={movie.posterPath}
          alt={`Poster for ${movie.title}`}
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">{movie.title}</h3>
        <div className="flex items-center">
          <svg
            className="w-4 h-4 mr-2 fill-current text-yellow-500"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.047 7.548l-3.047 3.047 -0.707-0.707A5.001 5.001 0 0 1 4 10.045v-4.09a3.003 3.003 0 0 1 5.656-2.199l-0.707-0.707zM16 8.148v-4.09a3.003 3.003 0 0 1-5.656-2.199l-0.707-0.707A5.001 5.001 0 0 1 12 4.045v4.09a7 7 0 1 0 4 0z"></path>
          </svg>
          <span className="text-gray-600">{movie.rating}/10</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

