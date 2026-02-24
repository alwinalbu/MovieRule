import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import { IMovie } from "../../Movies/IMovie";
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";

interface RowPostProps {
  heading: string;
  endpoint: string;
}

const RowPost: React.FC<RowPostProps> = ({ heading, endpoint }) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [hoveredMovie, setHoveredMovie] = useState<string | null>(null);
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

  // ✅ Updated: Pass dbMovieId as state
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
    <div className="Row my-8 px-4 md:px-6">
      <h3 className="text-lg md:text-xl font-bold text-white mb-3">
        {heading}
      </h3>

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
            className="flex space-x-3 overflow-x-scroll scrollbar-hide scroll-smooth"
          >
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="relative group w-36 sm:w-44 md:w-52 lg:w-60 flex-shrink-0"
                onMouseEnter={() => setHoveredMovie(movie._id)}
                onMouseLeave={() => setHoveredMovie(null)}
              >
                <img
                  src={movie.posterPath}
                  alt={movie.title}
                  className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-md cursor-pointer transition-transform duration-300 group-hover:scale-110"
                  // ✅ Now sends dbMovieId in state
                  onClick={() => handlePosterClick(movie.id, movie._id)}
                />

                {/* Hover Preview Card */}
                {hoveredMovie === movie._id && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-3 text-sm rounded-b-md transition duration-300">
                    <h4 className="font-semibold line-clamp-1">
                      {movie.title}
                    </h4>
                    <div className="flex gap-2 mt-2">
                      <button
                        className="flex items-center gap-1 bg-white text-black px-2 py-1 rounded hover:bg-gray-300 text-xs"
                        onClick={() => handlePosterClick(movie.id, movie._id)}
                      >
                        <Play size={14} /> Play
                      </button>
                      <button
                        className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded hover:bg-gray-600 text-xs"
                        onClick={() => handlePosterClick(movie.id, movie._id)}
                      >
                        <Info size={14} /> Info
                      </button>
                    </div>
                  </div>
                )}
              </div>
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

export default RowPost;

