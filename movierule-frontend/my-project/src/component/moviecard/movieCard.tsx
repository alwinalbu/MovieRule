import React from "react";
import StarRating from "../rating/starRating";

interface MovieCardProps {
  film: {
    rating: number;
    image: string;
    name: string;
    date: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ film }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <StarRating rate={film.rating} />
      <img
        className="w-full h-64 object-cover object-center"
        src={film.image}
        alt={film.name}
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{film.name}</h3>
        <p className="text-gray-700">{film.date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
