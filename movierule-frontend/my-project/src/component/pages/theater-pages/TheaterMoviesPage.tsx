import React, { useEffect, useState } from "react";
import { Play, Info } from "lucide-react";
import { toast } from "react-toastify";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import {
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";
import TheaterSidebar from "../../TheaterSidebar/TheaterSidebar";
import { GiHamburgerMenu } from "react-icons/gi";

interface Movie {
  _id: string;
  title: string;
  overview: string;
  posterPath: string;
  backdrop_path: string;
  releaseDate: string;
  rating?: number;
  trailerKey?: string;
  type?: string;
}

const TheaterMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // ✅ Fetch movies from backend
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await commonRequest(
        "GET",
        "/theater/get-Movies",
        config
      );
      const data = response.data.data || [];

      // ✅ Sort by releaseDate (latest first)
      const sortedMovies = data.sort(
        (a: Movie, b: Movie) =>
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      );

      setMovies(sortedMovies);
    } catch {
      toast.error("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white flex">
      {/* ✅ Show Sidebar only when isSidebarOpen is true */}
      {isSidebarOpen && (
        <TheaterSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      {/* ✅ Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Hamburger Button */}
        <button
          onClick={toggleSidebar}
          className="text-white mb-4 flex items-center gap-2"
        >
          <GiHamburgerMenu size={24} /> Menu
        </button>

        <h1 className="text-2xl md:text-4xl font-bold mb-8">
          🎬 Theater Movies
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spinner label="Loading Movies..." color="primary" />
          </div>
        ) : movies.length === 0 ? (
          <div className="text-gray-400 text-center mt-20">
            <p className="text-lg">No movies available.</p>
            <p className="text-sm">Upload or add movies to view them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="relative group cursor-pointer"
                onClick={() => setSelectedMovie(movie)}
              >
                <img
                  src={movie.posterPath}
                  alt={movie.title}
                  className="w-full h-64 object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-center p-3 rounded-md">
                  <h3 className="text-sm md:text-base font-bold mb-2 line-clamp-1">
                    {movie.title}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      className="flex items-center gap-1 bg-white text-black text-xs px-3 py-1 rounded hover:bg-gray-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMovie(movie);
                      }}
                    >
                      <Play size={14} /> Trailer
                    </button>
                    <button
                      className="flex items-center gap-1 bg-gray-700 text-white text-xs px-3 py-1 rounded hover:bg-gray-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMovie(movie);
                      }}
                    >
                      <Info size={14} /> Info
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Movie Modal (Trailer + Info) */}
      {selectedMovie && (
        <Modal
          isOpen={!!selectedMovie}
          onOpenChange={() => setSelectedMovie(null)}
          placement="top-center"
          size="3xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="text-xl font-bold">
                  {selectedMovie.title}
                </ModalHeader>
                <ModalBody>
                  {/* Trailer if available, else poster */}
                  {selectedMovie.trailerKey ? (
                    <iframe
                      className="w-full h-[400px] rounded mb-4"
                      src={`https://www.youtube-nocookie.com/embed/${selectedMovie.trailerKey}?autoplay=1&controls=1`}
                      title="Trailer"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                    />
                  ) : (
                    <img
                      src={
                        selectedMovie.backdrop_path || selectedMovie.posterPath
                      }
                      alt={selectedMovie.title}
                      className="w-full h-56 object-cover rounded mb-4"
                    />
                  )}

                  {/* Extra Details */}
                  <div className="flex flex-wrap gap-6 text-gray-400 text-sm mb-3">
                    <p>📅 Release: {selectedMovie.releaseDate}</p>
                    <p>⭐ Rating: {selectedMovie.rating || "N/A"}</p>
                    <p>🎬 Type: {selectedMovie.type || "Unknown"}</p>
                  </div>

                  {/* Overview */}
                  <p className="text-gray-300">{selectedMovie.overview}</p>
                </ModalBody>
                <Button color="danger" onPress={onClose} className="m-3">
                  Close
                </Button>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default TheaterMoviesPage;
