import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import { IMovie } from "../../Movies/IMovie";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StreamRowPostProps {
  heading: string;
  endpoint: string;
}

const StreamRowPost: React.FC<StreamRowPostProps> = ({ heading, endpoint }) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await commonRequest("GET", endpoint, config);
      setMovies(res.data.data);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // const handlePosterClick = (movie_id: string, dbMovie: any) => {
  //   navigate(`/movie/${movie_id}`, { state: dbMovie });
  // };
    const handlePosterClick = (movie_id: string, dbMovieId: string) => {
      navigate(`/movie/${movie_id}`, { state: { dbMovieId } });
    };

  const scrollRow = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.8;
      rowRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="my-8 relative">
      <h3 className="text-xl font-bold mb-3 px-4">{heading}</h3>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner label="Loading..." color="primary" />
        </div>
      ) : (
        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={() => scrollRow("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronLeft size={28} className="text-white" />
          </button>

          {/* Posters Row */}
          <div
            ref={rowRef}
            className="flex space-x-3 overflow-x-scroll scrollbar-hide px-4 scroll-smooth"
          >
            {movies.map((movie) => (
              <img
                key={movie._id}
                src={movie.posterPath}
                alt={`Poster of ${movie.title}`}
                onClick={() => handlePosterClick(movie.id, movie._id)}
                className="w-40 md:w-56 lg:w-64 h-60 md:h-80 object-cover rounded-md cursor-pointer transition-transform duration-300 hover:scale-110"
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scrollRow("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronRight size={28} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default StreamRowPost;

