import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import { IMovie } from "../../Movies/IMovie";

interface StreamRowPostProps {
  heading: string;
  endpoint: string;
}

const StreamRowPost: React.FC<StreamRowPostProps> = ({ heading, endpoint }) => {
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

  const handlePosterClick = (movie_id: string, dbMovie:any) => {
    navigate(`/movie/${movie_id}`, { state: dbMovie });
  };

  return (
    <div className="Row my-8">
      <h3 className="text-xl font-semibold mb-4">{heading}</h3>
      {isLoading ? (
        <div className="posters flex justify-center items-center">
          <Spinner label="Loading..." color="primary" />
        </div>
      ) : (
        <div className="posters flex flex-wrap gap-4">
          {movies.map((movie) => (
            <img
              className="poster w-64 h-96 object-cover cursor-pointer transition-transform transform hover:scale-105"
              src={movie.posterPath}
              alt={`Poster of ${movie.title}`}
              key={movie._id}
              onClick={() => handlePosterClick(movie.id, movie)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StreamRowPost;
