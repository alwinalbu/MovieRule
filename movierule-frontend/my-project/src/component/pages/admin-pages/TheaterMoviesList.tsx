import React, { useEffect, useState } from "react";
import MovieCard from "../../moviecard/movieCard";
import { IMovie } from "../../Movies/IMovie";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import toast, { Toaster } from "react-hot-toast";
import { FaSpinner, FaTrash } from "react-icons/fa";
import AdminSidebar from "../../AdminSidePanal/AdminSidebar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Swal from "sweetalert2";

const TheaterMoviesList: React.FC = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await commonRequest(
          "GET",
          "/admin/get-theatersMovies",
          config
        );
        setMovies(response.data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch Theater Movies");
        setError("Failed to fetch Theater Movies");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (movieId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This movie will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await commonRequest(
            "DELETE",
            `/admin/delete-Movie/${movieId}`,
            config
          );

          if (response.status === 200 && response.data.success) {
            setMovies(movies.filter((movie) => movie._id !== movieId));
            Swal.fire("Deleted!", "The movie has been deleted.", "success");
          } else {
            Swal.fire("Failed!", "The movie could not be deleted.", "error");
          }
        } catch (err) {
          console.error(err);
          toast.error("Failed to delete movie");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <FaSpinner className="animate-spin text-4xl" />
        <span className="ml-4 text-xl">Loading...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <AdminSidebar />
      <div className="container mx-auto px-4 py-6">
        <Toaster position="top-right" reverseOrder={false} />

        {/* Carousel Section */}
        {movies.length > 0 ? (
          <header className="relative mb-8">
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              useKeyboardArrows
              dynamicHeight={false}
            >
              {movies.map((movie) => (
                <div key={movie._id} className="relative">
                  <img
                    src={movie.backdrop_path}
                    alt={movie.title}
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/60 p-4 rounded-lg">
                    <h1 className="text-lg md:text-2xl font-bold">
                      {movie.title}
                    </h1>
                    <p className="text-sm md:text-lg">
                      {movie.releaseDate} - {movie.rating}
                      <span className="text-yellow-400 ml-1">★</span>
                    </p>
                  </div>
                </div>
              ))}
            </Carousel>
          </header>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl">No Theater movies available.</p>
          </div>
        )}

        {/* Movies Grid */}
        {movies.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-6">Running Theater Movies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <div key={movie._id} className="relative group">
                  <MovieCard movie={movie} />
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white shadow-lg opacity-0 group-hover:opacity-100 transition"
                    title="Delete movie"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TheaterMoviesList;
