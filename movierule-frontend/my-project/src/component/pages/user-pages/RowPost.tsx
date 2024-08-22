import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import { IMovie } from "../../Movies/IMovie";

interface RowPostProps {
  heading: string;
  endpoint: string;
}

const RowPost: React.FC<RowPostProps> = ({ heading, endpoint }) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await commonRequest("GET", endpoint, config);
      setLoading(false);
      setMovies(res.data.data);
    } catch (error) {
      setLoading(false);
      console.error("Failed to fetch movies", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handlePosterClick = (movie_id: string, dbMovieId: string) => {
    navigate(`/movie/${movie_id}`, { state: dbMovieId });
  };

  return (
    <div className="Row my-8">
      <h3 className="text-xl font-semibold mb-4">{heading}</h3>
      {isLoading ? (
        <div className="posters flex justify-center items-center">
          <Spinner label="Loading..." color="primary" />
        </div>
      ) : (
        <div className="flex justify-center mx-auto">
          <div className="posters flex flex-wrap gap-4">
            {movies.map((movie) => (
              <img
                className="poster w-64 h-96 object-cover cursor-pointer transition-transform transform hover:scale-105"
                src={movie.posterPath}
                alt={`Poster of ${movie.title}`}
                key={movie._id}
                onClick={() => handlePosterClick(movie.id, movie._id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RowPost;
