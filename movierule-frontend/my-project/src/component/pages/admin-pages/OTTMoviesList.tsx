import React, { useEffect, useState } from "react";
import MovieCard from "../../moviecard/movieCard";
import { IMovie } from "../../Movies/IMovie";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import toast, { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import AdminSidebar from "../../AdminSidePanal/AdminSidebar";

const OTTMoviesList: React.FC = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await commonRequest(
          "GET",
          "/admin/get-OTT-Movies",
          config
        );
        setMovies(response.data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch OTT Movies");
        setError("Failed to fetch OTT Movies");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl" />
        <span className="ml-4 text-xl">Loading...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const firstMovie = movies.length > 0 ? movies[0] : null;

  return (
    <div className="bg-black min-h-screen text-white">
      <AdminSidebar />
      <div className="container mx-auto px-4 py-8">
        <Toaster position="top-right" reverseOrder={false} />
        {firstMovie && (
          <div className="mb-8">
            <img
              src={firstMovie.backdrop_path || "path/to/default-banner.jpg"} // Use a default image if bannerImageUrl is not available
              alt={firstMovie.title}
              className="w-full rounded"
              style={{ height: "50rem" }}
            />
            <div className="mt-4 flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold">{firstMovie.title}</h1>
                <p className="text-lg">{firstMovie.releaseDate}</p>
              </div>
            </div>
          </div>
        )}
        <h2 className="text-3xl font-bold mb-4">Streaming</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OTTMoviesList;

